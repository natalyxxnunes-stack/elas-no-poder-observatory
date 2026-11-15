# Quem são elas? — Recontagem financeira oficial de 15/11/2026

**Estado:** integração e auditoria na branch de teste redesign-editorial-v3-teste. Nenhum merge ou publicação na main. Conferência final de apresentação e decisão editorial pendentes.

## Fonte e corte

- Fonte primária: https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026
- ZIP de prestação de contas de candidaturas, SHA-256: 9ae80e2e2ea9561c9f9810008b9efad0bba6e7f16d8b56935039cc6fb3cc71bf (472.795.238 bytes).
- CSV de receitas: receitas_candidatos_2026_BRASIL.csv; geração 15/11/2026, 04:05:10; SHA-256 73ec0cd7727edd6ef3f9b69e7158f0e9dbb02a772a47e01e01374d004f4bdd90.
- Cadastro de candidaturas: consulta_cand_2026_BRASIL.csv, 15/11/2026, 05:30:40; SHA-256 60843af924b8da04d3f5bbacc0c0b14582dc89eba502e90a0b661c33928f44ce.
- Unidade de análise: candidatura titular (SQ_CANDIDATO); receita declarada = soma de VR_RECEITA após remoção de linhas integralmente repetidas. Gênero, cargo, partido, UF e cor/raça vêm do cadastro de 15/11. Proporcional: deputado federal, estadual e distrital; majoritário: presidente, governador e senador. Sem vice nem suplente.

## Achado central — 56,1%

As 6.836 candidatas proporcionais com receitas declararam **R$ 1.819.706.552,93**. As 3.203 candidatas brancas com receita receberam **R$ 1.020.920.855,30**.

**Cálculo:** R$ 1.020.920.855,30 / R$ 1.819.706.552,93 = **56,1036%**, arredondados a **56,1%**. O denominador é a receita declarada por candidaturas femininas proporcionais com receita, e não a soma de todos os gêneros.

| Cor/raça declarada | Candidatas com receita | Receita (R$) | Fração da receita das mulheres |
| --- | ---: | ---: | ---: |
| Branca | 3.203 | 1.020.920.855,30 | 56,1% |
| Parda | 2.332 | 504.718.085,33 | 27,7% |
| Preta | 1.180 | 258.566.394,63 | 14,2% |
| Indígena | 81 | 27.557.271,15 | 1,5% |
| Amarela | 40 | 7.943.946,52 | 0,4% |
| **Total** | **6.836** | **1.819.706.552,93** | **100%, salvo arredondamentos** |

## Comparação da extração anterior

| Indicador | 13/11/2026 | 15/11/2026 |
| --- | ---: | ---: |
| Receitas de candidaturas proporcionais (R$) | 5.535.477.655,44 | 5.537.498.125,18 |
| Receita de mulheres proporcionais (R$) | 1.818.708.171,29 | 1.819.706.552,93 |
| FEFC recebido por candidaturas proporcionais (R$) | 3.987.718.761,79 | 3.988.617.748,81 |
| FEFC recebido por mulheres proporcionais (R$) | 1.488.112.078,15 | 1.488.657.197,62 |
| Candidaturas com receita, seis cargos | 19.655 | 19.660 |
| Mulheres proporcionais com receita | 6.836 | 6.836 |
| Percentual das brancas | 56,1032% | 56,1036% |

O cadastro de 15/11 mantém **19.531 candidaturas proporcionais, 6.953 mulheres**, como em 14/11. O cadastro usado na fotografia antiga de 04/11 era de 27/10 e teve mudanças de classificações preta/parda. Mudanças entre fotografias que usam cadastros diferentes não podem ser atribuídas exclusivamente ao financeiro.

## Despesas de candidatas proporcionais

- Contratadas: R$ 1.672.742.289,03.
- Pagas com FEFC: R$ 1.393.500.897,02.
- Pagas com Fundo Partidário: R$ 125.982.464,43.
- Pagas com outros recursos: R$ 133.299.266,20.
- Receita de financiamento coletivo: R$ 3.182.667,12, em 551 candidatas.

Despesas contratadas, pagamentos e receitas não são somáveis como uma medida única.

## Integridade e ressalvas

**269.003** linhas brutas de receitas; **982** duplicatas integrais removidas (R$ 778.961,81); **268.021** processadas. Zero candidaturas sem correspondência e zero divergências de gênero nos cruzamentos; zero pagamentos sem prestador identificado e zero doadores originários sem receita correspondente, segundo os scripts usados.

Entre **19.660 candidaturas com receita nos seis cargos**, **19.363** constam com tipo de prestação FINAL, **195** PARCIAL e **102** RELATÓRIO FINANCEIRO. Tipo de envio não equivale a aprovação de contas. A extração de 15/11 é posterior ao prazo de 14/11 do segundo turno, mas ainda está sujeita a complementações, retificações e julgamento.

Os dados agregados, sem registros pessoais, constam dos JSON desta pasta. Scripts reutilizados: dinheiro_2026.py, fefc_partidos_2026.py, despesas_doadores_2026.py e snapshot_candidaturas_2026.py; integridade do snapshot checada por validar_snapshot_financeiro.mjs.

**Pendente antes da publicação:** conferência visual de Dinheiro no desktop e no celular, verificação de referências a extrações anteriores em reportagens que usam outros cortes, validação final do build e decisão editorial. Estudos anteriores de 04/11 ou 12/11 devem manter a data original até reprocessamento específico.
