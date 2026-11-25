#!/usr/bin/env python3
"""Auditoria P1-01/P1-02 e P2-01/P2-03: centavos exatos, agregados sem PII.
Preserva a fotografia original. Excluir repasses classificados não comprova
fluxo líquido nem vínculo entre transferência de saída e de entrada.
"""
import csv, hashlib, io, json, statistics, sys, zipfile, unicodedata
from pathlib import Path
from collections import Counter, defaultdict
from decimal import Decimal

PROP={"DEPUTADO FEDERAL","DEPUTADO ESTADUAL","DEPUTADO DISTRITAL"}
MAJ={"PRESIDENTE","GOVERNADOR","SENADOR"}
BASE=Path("docs/auditorias/financiamento-2026-25nov")
def norm(s):
    return "".join(x for x in unicodedata.normalize("NFKD",s.upper()) if not unicodedata.combining(x)).strip()
def cents(s):
    return int(Decimal(s.replace(".","").replace(",","."))*100)
def reais(v):
    return str((Decimal(v)/100).quantize(Decimal(".01")))
def sha(p):
    with open(p,"rb") as f:return hashlib.file_digest(f,"sha256").hexdigest()
def member(z,name):
    with zipfile.ZipFile(z) as f:
        names=[n for n in f.namelist() if Path(n).name.lower()==name.lower()]
        assert len(names)==1,(name,len(names))
        return f.read(names[0])
def records(raw):
    # Same integral line deduplication as the existing snapshot.
    lines=raw.decode("latin1").splitlines()
    header=next(csv.reader([lines[0]],delimiter=";"))
    seen=set()
    for line in lines[1:]:
        r=dict(zip(header,next(csv.reader([line],delimiter=";"))))
        dup=line in seen
        if not dup:seen.add(line)
        yield r,dup

def category(r):
    origin=norm(r["DS_ORIGEM_RECEITA"])
    transfer=origin=="RECURSOS DE OUTROS CANDIDATOS"
    party=origin=="RECURSOS DE PARTIDO POLITICO"
    fefc=norm(r["DS_FONTE_RECEITA"])=="FUNDO ESPECIAL"
    kind=norm(r["DS_NATUREZA_RECEITA"])
    estimavel="ESTIM" in kind
    return origin,transfer,party,fefc,kind,estimavel

def main(cand_zip,contas_zip,out):
    mf=json.loads((BASE/"manifest.json").read_text())
    hashes={"candidaturas":sha(cand_zip),"contas":sha(contas_zip)}
    assert hashes["candidaturas"]==mf["candidaturas"]["zip_sha256"],"ZIP candidaturas difere do corte auditado"
    assert hashes["contas"]==mf["contas"]["zip_sha256"],"ZIP contas difere do corte auditado"
    c=member(cand_zip,"consulta_cand_2026_BRASIL.csv")
    r=member(contas_zip,"receitas_candidatos_2026_BRASIL.csv")
    assert hashlib.sha256(c).hexdigest()==mf["candidaturas"]["csv_sha256"]
    assert hashlib.sha256(r).hexdigest()==mf["contas"]["receitas"]["csv_sha256"]
    reg={}
    for row in csv.DictReader(io.StringIO(c.decode("latin1")),delimiter=";"):
        if row["NR_TURNO"]=="1" and row["DS_CARGO"] in PROP|MAJ:
            reg.setdefault(row["SQ_CANDIDATO"],row)
    assert len(reg)==20065
    rev=defaultdict(Counter); tipos=defaultdict(set); origins=defaultdict(Counter); nature=defaultdict(Counter)
    zero_line=Counter(); count=Counter(); duplicates=0; rawrows=0
    for row,dup in records(r):
        rawrows+=1
        if dup:duplicates+=1;continue
        sq=row["SQ_CANDIDATO"];assert sq in reg,"Receita sem cadastro titular"
        v=cents(row["VR_RECEITA"]);o,tr,pa,fe,k,est=category(row)
        x=rev[sq]; x["bruta"]+=v;x["repasses"]+=v if tr else 0;x["sem_repasses"]+=v if not tr else 0
        x["fefc_bruto"]+=v if fe else 0;x["fefc_repasses"]+=v if fe and tr else 0
        x["fefc_sem_repasses"]+=v if fe and not tr else 0;x["fefc_origem_partidaria"]+=v if fe and pa else 0
        x["estimaveis"]+=v if est else 0;x["fefc_estimaveis"]+=v if fe and est else 0
        x["nao_estimaveis"]+=v if not est else 0
        count[sq]+=1
        if v==0 and norm(row["DS_FONTE_RECEITA"])=="#NULO":zero_line[sq]+=1
        tipos[sq].add(row["TP_PRESTACAO_CONTAS"])
        for dest,key in ((origins,o),(nature,k)):
            dest[key]["linhas"]+=1;dest[key]["receita"]+=v;dest[key]["fefc"]+=v if fe else 0
    assert rawrows==271785 and duplicates==978
    assert all(len(v)==1 for v in tipos.values())
    def aggregate(ids):
        in_file=[i for i in ids if i in rev]
        positive=[i for i in in_file if rev[i]["bruta"]>0]
        zero=[i for i in in_file if rev[i]["bruta"]==0]
        negative=[i for i in in_file if rev[i]["bruta"]<0]
        single_zero=[i for i in zero if count[i]==zero_line[i]==1]
        allvalues=Counter()
        for i in in_file:allvalues.update(rev[i])
        assert len(ids)==len(in_file)+len(set(ids)-set(in_file))
        assert len(in_file)==len(positive)+len(zero)+len(negative)
        assert allvalues["bruta"]==allvalues["repasses"]+allvalues["sem_repasses"]
        assert allvalues["fefc_bruto"]==allvalues["fefc_repasses"]+allvalues["fefc_sem_repasses"]
        med=lambda arr: reais(statistics.median(arr)) if arr else None
        return {"titulares":len(ids),"no_arquivo":len(in_file),"positivas":len(positive),"zero_liquido":len(zero),"negativas":len(negative),"ausentes":len(ids)-len(in_file),"linha_unica_nula_zero":len(single_zero),"zeros_por_tipo":dict(Counter(next(iter(tipos[i])) for i in zero)),"mediana_no_arquivo":med([rev[i]["bruta"] for i in in_file]),"mediana_positivas":med([rev[i]["bruta"] for i in positive]),"mediana_sem_repasses_positivas":med([rev[i]["sem_repasses"] for i in in_file if rev[i]["sem_repasses"]>0]),"valores":{k:reais(v) for k,v in sorted(allvalues.items())}}
    groups=defaultdict(list)
    for i,row in reg.items():
        u="proporcional" if row["DS_CARGO"] in PROP else "majoritario"
        g=row["DS_GENERO"];race=row["DS_COR_RACA"]
        for key in [("titulares",), (u,), (u,g),(u,g,race),(u,"partido",row["SG_PARTIDO"]),(u,"partido_genero",row["SG_PARTIDO"],g),(u,"cargo",row["DS_CARGO"],g),(u,"uf",row["SG_UF"],g)]:groups[key].append(i)
    res={"|".join(k):aggregate(v) for k,v in sorted(groups.items())}
    # A second check against the published snapshot, not Claude's expected values.
    old=json.loads((BASE/"receitas-agregadas.json").read_text())
    for u in ("proporcional","majoritario"):
        assert Decimal(res[u]["valores"]["bruta"])==Decimal(str(old["universes"][u]["totalRevenue"]))
        assert Decimal(res[u+"|FEMININO"]["valores"]["bruta"])==Decimal(str(old["universes"][u]["feminineRevenue"]))
    oldf=json.loads((BASE/"fefc-titulares.json").read_text())
    assert Decimal(res["titulares"]["valores"]["fefc_bruto"])==Decimal(str(oldf["total"]["fefc"]))
    assert res["titulares"]["no_arquivo"]==old["candidaciesWithRevenue"]
    # Verify exact official category against independent origin breakdown.
    assert Decimal(res["titulares"]["valores"]["fefc_origem_partidaria"])==Decimal(reais(origins["RECURSOS DE PARTIDO POLITICO"]["fefc"]))
    assert origins["RECURSOS DE PARTIDO POLITICO"]["fefc"]>0
    # Do not assume party origin equals all receipts excluding candidate transfers.
    def breakdown(d):return {k:{"linhas":v["linhas"],"receita":reais(v["receita"]),"fefc":reais(v["fefc"])} for k,v in sorted(d.items())}
    result={"hashes_zip":hashes,"cortes":{"candidaturas":mf["candidaturas"]["gerado_em"],"receitas":mf["contas"]["receitas"]["gerado_em"]},"linhas":rawrows,"duplicatas":duplicates,"por_origem":breakdown(origins),"por_natureza":breakdown(nature),"grupos":res,"ressalva":"Sem repasses = exclusão pela origem declarada; não valida cadeia de transferência, doador ou destinatário. Estimáveis identificados pela natureza declarada. Ausência não equivale a zero."}
    out=Path(out);out.mkdir(parents=True,exist_ok=True)
    (out/"recontagem-financeira.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n")
    print("ORIGENS",json.dumps(result["por_origem"],ensure_ascii=False))
    print("NATUREZAS",json.dumps(result["por_natureza"],ensure_ascii=False))
    for k in ["titulares","proporcional","majoritario","proporcional|FEMININO","proporcional|MASCULINO","proporcional|FEMININO|BRANCA","proporcional|FEMININO|PARDA","proporcional|FEMININO|PRETA","majoritario|FEMININO","majoritario|MASCULINO"]:
        print("GRUPO",k,json.dumps(res[k],ensure_ascii=False))
    print("OK: conciliado com agregados versionados; nenhuma informação individual exportada.")

if __name__=="__main__": main(*sys.argv[1:])
