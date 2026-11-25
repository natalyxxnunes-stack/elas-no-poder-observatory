/** Compare the public compact data with the independent, hash-pinned audit artifact. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { FINANCE_AUDIT_TOTAL as T, FINANCE_AUDIT_UNIVERSES as U, FINANCE_AUDIT_RACE as R } from "../../src/data/financas-auditoria";
import { FEFC_TOTAL, FEFC_TOTAL_TITULARES, FEFC_TOTAL_ORIGEM, FEFC_PARTIDOS_ORIGEM } from "../../src/data/fefc-partidos-2026";
const j=JSON.parse(readFileSync(process.argv[2],"utf8"));
const g=j.grupos;
const money=(n:number)=>Math.round(n*100);
const equal=(a:number,b:string|number,label:string)=>assert.equal(money(a),money(Number(b)),label);
const counts=(a:{titulares:number;noArquivo:number;positivas:number;zeros:number;ausentes:number},b:any,k:string)=>{
  for(const [x,y] of [["titulares","titulares"],["noArquivo","no_arquivo"],["positivas","positivas"],["zeros","zero_liquido"],["ausentes","ausentes"]] as const)assert.equal(a[x],b[y],k+" "+x);
  assert.equal(a.titulares,a.noArquivo+a.ausentes,k+" titulares");
  assert.equal(a.noArquivo,a.positivas+a.zeros,k+" cobertura");
};
const vals=(a:{receitaBruta:number;repasses:number;semRepasses:number;fefcBruto:number;fefcPartidos:number},b:any,k:string)=>{
  for(const [x,y] of [["receitaBruta","bruta"],["repasses","repasses"],["semRepasses","sem_repasses"],["fefcBruto","fefc_bruto"],["fefcPartidos","fefc_origem_partidaria"]] as const)equal(a[x],b.valores[y],k+" "+x);
  assert.equal(money(a.receitaBruta),money(a.repasses)+money(a.semRepasses),k+" receitas");
};
counts(T,g.titulares,"titulares");vals(T,g.titulares,"titulares");
for(const [x,y] of [["estimaveis","estimaveis"],["financeiras","nao_estimaveis"],["fefcRepasses","fefc_repasses"],["fefcEstimaveis","fefc_estimaveis"]] as const)equal(T[x],g.titulares.valores[y],x);
for(const [u,d] of Object.entries(U)){
  counts(d,g[u],u);vals(d,g[u],u);
  for(const [k,a] of [["FEMININO",d.mulheres],["MASCULINO",d.homens]] as const){
    const b=g[u+"|"+k];counts(a,b,u+" "+k);
    equal(a.medianaArquivo,b.mediana_no_arquivo,u+" mediana arquivo");equal(a.medianaPositivas,b.mediana_positivas,u+" mediana positivas");equal(a.receitaBruta,b.valores.bruta,u+" receita");equal(a.fefcPartidos,b.valores.fefc_origem_partidaria,u+" FEFC direto");
  }
}
for(const [race,a] of Object.entries(R)){
  const b=g["proporcional|FEMININO|"+race];
  assert.equal(a.titulares,b.titulares);assert.equal(a.noArquivo,b.no_arquivo);assert.equal(a.positivas,b.positivas);equal(a.medianaArquivo,b.mediana_no_arquivo,race);equal(a.medianaPositivas,b.mediana_positivas,race);
}
equal(FEFC_TOTAL.fefc,g.proporcional.valores.fefc_bruto,"proporcional bruto");
equal(FEFC_TOTAL_TITULARES.fefc,g.titulares.valores.fefc_bruto,"titulares bruto");
equal(FEFC_TOTAL_ORIGEM.fefc,g.proporcional.valores.fefc_origem_partidaria,"proporcional origem");
equal(FEFC_TOTAL_ORIGEM.mulheres.fefc,g["proporcional|FEMININO"].valores.fefc_origem_partidaria,"mulheres origem");
for(const [p,d] of Object.entries(FEFC_PARTIDOS_ORIGEM)){
  const b=g["proporcional|partido|"+p];
  assert.equal(d.candidaturas,b.titulares,p);
  equal(d.fefc,b.valores.fefc_origem_partidaria,p);
  equal(d.mulheres.fefc,g["proporcional|partido_genero|"+p+"|FEMININO"]?.valores.fefc_origem_partidaria??0,p+" mulheres");
  assert.equal(Object.values(d.raca).reduce((n,x)=>n+money(x.fefc),0),money(d.fefc),p+" raça");
  assert.equal(Object.values(d.mulheresRaca).reduce((n,x)=>n+money(x.fefc),0),money(d.mulheres.fefc),p+" mulheres raça");
}
console.log("OK: recortes publicados conciliados com a recontagem independente, centavo a centavo.");
