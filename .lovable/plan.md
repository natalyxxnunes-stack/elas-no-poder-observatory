# Auditoria de ordem editorial: cautela empilhada antes do achado

Levantamento de leitura apenas. Nenhum arquivo do site foi alterado. Rotas publicadas verificadas: `/` (home), `/quem-sao-elas`, `/funil`, `/historico`, `/direitos`, `/em-disputa`, `/quem-controla`, `/metodo`, `/sobre`, `/downloads`.

Critério usado: três ou mais formulações negativas ("não é", "não há", "não mede", "não prova", "nunca", "nenhum") no mesmo parágrafo ou em parágrafos/blocos consecutivos, aparecendo **antes** de qualquer número ou achado daquele trecho. Ressalvas únicas e pontuais não entraram na lista.

## Casos de acúmulo encontrados

### 1. `src/components/editorial/InBrief.tsx` usado no topo de 6 páginas — campo `unknown`
O bloco "Em poucas linhas" aparece imediatamente depois da abertura, e em várias rotas o terceiro campo já é uma pilha de negativas, antes de o leitor ter visto qualquer gráfico:
- `/funil`: "a eleição não ocorreu e não há resultado. E a distribuição por cor/raça… que a fotografia atual não grava."
- `/quem-sao-elas`: "as bases ainda não existem… A base também não capta de forma confiável identidade trans ou travesti, nem deficiência de modo comparável."
- `/historico`: "o resultado de 2026, a cor/raça de todas as candidaturas… que esta versão ainda não contabiliza."
Por que é acúmulo: o próprio campo `matters` da mesma caixa já vem negativo em `/historico` ("Crescer em candidaturas não é o mesmo que…", "nenhum dos dois se distribui igualmente"), então o leitor recebe duas negativas seguidas dentro do resumo de entrada. Não é uma ressalva isolada: é o formato do resumo que está terminando em advertência em quase toda página.

### 2. `src/routes/direitos.tsx` — abertura + `InBrief`, três negativas em sequência
- Lead da abertura: "não é espontânea… cada uma com alcance limitado".
- `found`: "Onze marcos entre 1932 e 2026. **Nenhum deles** produziu igualdade imediata".
- `matters`: "evita atribuir a ela efeitos **que não estão** no seu escopo".
- `unknown`: "O efeito isolado de cada norma… **que este eixo não faz**".
Por que é acúmulo: o único achado positivo da página ("onze marcos") é engolido na mesma frase por uma negativa, e as três linhas seguintes são todas restrições. A linha do tempo com os marcos reais só aparece depois disso.

### 3. `src/routes/funil.tsx` — seção "Como ler este funil", antes dos números de competição
Sequência: `FUNNEL_READING_RULE` no lead ("o funil organiza perguntas, **não** faz uma subtração… **não** uma perda direta de pontos") + `ContextBox` "Na proporcional…" (termina em "pode ter muitos votos e **não** ser eleita") + `ContextBox` "O funil é uma fotografia" ("**não** o rastro das mesmas pessoas… **nem** a chance de… ficam **fora** da contagem").
Por que é acúmulo: três blocos consecutivos, todos fechando em negativa, posicionados **entre** o funil e a seção "Tamanho da disputa". A cautela é legítima, mas está concentrada num muro só, em vez de distribuída junto de cada achado.

### 4. `src/routes/quem-sao-elas.tsx` — seção "Limites da fonte" antes da tabela de partidos
Dois `ContextBox` lado a lado: "não identifica pertencimento étnico nem vínculo com povo… não devem ser tratadas como equivalentes" + "Publicar um cruzamento que a fonte não sustenta produziria número… sem base".
Por que é acúmulo: a seção inteira é de negativas e está posicionada **antes** do achado "Quem lança mulheres?" (composição por partido). Movida para depois dessa tabela, funcionaria como nota de leitura; onde está, interrompe a sequência de achados.

### 5. `src/routes/em-disputa.tsx` — regra editorial + três `ContextBox`
Antes da lista de proposições: card "Projeto apresentado **não** é projeto aprovado / Situação em tramitação **não** antecipa resultado". Depois, a seção "Três distinções que evitam erro" tem os três cards negativos ("Só o último produz norma", "**não** cria direito novo", "**Não** atribuímos efeito estatístico… **não** é prova de causa"), e antes deles o `InBrief` já dizia "comparar ciclos sem considerar a regra vigente produz conclusão falsa".
Por que é acúmulo: cinco blocos de advertência cercam uma lista que, em si, é o achado (o que está em vigor e o que tramita).

### 6. `src/routes/metodo.tsx` — camada 1, cinco `ContextBox` seguidos
Entre o passo a passo e a ficha técnica: "…**não** ser eleita… 'mais votos' **não** é o mesmo que 'eleita'" + "É a classificação do dataset — **não** uma definição sociológica" + PLAIN_STEPS já trazendo "**Nunca** somamos os dois", "**Nenhum** percentual aparece sem esse total visível", "**nunca** um número provisório", "**não** prova que uma regra causou o resultado".
Por que é acúmulo: seis itens numerados, três deles terminando em proibição, seguidos de blocos de contexto também negativos. Em Método isso é mais defensável (é a página da metodologia), mas a **camada 1**, que se propõe a ser linguagem simples, está mais cheia de "o que você não pode concluir" do que de "como calculamos".

### 7. `src/components/funnel/FunnelStages2026.tsx` — etapa racial e etapa futura
Na etapa de cor/raça: `GapNote` com "**não** existe aqui percentual… esse denominador **não** está no snapshot e **não** é estimado", logo após a agregação declarada. Na etapa 4: "A eleição… ainda **não** ocorreu. **Não** há voto apurado **nem** cadeira… — **não** o número de candidaturas". E no fallback: "Ausência de dado **não** é ausência de mulheres negras".
Por que é acúmulo: três negativas na mesma frase da etapa 4, dentro da própria visualização, antes de o leitor terminar de ler os degraus com dados.

### 8. `src/routes/index.tsx` — bloco "O que os registros permitem dizer agora"
Lead: "**Não há** resultado eleitoral aqui: o 1º turno é em 4 de outubro…", antes dos dois números grandes (majoritário e território).
Por que é caso limítrofe, não acúmulo: é uma única negativa e vem seguida imediatamente do dado. Anotado só para registro; não recomendo mexer.

## Fora da lista (ressalva pontual legítima, sem empilhamento)
- `/sobre`: "Onde a IA não entra" e "Atualização de base: não é correção" — negativas isoladas, cada uma no seu bloco.
- `/quem-controla`: as negativas estão dentro das alavancas e do critério editorial, depois do achado; ordem já correta.
- `/metodo`, seção "Os limites declarados deste método": é o lugar próprio das limitações, no fim da página. Nenhuma `GapNote` dessa seção deve ser tocada.
- `/downloads`, `/historico` (seções de gráfico): negativas aparecem como nota de fonte, depois do dado.

## Prioridade sugerida, se você quiser corrigir depois
1. `/direitos` — abertura e resumo (caso mais claro de cautela antes de achado).
2. `/funil` — redistribuir os três blocos de "como ler" em vez de mantê-los num muro só.
3. `/quem-sao-elas` — mover "Limites da fonte" para depois da tabela de partidos.
4. `/em-disputa` — manter a regra editorial, aliviar a repetição entre ela e os três cards.
5. `InBrief` — revisar o campo `unknown` nas seis rotas para não fechar sempre em pilha de negativas.
6. `/metodo` camada 1 — só o tom dos blocos de contexto; nada da seção de limitações muda.

Nenhuma dessas mudanças remove ressalva metodológica: o objetivo é ordem (achado → leitura → cautela) e não supressão.
