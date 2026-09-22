# Auditoria: achados prontos sem o tratamento Fato / Leitura / Pergunta

Levantamento de leitura apenas. Nenhum arquivo alterado. Padrão de referência: três cartões com `poster-eyebrow` — **Fato** (plum), **Interpretação editorial** (coral), **Hipótese em investigação** (ink) — usado em `RaceFinding2026` (/quem-sao-elas) e explicado na seção "Como ler o site" do Método.

## Onde o padrão já existe
- `src/components/editorial/RaceFinding2026.tsx` — o exemplo completo (censo × candidaturas).
- `src/routes/metodo.tsx` (~linha 905) — a taxonomia explicada.

## Achados prontos SEM o tratamento — candidatos

### 1. `CurrentSnapshot` em `src/routes/index.tsx` (home) — CANDIDATO REAL
**Achado:** "O que os registros permitem dizer agora" — participação feminina nas majoritárias (16,9%) e maior UF (39,2%, SE), apresentados como os dois números-síntese do site.
**Problema:** fato e leitura dividem a mesma coluna de texto ("Tudo nesta parte… é quem entrou na disputa. Não há resultado eleitoral aqui"), e a pergunta em aberto não aparece como camada.
**Recomendação:** faz sentido aplicar, em versão mínima — o número segue grande, mas ganha o selo de fato, e a frase de leitura vira camada separada. **Ressalva:** a home foi declarada intocável em decisões anteriores; só aplicar se você abrir exceção explícita.

### 2. `FunnelStages2026` em `src/routes/funil.tsx` — CANDIDATO REAL
**Achado:** o contraste central do site — participação feminina nas proporcionais × majoritárias (etapas 01 e 02, números grandes).
**Problema:** os percentuais aparecem neutros dentro da figura; a leitura editorial está fora dela (lead da seção e ContextBox), e a pergunta em aberto existe apenas como etapa 4 futura, sem rótulo de "hipótese/pergunta".
**Recomendação:** faz sentido, de forma mínima — um fechamento em três camadas ao final da lista de etapas (fato: os dois percentuais com denominadores; leitura: o tamanho da porta muda entre universos; pergunta: o que acontece no resultado de outubro). Nada dentro das barras muda.

### 3. Agregação "NEGRA = PRETA + PARDA" em `RaceBreakdown` (/quem-sao-elas) e na etapa 3 do funil — LIMÍTROFE
**Achado:** percentual agregado declarado ("…% das candidaturas de mulheres deste universo").
**Recomendação:** deixar como está. É dado derivado dentro de uma visualização, com nota de limitação ao lado, e a camada de leitura desse mesmo número já existe em `RaceFinding2026` na mesma página. Adicionar três camadas ali duplicaria hierarquia dentro da figura.

## Onde NÃO faz sentido aplicar (e por quê)

- **`InBrief` (6 rotas)** — o campo `found` já é um achado pronto, mas o próprio bloco já é uma estrutura de três camadas (Encontramos / Por que importa / Em aberto), semanticamente equivalente ao padrão, com outra gramática visual. Aplicar poster-eyebrow ali criaria duas hierarquias sobrepostas.
- **`PastStrip` (/funil)** — faixa de contexto histórico, declarada como referência; o achado correspondente já vive no `InBrief` de /historico.
- **`CompetitionByUf` (/funil)** — explorador com ordenação descritiva; mede tamanho de disputa, não fecha uma descoberta.
- **`RaceExplorer`, `RaceByStateTable`, `PartyGenderTable`, `StateExplorer` (/quem-sao-elas)** — ferramentas de recorte; apresentam dados brutos sob escolha do leitor, não afirmações de descoberta.
- **`HomeFunnelFeature` (home)** — peça editorial ilustrativa declarada ("as larguras são ilustrativas"); o aside é provocação de entrada, não achado.
- **`/direitos`** — a linha do tempo já estrutura cada marco em cinco perguntas com fonte; não há número-síntese apresentado como descoberta.
- **`SeriesChart` / `HistoryFunnel` (/historico)** — visualizações; a leitura já está no `InBrief` e nas notas ao lado.
- **`/em-disputa`, `/quem-controla`, `/metodo`, `/sobre`, `/downloads`** — não apresentam achados numéricos prontos; são acompanhamento, plano de apuração e documentação.

## Resumo
Dois candidatos reais: **CurrentSnapshot** (home, com ressalva de intocabilidade) e **FunnelStages2026** (/funil). Um limítrofe que recomendo manter: a agregação negra em `RaceBreakdown`. Todo o resto já tem hierarquia equivalente (InBrief, timeline de Direitos) ou não é achado pronto (exploradores, faixas de contexto, peças ilustrativas).
