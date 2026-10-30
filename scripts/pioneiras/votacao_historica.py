"""Recontagem da votação nominal histórica usada na seção Pioneiras.

Uso:
  python3 scripts/pioneiras/votacao_historica.py PASTA_DO_ZIP_DESCOMPACTADO ANO UF CARGO "NOME NO TSE"

Exemplos (arquivos em https://cdn.tse.jus.br/estatistica/sead/odsele/votacao_candidato_uf/):
  1950 SP "DEPUTADO ESTADUAL" "PATRÍCIA GALVÃO"
  1982 RJ "DEPUTADO FEDERAL" "LELIA DE ALMEIDA GONZALES"
  1986 RJ "DEPUTADO ESTADUAL" "LELIA DE ALMEIDA GONZALEZ"

Colunas do arquivo (sem cabeçalho, latin-1, separador ;): 10 nome, 12 cargo,
18 situação, 20 sigla do partido, 25 votos nominais.
"""
import csv, glob, hashlib, statistics, sys

pasta, ano, uf, cargo, nome = sys.argv[1:6]
arq = glob.glob(f"{pasta}/**/*_{ano}_{uf}.txt", recursive=True)[0]
print("arquivo:", arq, "sha256:", hashlib.sha256(open(arq, "rb").read()).hexdigest())
rows = [r for r in csv.reader(open(arq, encoding="latin-1"), delimiter=";") if r[12] == cargo]
votos = lambda r: int(r[25])
eleitos = [r for r in rows if r[18] == "ELEITO"]
alvo = next(r for r in rows if r[10] == nome)
partido = sorted((r for r in rows if r[20] == alvo[20]), key=votos, reverse=True)
print(f"candidaturas {len(rows)} | eleitos {len(eleitos)} | menor votação eleita {min(map(votos, eleitos))} | mediana {statistics.median(map(votos, rows))}")
print(f"{nome}: {votos(alvo)} votos, {alvo[18]}, {alvo[20]}")
print(f"lista do {alvo[20]}: {len(partido)} candidaturas, {sum(r[18] == 'ELEITO' for r in partido)} eleitas, mediana {statistics.median(map(votos, partido))}, posição {[r[10] for r in partido].index(nome) + 1}")
