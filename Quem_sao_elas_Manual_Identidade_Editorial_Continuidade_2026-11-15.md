# QUEM SÃO ELAS?
## Manual de identidade editorial, direção de arte e continuidade do redesign

**Versão de continuidade: 15 de novembro de 2026 · revisão integrada dos pilotos**  
**Abrangência:** identidade visual, repertório jornalístico, experiência digital, critérios de dados, implementação e passagem para outra conversa.  
**Status:** decisões editoriais consolidadas; avaliação comparativa dos três pilotos realizada, **sem aprovação visual final**.  
**Observação essencial:** este arquivo é autossuficiente para orientar o trabalho; é preciso conferir o estado atualizado do GitHub e do site antes de modificar qualquer código.

> **Regra de preservação:** a homepage fotográfica aprovada e a logo original são a referência do projeto. A **main** contém a identidade vigente. As alterações dos PRs **#6** e **#8** são propostas, não autorização para integração ou publicação.

> **Imagem no PDF:** captura real da homepage com manchete principal, fotografia do plenário creditada e paleta roxa. Referência consultável: `src/components/home/CapaEditorialV3.tsx` na `main`. O PDF ilustrado contém a captura.

---

## 01. Identidade e propósito jornalístico

**Quem são elas?** é um observatório independente de jornalismo de dados, investigação política e perspectiva feminista sobre mulheres, eleições e exercício do poder no Brasil. Pergunta central: **“Onde as mulheres desaparecem entre candidatura e poder?”**

Essa pergunta deve orientar tanto a apuração quanto a navegação: candidatura, financiamento, eleição, diplomação, ocupação efetiva dos cargos, atuação parlamentar, espaços institucionais de decisão, alianças, partidos, antifeminismo e violência política de gênero. Não reduzir o projeto a um painel de estatísticas eleitorais ou a um site institucional.

A referência formal é **uma revista jornalística contemporânea**: com manchetes, hierarquia de pautas, reportagem, perfis, fotografia, documento, coleção, seção temática, arquivo e ferramentas de exploração de dados. O desenho deve sugerir investigação em andamento, sem confundir abertura jornalística com interface de dashboard.

**Referência comparativa:** *Gênero e Número*, especialmente a variedade de tratamentos visuais que oferece a diferentes produções. A ideia é aprender com sua diversidade editorial, **sem reproduzir identidade, elementos ou layouts**. O diferencial do Quem são elas? é acompanhar a passagem entre concorrer, receber recursos, conquistar vagas e exercer poder.

### O que se deseja que a leitora perceba

- **Credibilidade:** cada afirmação e cada número têm origem, escopo e limites reconhecíveis.
- **Personalidade:** há presença cromática e escolhas de direção de arte próprias, inclusive em páginas internas.
- **Ritmo:** a apresentação varia conforme o conteúdo; não se repetem aberturas, cartões ou SVGs por hábito.
- **Profundidade com acesso:** a narrativa principal é legível; dados, métodos e documentos estão disponíveis sem comandar toda a aparência da página.
- **Autonomia editorial:** a identidade não deve se confundir com visual de IA, estética juvenil ou template corporativo.

## 02. Decisões visuais consolidadas

| Elemento | Direção aprovada | Limite/ressalva |
| --- | --- | --- |
| Logo | **Preservar integralmente a logo original e o símbolo do olho.** | Não criar substitutos, redesenhar o olho ou mudar caixa do nome. |
| Linguagem | Editorial, adulta, contemporânea, feminista, investigativa. | Evitar dashboard corporativo, infografia decorativa e colagem juvenil. |
| Fontes | **Fraunces**, **Work Sans** e **IBM Plex Mono**. | Uso funcional de cada família; não substituir por fontes genéricas por gosto pessoal. |
| Estrutura | Grade rigorosa, alinhamento, hierarquia, contraste e respiro. | Personalidade não significa excesso de elementos. |
| Cor | Roxo estrutural; tinta, ameixa, violeta, creme quente, coral e dourado nas composições editoriais. | O **vinho não foi aprovado** como cor estrutural nova. |
| Fotografia | Documento visual de fato, pessoa ou acontecimento; pertinente, contextualizada, creditada. | Não usar plenário genérico para qualquer votação, nem foto anterior à eleição como foto das eleitas. |
| Documento | Fonte primária real, com legenda, natureza, data e acesso à origem. | Não fabricar fac-símiles nem apresentar diagrama como documento original. |
| Arte vetorial | Original, diversa e com função editorial identificável. | Não transformar todos os espaços em variações do mesmo SVG ou composição geométrica. |
| Dados e gráficos | Título informativo, fonte, universo, numerador, denominador, período/corte e limitações. | Sem percentual sem universo, sem associação arbitrária de cor à raça/partido. |
| Navegação | Leitura jornalística na superfície, exploração de dados e documentação em camadas acessíveis. | Não esconder informação essencial; links diretos para documentação devem funcionar. |

**A homepage atual é aprovada como referência de linguagem**, não como template para reproduzir indiscriminadamente nas outras rotas. Sua fotografia principal, a logo, o tratamento da manchete e a legenda contextual devem ser preservados. A fotografia mostra o plenário da Câmara em maio de 2023, durante a tramitação do PL 1.085/2023, e **não retrata as seis votações investigadas**.

> **Imagem no PDF:** comparação entre homepage aprovada e primeira dobra da proposta do Método no PR #8. A segunda não está aprovada automaticamente.

## 03. Sistema cromático: duas camadas, sem confusão

### 3.1. Cores estruturais da interface

O código-base (`src/styles.css`) define o **roxo** como eixo da marca. **Tinta** dá contraste e profundidade; branco-papel e tons claros são superfícies de leitura, não o aspecto predominante da revista.

| Token | Valor no código | Função |
| --- | --- | --- |
| `--plum` | `oklch(0.39 0.16 305)` | Roxo estrutural: títulos, links, painéis e destaque. |
| `--plum-deep` | `oklch(0.25 0.09 305)` | Aberturas e superfícies escuras de maior peso. |
| `--plum-soft` | `oklch(0.52 0.13 305)` | Variação tonal da mesma família. |
| `--plum-bright` | `oklch(0.74 0.13 305)` | Contraste em superfícies escuras. |
| `--ink` | `oklch(0.19 0.035 310)` | Tinta: texto, painéis escuros, rodapé. |
| `--paper` | `oklch(0.992 0.002 300)` | Papel quase branco: uso funcional, sem domínio da página. |
| `--cream` | `oklch(0.955 0.012 300)` | **Nome histórico enganoso:** na implementação atual é frio, próximo de cinza-lilás. |
| `--muted` | `oklch(0.955 0.008 305)` | Superfície clara quase lilás; evitar repetição em sequência. |
| `--coral` | `oklch(0.63 0.2 34)` | Cor semântica do **dado atual (2026)** em gráficos. |
| `--coral-ink` | `oklch(0.5 0.19 32)` | Variante de coral apropriada para texto. |
| `--rule` | `oklch(0.87 0.014 305)` | Linhas funcionais finas e divisões discretas. |

**Atenção:** há um histórico de “esfriamento” de `--cream` e `--butter` no código. A simples alternância de `--paper`, `--cream` e `--muted` já produziu a predominância de branco/lilás **rejeitada**. Não restaurar esse ritmo sob o nome de “respiro editorial”.

### 3.2. Paleta complementar aprovada para arte e chamadas

São seis amostras aproximadas da prancha de referências, codificadas no GitHub. O uso deve ser **expressivo e pertinente**; nenhuma cor complementar substitui o roxo estrutural ou a convenção dos gráficos.

> **Prancha no PDF:** amostras de tinta `#341738`, ameixa `#602f6a`, violeta `#915fa5`, creme `#f7e5d8`, coral `#eb5d39` e dourado `#f2ac37`.

| Token | HEX | Emprego correto |
| --- | --- | --- |
| `--art-ink` | `#341738` | Fundo de composição, relação com o roxo e contraste. |
| `--art-plum` | `#602f6a` | Superfícies e enquadramentos editoriais. |
| `--art-violet` | `#915fa5` | Ritmo intermediário, contraste entre tratamentos. |
| `--art-cream` | `#f7e5d8` | Creme quente **complementar**, não fundo obrigatório nem substituto global do papel. |
| `--art-coral` | `#eb5d39` | Elemento expressivo em arte autoral, não marcação semântica de gráfico. |
| `--art-gold` | `#f2ac37` | Ênfase e contraste em composição, sem virar dado quantitativo. |

**Como distribuir:** o roxo e a tinta devem ter presença visual inequívoca na revista. Coral, dourado e violeta criam tensão e variação em chamadas, capas de coleção, aberturas e peças autorais. O fundo claro é reservado para leitura e tabelas, não para preencher a maioria das telas por inércia. **Não existe percentual obrigatório de área ocupada por cada cor**: avaliar o ritmo efetivo da página inteira.

**Contradição já identificada:** o creme quente foi aprovado como parte do repertório, mas seu uso extensivo em versões preliminares do *Método* foi criticado por parecer um “creme estranho”. Portanto, **a paleta está aprovada; a proporção e a aplicação de creme em grandes blocos não estão**. Na nova prévia do Método, o creme quase não é eixo estrutural: a composição passa a ser comandada por roxo, tinta, fotografia, documento e dados.

**Não repetir:** faixa roxa automática no topo de cada página; alternância mecânica branco/lilás/creme; vinho estrutural; cor forte em fundo forte sem contraste; decoração para disfarçar ausência de uma solução jornalística.

### 3.3. Cores dos dados: sistema independente

Cores editoriais não podem contaminar a semântica de gráficos. A convenção de raça/cor existente no repositório deve permanecer identificável por rótulo:

| Categoria autodeclarada | Código/convenção |
| --- | --- |
| Branca | `--race-branca` (cinza-roxo) |
| Parda | `--race-parda` (ocre) |
| Preta | `--plum` (roxo) |
| Indígena | `--forest` (verde) |
| Amarela | `--race-amarela` (azul) |
| Sem informação | `--race-na` |

**Preta e parda são categorias distintas.** Se houver uma soma para “negra”, informar expressamente que agrega pretas e pardas e por qual motivo. Nunca depender exclusivamente de cor nem empregar codificação partidária ou moralizante para grupos.

## 04. Tipografia, hierarquia e composição

### Famílias e funções

- **Fraunces (400, 600, 700):** manchetes, títulos, números centrais com relevância jornalística, citações e chamadas. Itálico como recurso pontual de linguagem editorial.
- **Work Sans (400, 500, 600):** corpo das reportagens, menus, legendas, perguntas de filtro e interface. Não comprimir a entrelinha em textos explicativos.
- **IBM Plex Mono (400, 500):** data de geração, hash, identificador, fonte técnica e números tabulados. Evitar textos corridos ou subtítulos longos em mono/caixa-alta.

O manual v3 prevê **mínimo de 13 px**. Para leitura extensa, usar escala e entrelinha confortáveis; não fazer textos minúsculos para caberem em composições de aparência editorial. Abaixo de título ou indicador principal, contextualizar período, fonte e universo sem diminuição exagerada.

### Regras espaciais

- A hierarquia visual deve se reconhecer de longe: manchete → evidência dominante → interpretação ou contexto → acesso às bases.
- Elementos sempre alinhados por grade. Aceitam-se assimetrias deliberadas, **não** colagens tortas ou sobreposição decorativa.
- O respiro funciona entre capítulos e dentro da leitura. Longas extensões de vazio branco **não** equivalem a sofisticação.
- Não preencher cada tela com arte. Há lugares para uma fotografia ou gráfico ocupar grande área e lugares para tipografia bem resolvida.
- Bordas e fios: só onde separam unidades informacionais; **fios roxos grossos repetidos em todas as seções foram rejeitados**. Linhas de tabela são discretas.
- Números grandes apenas quando o número representa o achado. “01, 02, 03” apenas quando há sequência real, não como ornamentação universal.
- O nome da matéria não precisa ser repetido dentro da imagem. A imagem oferece outro nível de informação.

### Mobile não é página espremida

- Reorganizar a ordem entre foto, legenda, gráfico e texto sem perda de contexto.
- Evitar largura horizontal excedente em texto, tabela e cartões; tabelas grandes podem rolar dentro do próprio componente com indicação adequada.
- Ativação por teclado e toque; alvos interativos legíveis e foco visível.
- Legenda e fonte acompanham imagem e gráfico também no celular.
- Capturar **a primeira dobra e a página inteira**, além de testar o que fica recolhido e os links por âncora.

## 05. Repertório visual e documentação: escolher pela pauta

A identidade nasce da alternância **criteriosa** de quatro linguagens. Não há obrigação mecânica de incluir duas ou três delas em cada página. **A evidência determina a forma.**

### 5.1. Fotografias documentais

As fotografias precisam ser **reais, localizadas em fonte verificável, contextualizadas e com direitos conferidos**. Registrar em `src/data/fotos.ts` com cópia local em `public/fotos`, URL e crédito. A legenda deve informar o que se vê, quando e por que a imagem aparece naquela pauta. Quando a cena não representa precisamente o evento investigado, **dizer isso**.

**Acervo efetivamente registrado no código:**

| Chave | Registro / crédito | Situação e cuidado |
| --- | --- | --- |
| `plenario-igualdade-salarial-2023` | Plenário, maio/2023, **Bruno Spada/Câmara dos Deputados** | **Usado na homepage aprovada**; não documenta as seis votações analisadas. |
| `plenario-camara-junho-2026` | Sessão deliberativa de 30/06/2026, **Thiago Cristino/Câmara** | Usar somente em pauta pertinente ao evento ou de modo expressamente contextualizado. |
| `bancada-feminina-camara-marco-2026` | Bancada feminina da Câmara, março/2026, **Vinicius Loures/Câmara** | No piloto do Método, representa presença institucional anterior à eleição, não o conjunto das eleitas de 2026. |
| `bertha-lutz-1927` | Bertha Lutz na campanha pelo voto, 1927; **Arquivo Nacional** | Fotografia histórica com domínio público declarado no registro; não usar como ilustração universal de todas as mulheres. |
| `pagu` | Retrato atribuído à década de 1920; **autor não identificado/Wikimedia Commons** | **Licença e procedência ainda pendentes de verificação independente.** Não declarar direitos resolvidos. |

**Lélia Gonzalez:** ainda não há fotografia com direitos verificados registrada em `fotos.ts`. Acervo aberto e imagem encontrada não são, por si, licença de reutilização.

### 5.2. Documentos reais

Recortes de documentos, registros oficiais, páginas de dados, decisões e fichas do TSE enriquecem a linguagem investigativa quando a fonte é visível e passível de conferência.

- Indicar **natureza exata**: página do portal, PDF oficial, CSV original, reprodução, referência bibliográfica, tabela reconstruída, transcrição ou fac-símile.
- Manter título, órgão emissor, data, endereço original, eventual licença e limites.
- **Nunca simular um documento do TSE** nem criar papéis falsos como adereço; não confundir captura de portal com conteúdo bruto de CSV.
- Para links quebrados/arquivos indisponíveis, registrar a pendência, em vez de inventar substituto.

Na proposta atual do Método, `public/documentos/tse-candidatos-2026-portal.png` é uma **captura real da página “Candidatos - 2026” do Portal de Dados Abertos**, com origem descrita em `tse-candidatos-2026-portal-fonte.txt`. **Não é imagem do arquivo CSV.** A licença do conjunto de dados não deve ser automaticamente atribuída à interface visual capturada.

### 5.3. Infografia e composições vetoriais

A arte autoral apresenta uma **relação que precisa ser explicada**: etapas de apuração, transição entre candidatura e mandato, distribuição de vagas, comparação de bases ou estrutura de poder. Não repetir a mesma matriz geométrica para todos os assuntos.

**Exemplos de função válida:** esquema de obtenção da base → definição do universo → conferência/cruzamento → publicação da conta; mapa eleitoral com valores reais por UF; fotografia documental acompanhada de marcadores editoriais; hierarquia de acervo por coleção; linha do tempo normativa com fontes.

**Exemplos rejeitados:** personagem fictícia para ilustrar deputadas; ícone gigante de microfone repetido em vários lugares; cartão com forma abstrata e manchete duplicada; barras que parecem dados mas são apenas desenho; setas e números sem relação com uma sequência real; imagem de plenário gerada por IA.

### 5.4. Visualização de dados

- Cada gráfico responde a uma pergunta jornalística; o título pode comunicar o achado.
- Exibir **universo, recorte, período, numerador, denominador, data de corte, fonte e limitações**.
- Não confundir a **distribuição das eleitas por cargo** com o **percentual das vagas em cada cargo conquistadas por mulheres**. São perguntas e denominadores diferentes.
- Para o Senado de 2026, o denominador das vagas disputadas é **54**, não o total de **81 cadeiras** da instituição.
- Gráficos de cor/raça precisam mostrar categoria escrita além da cor; pretas e pardas separadas.
- Distinguir receitas **declaradas** de FEFC, Fundo Partidário e outras modalidades, sem supor equivalência.

## 06. Famílias editoriais: tratamentos distintos, mesma identidade

### 6.1. Homepage — referência aprovada

**Preservar** `src/components/home/CapaEditorialV3.tsx`, os componentes de marca e a abertura documental. A capa reúne manchete principal, vitrine de histórias, seis temas, recursos eleitorais e Biblioteca. O refinamento futuro é de ritmo, com revisão específica; **não redesenhar a homepage ao trabalhar páginas internas**.

### 6.2. Quem entrou? / Eleitas

A consulta às **342 eleitas** deve combinar uma abertura jornalística e um conjunto explorável de registros, com filtros por cargo, UF, partido e cor/raça, além de fichas individuais. A visualização por cargo deve mostrar corretamente a **fração das vagas disputadas** ocupadas por mulheres, com base e data de referência explícitas. Evitar um paredão de 342 cartões sem ritmos ou agrupamentos; usar carregamento progressivo sem esconder o universo total. Não criar fotos falsas de candidatas.

**Situação em 15/11/2026:** o PR #8 já contém um **atlas de contagens absolutas por UF**, com oito UFs inicialmente visíveis, expansão a 27 e filtros que atualizam 18 fichas iniciais por lote. O atlas **não** é um mapa geográfico nem mede a proporção de vagas de cada estado. São dados por UF e por recorte, com base informada. A composição está em avaliação, sem aprovação final. Na versão móvel, conferir a distância entre os filtros, o atlas e os nomes, e não obrigar o leitor a atravessar toda a narrativa para consultar uma candidata.

### 6.3. Método — proposta documental mais recente

A composição principal da prévia atual (PR #8) foi implementada a partir de estudo estático mais recente. Esta é a estrutura proposta, **ainda em avaliação editorial**:

1. **Abertura em roxo profundo/tinta:** grande manchete “Como sabemos?” e captura real do portal TSE; texto diz o que a fonte mostra e o que não mostra.
2. **Breve enquadramento:** de onde vêm as bases, como escolher universo e por que a conta precisa revelar o denominador.
3. **Infografia autoral de quatro operações:** obter a fonte, definir universo, conferir/cruzar, publicar conta; sem barras falsas ou quantidades inventadas.
4. **Fotografia documental da bancada feminina:** evento e crédito explícitos; não atribuir à foto o resultado eleitoral de 2026; distinguir presença da representação e exercício do poder.
5. **Conta financeira aberta:** **56,1%** da receita declarada por candidatas proporcionais recebida por candidatas autodeclaradas brancas na fotografia financeira de **15/11/2026**, com numerador, denominador, fonte e ressalva de atualização. O número é um exemplo datado, **não valor permanente**; revalidar antes de republicar.
6. **Caderno técnico integral:** os **16 capítulos** de método, fonte, histórico, dicionário e correções permanecem no código; a prévia os apresenta em `details` recolhível. Links com `#correcoes`, `#dicionario` e outras âncoras precisam abrir o caderno corretamente.

**Importante:** a implementação final do caderno recolhível é uma **solução proposta**, não decisão universal para ocultar documentação de outras páginas. Deve-se avaliar se o acesso fica visível o suficiente e se os links funcionam com teclado, leitor de tela e navegação direta.

> **Imagens no PDF:** primeira dobra do Método em computador e celular, capturas reais do PR #8. A proposta permanece em avaliação.

### 6.4. Reportagens

O PR #8 testa **um tratamento específico para o índice de Reportagens**: abertura principal com **placar das seis votações nominais** da Câmara, com contagens de “Sim”, “Não” e demais registros, datas e fonte. A fotografia documental do plenário **permanece na homepage e na reportagem individual**, mas não é repetida no índice. Essa distinção evita reapresentar a mesma fotografia em duas chamadas da mesma edição. O placar é uma **visualização calculada**, não documento original nem julgamento moral automático dos votos.

Na segunda investigação, *Na voz delas*, a prévia usa uma composição coral/tinta e **referências textuais com links para o Diário da Câmara**, sem inventar fac-símiles. Coleções podem ter tratamento próprio. **Situação:** piloto implementado e testado, mas **a direção de arte ainda está sob avaliação**. Não reutilizar automaticamente o layout “manchete à esquerda, gráfico escuro à direita” nas demais páginas.

### 6.5. Temas / Investigações

Os seis temas organizam diferentes problemas jornalísticos; **não** repetir a mesma abertura roxa, vetor abstrato ou grade corporativa. Em *Investigações*, mostrar estado editorial (publicado, parcial ou aguardando dados) sem fazer a página parecer um gerenciador de tarefas. O PR #6 contém um índice muito claro e tipográfico que **não foi aprovado visualmente**.

### 6.6. Pioneiras / Memória / Direitos

Perfis históricos exigem fotografia e arquivo de época, com direitos verificados e ficha documental. Na cronologia de direitos, privilegiar marcos, documentos normativos e contexto, não treze cartões idênticos. Preservar os dois acontecimentos distintos de 2024 com identificadores únicos. A imagem de Pagu continua com situação jurídica de uso pendente.

### 6.7. Dados / Biblioteca / Downloads

A camada de consulta precisa ser navegável, mas materiais e publicações devem ser apresentados com valor editorial, não como lista indiferenciada de arquivos. Diferenciar consulta, série histórica, achados, metodologia, download e coleção. O redesign muito branco de *Dados* no PR #6 **não está aprovado**.

### 6.8. Sobre / Transparência

Preservar o texto autoral e a apresentação do observatório como **iniciativa independente de autoria individual**. Não inventar equipe ou estrutura institucional. Oferecer acesso a método, correções, contatos e critérios. A versão excessivamente branca de *Sobre* no PR #6 foi rejeitada como direção de arte.

## 07. Padrão de rigor jornalístico aplicável ao design

Um gráfico correto dentro de uma peça visual sedutora pode continuar desinformando se sua legenda omite o denominador ou mistura universos. Portanto:

- Todo dado numérico indica fonte oficial, data da fotografia, universo, unidade de análise, numerador, denominador, método e limitações pertinentes.
- Separar **candidatas, eleitas, diplomadas e ocupantes efetivas**. Mudança de status institucional não é sinônimo de outra categoria.
- Separar registros documentais, declarações de terceiros, inferência e hipótese. Em imputação a pessoa identificável, considerar contraditório e pedido de posicionamento.
- Nunca apresentar imputação como condenação, investigação como prova ou ausência de registro como evidência de ausência.
- Proteger a classificação racial autodeclarada; pretas e pardas separadas. As bases TSE têm cortes diferentes, inclusive classificação revista entre fotografias; não trocar silenciosamente.
- Na página de financiamento, **56,1%** é um cálculo específico da fotografia de receitas declaradas gerada em 15/11/2026, não uma propriedade geral de “todo o financiamento eleitoral”.
- Em toda atualização, registrar o que mudou, de qual fonte veio a modificação, quais páginas foram afetadas e se há correção editorial a publicar.

## 08. O que rejeitamos: não reinterpretar como preferência transitória

**Rejeições explícitas da editora ao longo da construção da identidade:**

1. **Branco e lilás como predominância visual**, ainda que sejam tecnicamente “limpos”.
2. **Bege ou creme quente dominantes**, inclusive quando usados para “aquecer” páginas sem solução editorial.
3. **Vinho como nova cor estrutural** supostamente mais sofisticada.
4. **Dashboard corporativo:** cards uniformes, badges de status em série, números enormes sem função, blocos repetitivos de metadados.
5. **Estética juvenil ou de IA:** fotografias sintéticas, figuras humanas geradas artificialmente, colagens tortas, formas gratuitas.
6. **Traços grossos abaixo/acima de todos os títulos** e fios ornamentais sistemáticos.
7. **SVG idêntico repetido em diferentes pautas** ou toda seção resolvida como retângulo colorido.
8. **Título duplicado dentro da imagem** sem necessidade.
9. **Alteração da logo original** ou da fotografia aprovada da abertura da homepage.
10. **Aprovação visual baseada apenas em build/CI**. Compilação, H1 correto, sem overflow e teste de números não garantem que a página pareça uma revista.

**Lição incorporada:** as primeiras intervenções no PR #6 e as primeiras versões do PR #8 corrigiram aspectos funcionais, mas voltaram a criar páginas claras demais. A solução não é adicionar faixas de cor de maneira automática; é reorganizar **qual evidência ocupa a cena, com qual hierarquia, enquadramento e sequência**.

> **Imagens no PDF:** antes (versão muito clara/creme, rejeitada) e depois (nova proposta com documento real do TSE), ambas capturas reais de prévias do PR #8.

## 09. Estado real do projeto e GitHub (verificado em 15/11/2026)

**Site publicado:** https://quemsaoelas.com.br/  
**Repositório:** https://github.com/natalyxxnunes-stack/elas-no-poder-observatory  
**Hospedagem publicada:** HostGator, com publicação por procedimento próprio. **Não presumir que um commit no GitHub publicará o site.**  
**Modo de trabalho:** alterar pelo **GitHub**, sem consumir créditos do Lovable; não executar mudanças no Lovable para fins de revisão.

| Estado | Referência | Regra operacional |
| --- | --- | --- |
| **`main`** | Identidade vigente + manual visual v3. | Base para comparar; preservar a homepage e fontes. |
| **PR #1** | `redesign-editorial-v3-teste` | Histórico da pesquisa, da capa e do acervo visual; não integrar em bloco. |
| **PR #6** | `ajustes-editoriais-identidade-aprovada-15nov` | Mistura correções funcionais aproveitáveis e composições visuais não aprovadas; **não fazer merge integral**. |
| **PR #7** | Manual v3 e controle do redesign. | **Integrado à `main`**; é a documentação normativa vigente. |
| **PR #8** | `pilotos-revista-visual-15nov2026` | **Rascunho não integrado**: pilotos de *Quem entrou?*, *Método* e *Reportagens*. A nova proposta documental do Método foi implementada e testada, mas **ainda exige aceite editorial**. |

**Arquivos centrais:**

- `docs/manual-visual.md`: decisão visual consolidada, na `main`.
- `docs/design/CONTROLE-REDESIGN-15NOV2026.md`: histórico de decisões e prioridades.
- `src/styles.css`: tokens estruturais, tipografia e variações editoriais.
- `src/components/BrandLogo.tsx` e `src/components/BrandWordmark.tsx`: logomarca original, protegida.
- `src/components/home/CapaEditorialV3.tsx` e `src/routes/index.tsx`: homepage aprovada, protegida.
- `src/data/fotos.ts` + `public/fotos/`: fotografia e documentação de direitos.
- `src/components/editorial/MetodoRevista.tsx` **somente no PR #8**: componentes de abertura, infografia, fotografia e conta.
- `src/routes/metodo.tsx` **no PR #8**: narrativa visual e caderno técnico recolhível.
- `public/documentos/tse-candidatos-2026-portal.png` e `...-fonte.txt` **somente no PR #8**: captura documental do portal TSE.
- `src/routes/eleitas.index.tsx` e `src/routes/reportagens.tsx` **no PR #8**: páginas-piloto em revisão.

**Último QA observado do PR #8 (15/11/2026):** [GitHub Actions #43771862025](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43771862025), concluído com sucesso. A execução avaliou homepage e três pilotos em computador/celular, com compilação, TypeScript, snapshot financeiro, links/filtros, documentos e renderizações. As capturas integrais utilizadas na avaliação de conjunto pertencem ao estado do PR #8 dessa execução. **QA técnico aprovado não equivale a aprovação estética.**

## 10. Protocolo obrigatório antes de qualquer alteração

**Passo 1 — Verificar, não presumir.** Abrir site publicado, `main`, PR aberto e documentação. Comparar a versão da página efetivamente publicada à branch em teste. A data deste manual é referência histórica, não garantia de estado futuro.

**Passo 2 — Declarar escopo.** Dizer quais páginas, conteúdos, dados e componentes serão modificados. Identificar o que está protegido: logo, homepage, arquivos de dados e fotografias.

**Passo 3 — Evidência visual real.** Capturar primeira dobra e **página inteira** em desktop e celular. Analisar contraste, presença cromática, fontes, licenciamento, leitura, alternância de tratamento, navegação por teclado e composição. Mostrar **antes/depois** com legenda de origem.

**Passo 4 — Propor tratamento correspondente à pauta.** Antes de vetor ou foto, perguntar: qual é a evidência principal desta página? Existe documento/fotografia real relevante e autorizado? Há dado que mereça gráfico? O que a composição faz a leitora entender?

**Passo 5 — Implementar em branch de teste.** Não alterar a `main` nem publicar em HostGator sem decisão expressa. Não copiar o PR #6 ou o PR #8 integralmente como “design aprovado”.

**Passo 6 — Conferir o rigor.** Testar origem de imagens, textos, dados, indicadores, links, filtros, efeitos de atualizações e acessibilidade. Registro das mudanças e dos cortes temporais.

**Passo 7 — Aceite editorial separado.** A editora vê a página completa. A mudança recebe decisão clara: **aprovada**, **ajustar** ou **rejeitada**. Não chamar “concluída” uma página aprovada só pelo CI.

### Critérios práticos de avaliação visual

- A página **parece pertencer à mesma revista** que a homepage aprovada?
- Mantém personalidade sem copiar a abertura fotográfica da capa?
- Há presença reconhecível de roxo/tinta e uso criterioso da paleta complementar?
- O branco/lilás/creme aparece na função de leitura, sem tomar a maior parte da identidade visual?
- Fotografias, documentos, gráficos e arte são reais/autorais e **pertinentes**, sem fórmula repetitiva?
- A leitora encontra manchete, questão central, prova e caminho para aprofundar?
- Os dados podem ser reproduzidos a partir das fontes indicadas?
- O resultado funciona no celular, no teclado e com texto longo?
- A página inteira foi vista, não apenas o hero?

## 11. Próximas etapas, sem reabrir o projeto inteiro

**Etapa atual: revisão integrada dos três pilotos (diagnóstico feito; ajustes ainda não autorizados).** As capturas integrais de desktop (1440 px) e celular (390 px) foram comparadas lado a lado com a homepage aprovada. **Achado principal:** as evidências gráficas variam, mas as quatro aberturas ainda se parecem pelo predomínio de fundo escuro e pela divisão em duas colunas ou blocos consecutivos. A diversidade de pauta não se converteu plenamente em diversidade de composição. Ver seção 14 para evidências e prioridades.

**Próxima entrega antes de integrar código:** propostas **pontuais e diferentes** para a hierarquia de abertura das páginas-piloto, demonstradas por capturas integrais e analisadas em conjunto. Não abandonar gráficos, fotografias ou documentos já pertinentes; corrigir apenas a repetição estrutural quando comprovada. Também verificar densidade da exploração por UF e intervalo entre filtros e nomes em *Quem entrou?*, acesso/legibilidade das fontes e do caderno no *Método*, e clareza da legenda das votações em *Reportagens*. **Nenhuma nova paleta, nenhuma proporção cromática fixa, nenhum template obrigatório.**

**Somente depois da decisão editorial sobre os pilotos:** retomar as outras famílias (*Temas*, *Dados*, *Pioneiras*, *Direitos*, *Biblioteca*, *Investigações*, *Sobre*), preservando informação, fontes e a homepage. Separar mudanças de dado de decisões de estilo; consolidar apenas código aprovado antes de auditar/publicar na HostGator.

## 12. Texto de continuidade para colar em outra conversa

> Estou dando continuidade ao redesign do **Quem são elas?**, observatório independente de jornalismo de dados, investigação política e perspectiva feminista sobre representação das mulheres no Brasil. Leia integralmente o arquivo **“Manual de identidade editorial, direção de arte e continuidade do redesign — 15/11/2026”**, que estou anexando, **antes de sugerir qualquer alteração**.
>
> A direção visual já está decidida: **revista jornalística contemporânea**, adulta, com **logo original preservada**, **homepage fotográfica aprovada**, roxo estrutural, tinta, violeta, creme quente apenas quando pertinente, coral e dourado em composições editoriais; Fraunces, Work Sans e IBM Plex Mono com funções distintas. Diversificar fotografia documental, documentos reais, gráficos rigorosos e peças vetoriais originais. Evitar branco/lilás predominantes, beige/creme excessivos, vinho estrutural, dashboard corporativo, SVGs repetidos, fios ornamentais em série, imagens sintéticas e textos sobrecarregados.
>
> **Não reinvente a identidade nem faça novas escolhas de paleta sem eu solicitar.** Confira primeiro o site **https://quemsaoelas.com.br/** e o repositório **https://github.com/natalyxxnunes-stack/elas-no-poder-observatory**. O manual visual v3 está na `main`. O PR #1 é histórico; o PR #6 mistura ajustes úteis e design rejeitado; o PR #8 contém três páginas-piloto, inclusive a versão documental do **Método**, mas continua em rascunho e sem aceite editorial. Não faça merge/publicação por conta própria; trabalhe no GitHub, não no Lovable.
>
> A **auditoria integrada das três páginas-piloto** foi iniciada e suas capturas completas foram comparadas com a homepage aprovada. O diagnóstico registrado no item 14 identifica **semelhança excessiva entre aberturas escuras em duas colunas**, apesar da variedade de fotografias, documentos e gráficos. O próximo trabalho é **propor e demonstrar variações pontuais de composição, sem criar nova identidade**, antes de mexer no restante do site. Preserve textos, dados, fontes, documentos e créditos e as 16 seções técnicas do Método. Diferencie o que está **aprovado**, **proposto**, **pendente** e **rejeitado**. Testes técnicos não aprovam direção de arte.
>
> **Obrigatório:** sempre que eu aprovar, rejeitar ou modificar uma decisão de identidade visual, atualize **o mesmo arquivo editável** `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md`, datando a decisão, justificando-a e registrando as páginas afetadas. Mantenha `docs/manual-visual.md` na `main` sincronizado em conteúdo normativo. Não crie manuais concorrentes nem substitua o arquivo pelo nome de outra versão. Entregue novamente o arquivo atualizado.
>
> A autoria e a aprovação editorial final são minhas. **Antes de mexer no código, diga exatamente o que encontrou e o que pretende alterar; depois mostre capturas integrais reais do resultado.**

## 13. Fontes documentais e referências de continuidade

**Documentos normativos internos**

1. [Manual visual v3, `main`](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/main/docs/manual-visual.md).
2. [Controle editorial do redesign, `main`](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/main/docs/design/CONTROLE-REDESIGN-15NOV2026.md).
3. [Matriz visual da etapa 2, branch histórica](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/redesign-editorial-v3-teste/docs/acervo-visual-etapa2.md).
4. [Acervo fotográfico registrado no código](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/main/src/data/fotos.ts).
5. [Tokens e fontes do CSS vigente](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/blob/main/src/styles.css).

**Código, decisões e verificações**

6. [PR #1: histórico da capa e acervo](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/1).
7. [PR #6: mudanças sob revisão, não integrar integralmente](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/6).
8. [PR #7: documentação incorporada à `main`](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/7).
9. [PR #8: páginas-piloto, prévia não publicada](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/8).
10. [GitHub Actions #43771862025: QA mais recente observado dos três pilotos](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43771862025).

**Fontes externas de peças documentais**

11. [TSE — Candidatos 2026, Portal de Dados Abertos](https://dadosabertos.tse.jus.br/dataset/candidatos-2026).
12. [Câmara — origem da fotografia da bancada feminina de março/2026](https://www.camara.leg.br/internet/bancoimagem/default.asp?data=04/03/2026).
13. [Câmara — origem da fotografia do plenário relacionada ao PL 1.085/2023](https://www.camara.leg.br/noticias/957955-camara-pode-votar-nesta-quarta-feira-projeto-que-equipara-salario-entre-homens-e-mulheres/).

## 14. Registro vivo de decisões e avaliação integrada dos pilotos

### 14.1. Regra permanente de atualização do manual — 15/11/2026

**Decisão solicitada expressamente pela editora e incorporada ao método de trabalho:** toda vez que houver uma decisão sobre identidade visual, estilo, hierarquia editorial, composição, paleta, fotografia/documento, infografia ou navegação editorial, **atualizar este mesmo arquivo Markdown**, mantendo o nome `Quem_sao_elas_Manual_Identidade_Editorial_Continuidade_2026-11-15.md`.

Em cada atualização, registrar:

1. **Data, assunto e páginas afetadas.**
2. **Decisão e situação:** aprovada, proposta, em avaliação ou rejeitada. A avaliação técnica não substitui a aprovação da editora.
3. **Justificativa editorial e evidência:** problema observado, capturas de página inteira em desktop/celular, fonte/documento ou motivo da escolha de cor e composição.
4. **Consequências técnicas:** arquivos, branch/PR, o que não pode ser alterado; indicar se houve alteração de código ou apenas de documentação.
5. **Estado de publicação:** prévia, integrado na `main` ou publicado na HostGator, com verificação em vez de presunção.

A referência normativa do repositório, `docs/manual-visual.md` na `main`, também deve ser mantida consistente com estas decisões. **Não criar versões paralelas ou manuais rivais.** Se o trabalho continuar em outra conversa, anexar o último arquivo atualizado. O PDF de 15/11 é uma **fotografia editorial da versão original**; o Markdown atualizado é o registro vivo, até que um novo PDF seja explicitamente produzido.

### 14.2. Comparação real da homepage e das três páginas-piloto — 15/11/2026

**Base visual:** capturas integrais do GitHub Actions #43771862025 para 1440 px de largura no computador e 390 px no celular; homepage (`main`, referência aprovada) e PR #8 nas rotas `/eleitas/`, `/metodo/`, `/reportagens/`. Os arquivos locais de comparação, produzidos na auditoria, são `qse_auditoria_integrada_pilotos_15nov2026/comparacao-integral-desktop.jpg` e `.../comparacao-integral-celular.jpg`. Para outra conversa, baixar novamente as capturas do artefato de QA do PR #8 ou anexar as imagens; não supor que os caminhos locais sejam acessíveis lá.

| Área | Evidência observada | Situação e encaminhamento |
| --- | --- | --- |
| **Homepage** | Abertura em roxo profundo com fotografia documental, chamada, vitrine, seis temas e serviços. Há alternância clara/escura em diferentes partes da página. | **Aprovada e protegida**. Na auditoria, a área de miniaturas claras em *Materiais* exige conferir se são placeholders intencionais ou conteúdo não carregado; isso não autoriza redesenhar a capa. |
| **Quem entrou?** | Abertura dividida em hero roxo de dados e quadro escuro das proporções por cargo; depois filtros claros, atlas escuro por UF e fichas em superfície clara com barra lateral roxa. No celular, há uma sequência longa entre a manchete, os controles e o arquivo nominal. | **Prévia técnica funcional, composição em avaliação.** Examinar a navegação de quem quer encontrar rapidamente uma mulher específica; respeitar as contagens absolutas do atlas e os denominadores por cargo. Não recriar ilustrações ou retratos artificiais. |
| **Método** | Hero roxo/tinta com captura real do portal TSE, infografia de quatro etapas em tinta, fotografia da bancada em coral, conta financeira em roxo e caderno técnico recolhível. No celular, a sequência vertical exige leitura extensa antes da documentação. | **Prévia mais rica no repertório, não aprovada definitivamente.** Verificar legibilidade da captura, créditos e acesso intuitivo ao caderno e às âncoras; questionar se o espaço da fotografia acrescenta contexto suficiente para esta página. |
| **Reportagens** | Abertura branca curta, seguida de manchete à esquerda e visualização em tinta à direita; depois coral/tinta para *Na voz delas*, coleção em roxo, índices e rodapé. A fotografia do plenário deixou de repetir-se no índice. | **Prévia em avaliação.** Confirmar que a legenda das votações deixe claros os significados de “Sim”, “Não”, outras situações e o universo; verificar contraste e leitura da seção documental no celular. |

**Achado transversal confirmado:** as três páginas-piloto usam de modo recorrente **grandes superfícies escuras e aberturas divididas em colunas**. A matéria-prima visual muda (fotografia, documento ou dado), mas existe risco de virar outra fórmula. **Ajuste recomendado, ainda não aprovado:** variar a escala, o posicionamento da evidência e a sequência editorial conforme a pauta, avaliando uma página por vez. **Não** trocar o roxo estrutural, impor fotografias a todas as matérias, inventar novas cores, nem adotar uma distribuição cromática percentual.

### 14.3. Quadro de decisões desta revisão

| Data | Decisão / constatação | Situação | Consequência |
| --- | --- | --- | --- |
| 15/11/2026 | Manter um **manual editável único**, atualizado com toda decisão de identidade visual e com a referência normativa do GitHub coerente. | **Aprovada pela editora** | Atualizar este arquivo e `docs/manual-visual.md` em mudanças posteriores. |
| 15/11/2026 | Homepage e logo originais seguem protegidas. | **Aprovada anteriormente; reafirmada** | Não alterar por contágio do redesign interno. |
| 15/11/2026 | Três pilotos têm repertório mais variado, mas aberturas ainda muito semelhantes. | **Diagnóstico documentado; correções propostas** | Não estender a mesma abertura escura e dividida às demais páginas sem nova avaliação. |
| 15/11/2026 | Não aprovar automaticamente o PR #8 após QA. | **Continua pendente de decisão editorial** | Sem merge e sem publicação até verificação e aceite visual específico. |

**Regra de continuidade:** acrescentar linhas a este registro quando houver **nova decisão**, sem transformar hipóteses de auditoria em regras imutáveis. Uma decisão visual aprovada deve ser acompanhada por uma alteração correspondente na documentação; nenhuma decisão nova foi aprovada sobre as composições dos três pilotos nesta revisão.

---

### 14.4. Nova proposta de diferenciação das aberturas — 15/11/2026

**Natureza: proposta funcional implementada para comparação, sem aprovação visual final.** A decisão consolidada continua sendo diversificar os tratamentos editoriais por pauta. As novas soluções não constituem padrões obrigatórios para outras páginas.

**Problema documental:** a comparação integral dos quatro percursos (homepage aprovada, *Quem entrou?*, *Método*, *Reportagens*) evidenciou repetição das primeiras dobras em painéis escuros de duas colunas, mesmo com evidências diferentes. A composição anterior de *Quem entrou?* dividia a manchete e o total das 342 eleitas de um lado, proporções por cargo do outro; *Reportagens* colocava título e placar das seis votações lado a lado; *Método* já possui um motivo editorial legítimo para aproximar texto e captura original do TSE.

**Alternativa A — *Quem entrou?* (`/eleitas/`):**

- Manchete editorial **transversal em coral da paleta aprovada (`--art-coral`)**, acompanhada do total de 342 mulheres eleitas, que pertence ao universo da fotografia do TSE. O coral é experimentado como área expressiva *nesta pauta*, não como nova cor estrutural geral.
- Em seguida, **faixa em tinta (`--ink`) independente**, com cinco proporções de cadeiras por cargo, denominadores específicos e datas de origem das duas fotografias dos dados. Senado: 12/54 cadeiras renovadas em 2026, não 12/81.
- Filtros e atlas permanecem acessíveis. Adicionado acesso **direto do filtro à lista de fichas**, para que a leitora no celular não precise atravessar o atlas territorial ao pesquisar um nome.
- A cor do gráfico conserva as regras semânticas de dados; preto e pardo permanecem categorias raciais separadas nos filtros.
- **Ressalva:** verificar se a superfície coral em grande escala parece editorialmente convincente ou excessiva no desktop e no celular. **Não está aprovada.**

**Alternativa B — *Reportagens* (`/reportagens/`):**

- A investigação principal deixa de usar a abertura bipartida idêntica às outras: recebe **manchete em largura total sobre ameixa (`--art-plum`)**, seguida, numa segunda faixa em tinta, da **visualização documental das seis votações**.
- No desktop, o placar passa a organizar os seis registros em duas colunas, preservando datas, votos literais “Sim” e “Não”, situações residuais, universo e referência à Câmara; no celular, a leitura permanece sequencial.
- A fotografia do plenário, devidamente contextualizada, permanece na homepage aprovada e na reportagem, mas não se repete no índice. A peça autoral é um gráfico, **não um fac-símile** da Câmara.
- **Ressalva:** avaliar se a sequência de duas superfícies fortes funciona com os blocos coral/tinta de *Na voz delas* e se a página preserva contraste adequado. **Não está aprovada.**

**Método (`/metodo/`):** nenhuma mudança de composição nesta rodada. É o piloto documental de referência para julgar a variedade da revista, sem transformá-lo em template.

**Arquivos alterados na prévia:** `src/routes/eleitas.index.tsx`, `src/routes/reportagens.tsx` e `.github/workflows/qa-pilotos-revista-15nov.yml`, na branch `pilotos-revista-visual-15nov2026` do [PR #8](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/8). Não houve alteração na homepage, logo, fotografias ou arquivos de dados, nem integração com a `main`/publicação na HostGator.

**Critério para avançar:** compilar e testar os filtros, links, rótulos e denominadores; **examinar capturas reais da primeira dobra e da página inteira em computador e celular**; aprovar, pedir ajustes ou rejeitar **cada alternativa separadamente**. O êxito de um workflow não equivale à aprovação de direção de arte. A data de avaliação/aceite editorial deve ser registrada aqui quando ocorrer.

**Verificação técnica concluída (15/11/2026):** [GitHub Actions #43774175278](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43774175278) terminou com sucesso no commit `42a550e906388d8df94cb068fce7768d6020f8da`. A execução conferiu compilação, tipagem, snapshot financeiro, cinco denominadores por cargo, seis votações no gráfico, links de navegação, atalho das fichas e capturas reais em computador (1440 px) e celular (390 px). Há imagens da primeira dobra e da página inteira no artefato `qse-tres-pilotos-editoriais` dessa execução. Essas imagens são evidências da proposta, **não aprovação da solução gráfica**. Conclusão visual preliminar: as aberturas já se distinguem mais claramente, mas a grande mancha coral em *Quem entrou?* e a sucessão de superfícies escuras em *Reportagens* exigem decisão editorial específica.

### 14.5. Registro de encaminhamento nesta rodada

| Data | Item | Situação | Encaminhamento |
| --- | --- | --- | --- |
| 15/11/2026 | Diferenciação real das aberturas conforme a evidência de cada pauta | **Diretriz já aprovada, reafirmada** | Evitar replicar a mesma distribuição em duas colunas. |
| 15/11/2026 | *Quem entrou?*: abertura coral transversal + proporções em faixa tinta | **Alternativa em teste, não aprovada** | Conferir se a escala do coral é adequada e se o acesso às fichas funciona no celular. |
| 15/11/2026 | *Reportagens*: manchete transversal ameixa + gráfico documental abaixo | **Alternativa em teste, não aprovada** | Conferir ritmo visual, legibilidade, cores e contexto das votações. |
| 15/11/2026 | *Método* e homepage | **Preservados nesta rodada** | Não alterar por contágio do novo desenho. |

---

### 14.6. Ajuste de contraste na abertura coral de *Quem entrou?* — 15/11/2026

**Decisão editorial aprovada:** manter o coral como linguagem expressiva da abertura de *Quem entrou?*, **com texto claro**. A combinação anterior de fundo coral com letras em tinta/preto foi considerada desconfortável para a leitura e não deve ser retomada nessa peça. Essa aprovação se refere à **direção de cor e legibilidade**, não ao aceite definitivo de toda a composição da página.

**Aplicação técnica em prévia, ainda sujeita à avaliação visual:** no PR #8, apenas a abertura de `/eleitas/` passou a usar um **coral mais profundo, `#c53f22`, com texto `--paper` (quase branco)**. O original `--art-coral: #eb5d39` permanece intacto no sistema de cores do site. A variante escurecida mantém a família coral e atende ao contraste de texto corrido: aproximadamente **4,98:1 contra branco-papel** (aferição exata pelo navegador no QA). Aplicar texto branco diretamente sobre o coral original produziria contraste insuficiente para texto pequeno, portanto a solução exige adaptar **o tom do fundo**, sem inventar uma nova cor estrutural ou alterar gráficos.

**Elementos afetados:** título “Quem entrou?”, total de 342 eleitas, textos explicativos, identificação da base, CTA e divisor da abertura. Nenhum conteúdo jornalístico, filtro, gráfico, base eleitoral, foto, logo ou elemento da homepage foi alterado nesta correção.

**Código:** `src/routes/eleitas.index.tsx` da branch `pilotos-revista-visual-15nov2026` (PR #8); `qa-pilotos-revista-15nov.yml` passa a verificar o contraste calculado dos elementos `h1`, `p` e `a` em computador e celular, com critério mínimo de **4,5:1**. A execução [GitHub Actions #43776806314](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43776806314) **passou** em computador e celular, incluindo a verificação de contraste WCAG AA dos textos da abertura. A composição ainda depende de aprovação editorial.

**Estado de publicação:** prévia no PR #8, **sem merge e sem deploy**. A revisão cromática está registrada aqui e no `docs/manual-visual.md` da `main`; a composição geral da abertura permanece **em avaliação editorial**.

**Regra para outras páginas:** jamais adotar automaticamente texto branco sobre qualquer fundo vivo. Confirmar o contraste do par real de cores; preservar as convenções metodológicas dos gráficos e a diversidade de tratamentos editoriais.

---

### 14.7. Avaliação integrada de aceitação das três páginas-piloto — 15/11/2026

**Situação desta avaliação:** parecer fundamentado para a decisão editorial, **sem aprovação definitiva** das composições. A referência é a homepage original aprovada. Foram examinadas as capturas da **primeira dobra e da página inteira** em desktop (1440 px) e celular (390 px), produzidas pelo [GitHub Actions #43776806314](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43776806314) no commit `e9a555fc742408e543ff990e4a1a2e2d63f43808`, concluído com sucesso. O exame foi confrontado com os arquivos da branch `pilotos-revista-visual-15nov2026` no PR #8. Revisão de visual e navegação não substitui recontagem jornalística de cada dado.

**Conclusão visual comprovada nas imagens:** a antiga repetição da abertura escura bipartida foi substancialmente reduzida. As três famílias de conteúdo já têm soluções distintas: `Quem entrou?` enfatiza total e proporções eleitorais com abertura coral em letras claras; `Método` abre com captura documental real do portal TSE; `Reportagens` usa manchete transversal em ameixa seguida por placar dos seis votos. As áreas claras passaram a servir majoritariamente a filtros, leitura e índice nominal. **A identidade não exige uma proporção matemática de cores ou um mínimo obrigatório de imagens por página.**

| Página | Direção recomendada para conservar na prévia | Pendência antes do aceite final | Estado editorial |
| --- | --- | --- | --- |
| **Quem entrou?** | Abertura coral profunda `#c53f22` com texto claro; proporções por cargo e denominadores; atlas de contagens absolutas por UF, com filtros e fichas em lotes. A escolha **coral + letras claras** já foi aprovada pela editora. | Revisar a experiência de filtros e atlas com tecnologia assistiva; reconciliar datas das fotografias TSE quando necessário. Não apresentar ordenação absoluta por UF como proporção de vagas. | **Composição geral em avaliação; direção de cor aprovada.** |
| **Método** | Documento real do portal TSE, infografia autoral explicativa, fotografia de bancada identificada como anterior à eleição, conta aberta e caderno técnico preservado/recolhível. | A captura do portal contém texto pequeno no celular; manter o link destacado ao documento original e verificar legibilidade da legenda. Conferir descoberta do caderno, teclado e âncoras. A imagem não é fac-símile de um CSV. | **Direção documental recomendada; ainda não aprovada integralmente.** |
| **Reportagens** | Manchete em ameixa, placar das seis votações em tinta, seção coral de *Na voz delas* com referências textuais ao Diário da Câmara e coleção em faixa própria. Evita repetir a fotografia da homepage no índice. | Aproximar da legenda a explicação de que “Sim”/“Não” se referem ao texto votado; revisar tamanhos dos rótulos e notas da visualização no celular. **Corrigir contraste de textos e links sobre coral**. | **Direção recomendada; ainda não aprovada integralmente.** |

**Acessibilidade: ajuste objetivo de contraste registrado durante a revisão.** Em *Reportagens*, o coral editorial original `--art-coral` contrasta suficientemente com **tinta opaca**, mas trechos em `text-plum`, `text-ink/85` e `text-ink/70` tinham contraste insuficiente para texto comum. A correção **não muda a composição**: no artigo coral de *Na voz delas*, kicker e link passam a usar `text-ink`, corpo e metadados `text-ink/95`. O título conserva `text-plum-deep`. O QA novo mede, no navegador, o contraste sRGB dos textos reais sobre o fundo e exige **pelo menos 4,5:1** em computador e celular. **Validação concluída:** [GitHub Actions #43780301901](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43780301901) passou no commit `82be2036a9ecdad810ae95fad9842090affd07bb`, incluindo contraste composto no navegador de todos os textos sobre coral em desktop e celular, compilação, TypeScript, consultas e capturas da página inteira. A aprovação estética integral ainda não ocorreu. Arquivos: `src/routes/reportagens.tsx` e `.github/workflows/qa-pilotos-revista-15nov.yml` no PR #8. Não altera a escolha aprovada de **texto claro sobre coral profundo** em *Quem entrou?*.

**Homepage:** abertura fotográfica e logo seguem aprovadas e inalteradas. Na captura técnica, três miniaturas de *Materiais* aparecem como áreas muito claras: **verificação pendente**, sem afirmar se há imagem ausente, placeholder intencional ou falha de carregamento.

**Protocolo de decisão:** conservar as três soluções como **candidatas a aceite**, corrigir apenas problemas objetivos e apresentar as capturas novas. A aprovação final de cada página cabe à editora; testes de build, Playwright e contraste não autorizam merge. O PR #8 permanece em rascunho. Após o aceite, fazer conferência de fontes/datas/denominadores, acessibilidade e preparação de publicação, antes de revisar outras famílias de páginas.

**Manual vivo:** esta é uma atualização do **mesmo arquivo editável**, sem substituí-lo por outro manual. A referência normativa correspondente é `docs/manual-visual.md` na `main`; ambas registram o parecer e distinguem propostas de decisões aprovadas.

---

### 14.8. Refinamentos de legibilidade e navegação — 15/11/2026

**Natureza da intervenção:** correções específicas de usabilidade e acesso à informação nos três pilotos do [PR #8](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/8). **Não configuram nova direção visual nem aprovação editorial integral** das páginas. Todas permanecem em prévia, fora da `main` e sem publicação na HostGator.

**Quem entrou? (`/eleitas/`)**

- O atlas conserva as **contagens absolutas** por unidade da Federação, a separação de categorias de cor/raça nos filtros e as frações por cargo com os denominadores documentados. Dados, fotografias do TSE e tons da abertura coral **não foram alterados**.
- Ao selecionar uma UF no atlas, a interface encaminha foco e leitura ao título **Nomes e fichas**, que recebeu `tabIndex={-1}` e foco visível. Os botões indicam `aria-controls="lista-eleitas"`. Filtros nativos ganharam foco visível, preservando seus rótulos.
- **Critério de revisão:** verificar navegação por teclado e leitores de tela, recuperação de filtros via URL e clareza da diferença entre contagem de eleitas e proporção de vagas. Teste automatizado não substitui uma auditoria completa de tecnologia assistiva.

**Método (`/metodo/`)**

- O link principal da abertura **abre diretamente o conjunto Candidatos 2026 no portal do TSE**. Outro link permite ir ao caderno técnico, mantido recolhível e acessível por âncoras.
- A captura real da página do TSE pode ser aberta **em tamanho integral** em outra aba. Legenda e origem passaram a ter corpo de 13 px e contraste reforçado; há links separados para ampliar a imagem e consultar o conjunto original. A captura **não é reprodução do CSV**, e a licença do conjunto de dados não é automaticamente atribuída à interface capturada.
- **Critério de revisão:** confirmar em celular e teclado o acesso à fonte e ao caderno; preservar os 16 capítulos técnicos, os metadados e o histórico de correções.

**Reportagens (`/reportagens/`)**

- A explicação de **“Sim” e “Não” como votos literais sobre o texto submetido à votação** agora aparece imediatamente junto à legenda do placar, antes das seis barras. A categoria residual inclui ausências, abstenções e outros registros. Isso não determina posição favorável ou contrária aos direitos das mulheres.
- Os rótulos numéricos do placar passaram de **11 para 13 px** e as datas de **12 para 13 px**. A visualização recebeu referência acessível à explicação (`aria-describedby`). Não houve alteração dos votos, datas, universos ou links das fontes.

**Validação:** as alterações receberam testes específicos no workflow `.github/workflows/qa-pilotos-revista-15nov.yml` de desktop e celular. **Validação concluída:** [GitHub Actions #43782725785](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43782725785), commit `3034e721e085a42832aa18de455862caddfb8880`, terminou com **sucesso**. A execução conferiu compilação, TypeScript, snapshot financeiro, as verificações de navegação, nomes de filtros, seleção de UF com foco na lista, fonte e ampliação da captura, abertura/fechamento do caderno por teclado, âncora de correções, aviso ao lado da legenda e tamanho dos rótulos, em desktop e celular. Não substitui inspeção com leitor de tela nem aprovação estética pela editora. Os arquivos afetados são `src/routes/eleitas.index.tsx`, `src/components/editorial/AtlasEleitas.tsx`, `src/components/editorial/MetodoRevista.tsx`, `src/routes/reportagens.tsx` e o workflow de QA da branch de teste.

**Preservações:** logo, homepage fotográfica e sua legenda, família tipográfica, tokens globais, fotografias existentes, `src/data/`, valores do TSE e documentação metodológica integral. **Não houve merge ou deploy**. A aprovação visual das três páginas continua sujeita à decisão da editora.

---

### 14.9. Regra consolidada: texto claro sobre grandes superfícies coral — 15/11/2026

**Decisão explícita aprovada pela editora:** o uso de **tipografia preta/tinta sobre grandes áreas coral** deve ser evitado porque a leitura ficou desconfortável, inclusive nas composições que passaram em verificações automáticas de contraste. A preferência editorial também é um requisito de legibilidade e deve ser respeitada. **Esta decisão mais recente substitui a solução provisória descrita na seção 14.7, em que o bloco *Na voz delas* foi corrigido para letras escuras.** A orientação vigente é **coral profundo com letras claras**, tal como já havia sido decidido para *Quem entrou?*.

**Tratamento cromático vigente nas três páginas-piloto do PR #8:**

- **Quem entrou? (`/eleitas/`)**: abertura com fundo coral profundo `#c53f22` e texto `text-paper`. Essa combinação já havia sido aprovada e foi mantida.
- **Reportagens (`/reportagens/`)**: seção *Na voz delas* mudou do coral original `--art-coral: #eb5d39` com texto em tinta/ameixa para **`#c53f22` com texto `text-paper`** em chamada, título, corpo, autoria e link. Mantida a composição e os documentos citados.
- **Método (`/metodo/`)**: área da fotografia da bancada feminina alterada para **`#c53f22` com legenda e link `text-paper`**. Legenda ampliada de 12 px para 13 px; fotografia, crédito e contextualização intactos.

**O coral original `#eb5d39` permanece na paleta** para detalhes, trechos de infografias e elementos com função informativa. **Não colocar texto branco pequeno sobre o coral original:** a combinação fica aquém do contraste mínimo de 4,5:1. Usar o tom mais profundo nas superfícies extensas que recebem tipografia clara. A variante não substitui o roxo estrutural, não altera as cores metodológicas dos gráficos e não representa uma mudança de identidade.

**Evidência e validação:** [GitHub Actions #43785757894](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43785757894), commit `939df87c70222e6e987a9b9937dc0f862aaab8e4`, **concluído com sucesso**. O fluxo conferiu em desktop e celular (1) fundo `rgb(197, 63, 34)` nas duas áreas corrigidas, (2) texto claro, (3) contraste mínimo de **4,5:1**, além das verificações já existentes de conteúdo, build, TypeScript, fotografia, fonte e navegação. As capturas reais estão no artefato `qse-tres-pilotos-editoriais` da mesma execução.

**Arquivos alterados na branch:** `src/routes/reportagens.tsx`, `src/components/editorial/MetodoRevista.tsx` e `.github/workflows/qa-pilotos-revista-15nov.yml`. **Arquivos preservados:** homepage aprovada, logo original, `src/styles.css`, `src/data/`, fotografias e suas origens. A versão de `docs/manual-visual.md` na `main` recebeu a mesma decisão.

**Situação:** decisão de cor e legibilidade **aprovada**; aprovação editorial **das composições completas das páginas** ainda pendente. O PR #8 permanece rascunho, sem merge nem deploy na HostGator. A última decisão expressa prevalece sobre versões anteriores do histórico.

---

**NOTA DE ENCERRAMENTO — controle de versão**  
Este documento descreve decisões editoriais, evidências e estado de implementação observados **em 15/11/2026**. Não substitui a conferência futura das fontes, direitos, números, PRs e publicação. Em caso de divergência, **as últimas decisões explícitas aprovadas pela editora prevalecem**; atualizar este registro, sem criar um novo manual concorrente. O principal objetivo é impedir regressões à estética de fundo branco/lilás, ao vetor repetitivo e à reformulação da homepage aprovada.


---

### 14.10. Novo lote de páginas: Temas, Investigações, Dados e Achados — 15/11/2026

**Status editorial: IMPLEMENTADO PARA COMPARAÇÃO, NÃO APROVADO.** Esta atualização documenta o avanço para outras quatro páginas após horas de trabalho nas três páginas-piloto. O trabalho permanece em proposta no [PR #9](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/9), branch `revista-lote2-indices-15nov2026`, criada a partir da `main`. O PR #8 permanece separado e em rascunho. **Não houve merge, atualização da HostGator ou intervenção na homepage.**

**Objetivo do lote:** ampliar a identidade de revista para áreas distintas do site sem aplicar o mesmo template de manchete, fotografia ou vetor em todas elas. Os formatos respondem à função editorial da página: índice de leitura, transparência da investigação, diretório de consulta e repertório de achados.

**Propostas implementadas (ainda dependem de aceite):**

| Página | Tratamento em teste | Pertinência e limites |
| --- | --- | --- |
| **Temas** (`/temas/`) | Capa tipográfica estruturada por seis perguntas e seis entradas editoriais com tratamentos cromáticos distintos. | A fotografia histórica de **Bertha Lutz (1927)**, já existente no acervo, aparece **somente na entrada Memória**, com legenda contextualizando a relação histórica e sem fingir que representa a eleição de 2026. Não adicionar fotografias indistintamente aos demais temas. |
| **Investigações** (`/investigacoes`) | Passagem de grade de cards repetitivos para um **índice linear por frentes**, com situação editorial literal e notas de andamento. | “Publicado”, “parcial” e “aguardando dado” são **estados de produção**, não classificações de validade das evidências. Manter acesso à documentação por frente. A nota financeira antiga de **04/11/2026** em `src/data/architecture.ts` merece reconciliação em tarefa própria; não substituir data silenciosamente por decisão de design. |
| **Dados** (`/dados`) | Diretório de ferramentas por tema em faixas com zona estrutural escura e zona clara funcional, preservando endereços e caminhos de consulta. | Diretório não deve adquirir aparência de dashboard corporativo; as ferramentas devem permanecer acessíveis em telas pequenas. Nenhum número novo é produzido pelo layout. |
| **Achados** (`/achados/`) | Abertura tipográfica de revista, destaques sobre roxo estrutural e seções temáticas contrastadas. | Preservar achados, suas fontes, escalas, datas e páginas citáveis. A página continua extensa porque apresenta diversas notas; verificar navegação completa e legibilidade. |

**Direção visual que permanece obrigatória:** a homepage e a marca originais não foram tocadas; os tons de composição são os já previstos no manual. O **coral profundo `#c53f22` com tipografia clara** continua sendo a combinação exigida para grandes superfícies coral. Nos demais fundos, verificar contraste e legibilidade. Não usar ilustrações artificiais, fac-símiles inventados, peças genéricas ou fios ornamentais em série. A variação entre estas quatro páginas é uma proposta, não autorização para criar quatro novos templates universais.

**Controle de qualidade:** o workflow `.github/workflows/qa-indices-revista-lote2.yml` da branch verifica TypeScript e build, bloqueia mudanças indevidas em dados/fotos/CSS/logo/homepage e gera capturas completas de `/`, `/temas/`, `/investigacoes`, `/dados` e `/achados/`, em desktop e celular. Na primeira execução, a composição de *Memória* apresentou um defeito: a fotografia histórica ficava espremida na coluna do numeral. **O CSS de grade foi corrigido** e incluído um teste específico de posição e dimensão da imagem. **Validação concluída:** [GitHub Actions #43787402665](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43787402665) passou no commit `604ff587e825a7faf432cf807bc012918a47254a`, com build, TypeScript, cinco rotas em desktop (1440 px) e celular (390 px), sem erros JavaScript ou transbordamento, e conferência da fotografia na coluna direita de *Memória*. As capturas completas foram arquivadas no artefato `qse-indices-revista-lote2` da execução. **Teste concluído não significa aprovação editorial do novo desenho.**

**Estado de decisão:** as soluções acima são **propostas de implementação testável**. Sua incorporação como padrão aprovado depende de avaliação visual das capturas completas. Não misturar revisão editorial do conteúdo com redesign. A regra de manutenção do **mesmo manual editável** continua vigente; futuras decisões e rejeições devem ser acrescentadas aqui, com evidência, data e estado.

---

### 14.11. Lote 3 — fotografia, documento legal e publicações reais (15/11/2026)

**Situação:** direção documental aplicada em **prévia funcional e testada**, ainda **sem aprovação editorial final**, no [PR #10](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/10), branch `revista-lote3-acervo-documental-15nov2026`, criada diretamente da `main`. O site publicado e a homepage fotográfica original permanecem intactos.

**Motivo da intervenção.** A editora questionou a quase ausência de fotografias e documentos nas propostas recentes. A decisão reforçada é escolher evidências visuais conforme a pauta: fotografia como registro de um acontecimento, documento como fonte primária, gráfico como explicação de dados e publicação real como objeto editorial. **A presença de uma imagem não é obrigatória em toda página**, e cores ou SVGs não podem substituir materiais jornalísticos existentes.

| Página | Material real utilizado na prévia | Crédito, cautela e função |
| --- | --- | --- |
| **Biblioteca** (`/downloads`) | Miniaturas reais de `cartilha-cota.pdf` e `oficina-funil.pdf`, mais `infografico-universos-vertical.png`, arquivos já publicados em `public/materiais/`. | Tratar cartilha, infográfico e roteiro como **publicações efetivas do observatório**, preservando o acesso aos originais, metadados e downloads. Não inventar capas. |
| **Pioneiras** (`/pioneiras/`) | Nova fotografia documental da posse de Bertha Lutz, **28 de julho de 1936**, Câmara dos Deputados, então sediada no Rio de Janeiro. | Crédito **Domínio público / Acervo Arquivo Nacional**, fundo Federação Brasileira pelo Progresso Feminino; identificação arquivística `BR_RJANRIO_Q0_BLZ_DEU_CLE_FOT_0001`. Arquivo preservado em `public/fotos/posse-bertha-lutz-camara-1936.jpg`, com metadados em `src/data/fotos.ts`. [Ficha e condições no Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Posse_de_Bertha_Lutz_como_Deputada_na_C%C3%A2mara_Federal.jpg). A imagem documenta **esse evento**, não todas as pioneiras. É diferente da foto de Bertha em 1927. |
| **Direitos** (`/direitos`) | Artigo 2º do **Decreto nº 21.076, de 24/02/1932**, exibido com grafia histórica e contexto normativo. | **Transcrição literal**, não fac-símile original do Diário Oficial. [Texto no acervo legislativo da Câmara](https://www2.camara.leg.br/legin/fed/decret/1930-1939/decreto-21076-24-fevereiro-1932-507583-publicacaooriginal-1-pe.html), com [registro da norma](https://www2.camara.leg.br/legin/fed/decret/1930-1939/decreto-21076-24-fevereiro-1932-507583-norma-pe.html). O decreto é histórico e foi revogado; o registro informa publicação no DOU de 26/02/1932, p. 3385. |
| **Sobre** (`/sobre`) | Links para o conjunto *Candidatos 2026* do Portal de Dados Abertos do TSE, o Método e a política de correções. | Nesta página, **documentação rastreável é mais apropriada** do que fotografia genérica. Não inventar retrato da autora nem associar imagens de plenário à sua trajetória pessoal. |

**Direitos autorais e pendências:** a fotografia de **Pagu** continua marcada `verificacao-pendente` no acervo. Não expandir sua reprodução com base apenas na classificação de um repositório secundário. Fotografias de **Lélia Gonzalez** encontradas em veículos editoriais também não foram copiadas sem licença ou autorização suficientemente confirmada. A fotografia de Bertha Lutz de 1936 tem procedência e indicação específica de domínio público pelo Arquivo Nacional via parceria com Wikimedia Commons; manter crédito, metadados e link de origem.

**Cuidado com os documentos:** o trecho do Código Eleitoral de 1932 é fonte primária **transcrita a partir da página eletrônica da Câmara**. A imagem do Diário Oficial **não** foi reproduzida. Outros fac-símiles do site são composições tipográficas e devem permanecer identificados como tal, sem alegar que sejam imagens originais.

**Correção técnica adicional:** o bloco de bases CSV da Biblioteca ampliava a largura da página móvel até **503 px** numa tela de 390 px. Foram ajustadas grades e quebras de nomes longos de campos. O conteúdo não foi apagado nem encoberto.

**Validação:** [GitHub Actions #43791893284](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43791893284) concluído com **sucesso**. O navegador verificou cinco rotas (homepage + quatro páginas), em desktop **1440 px** e celular **390 px**, com carregamento efetivo dos três materiais e da fotografia original, links e legendas, ausência de erros JavaScript e transbordamento horizontal. Compilação e TypeScript passaram. Capturas reais disponíveis no artefato `qse-lote3-fotografias-documentos`.

**Estado de decisão:** as regras de pertinência, fonte e crédito continuam **aprovadas**; as quatro **composições específicas são propostas**, aguardando a revisão visual da editora. **Sem merge, sem deploy, sem alteração da homepage.** Registrar futuras aprovações ou rejeições neste mesmo arquivo e no manual do GitHub, sem criar manuais concorrentes.
---

### 14.12. Lote 4 — fontes primárias em três investigações (15/11/2026)

**Situação:** prévias em avaliação, no [PR #11](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/11), branch `revista-lote4-fontes-primarias-15nov2026`, criada da `main`. Nenhuma composição é automaticamente aprovada ou publicada. A homepage, a logo, as fotografias existentes, as bases numéricas e as convenções raciais permanecem preservadas.

**Motivação e princípio reafirmado.** O repertório documental do observatório deve ser mais visível nas investigações. Uma fonte primária pode entrar como documento para leitura, referência oficial identificada ou transcrição textual fiel. Isso **não autoriza** criar fac-símiles artificiais, usar fotografias sem pertinência, apresentar uma denúncia como condenação ou repetidamente dispor todas as páginas nos mesmos cartões vetoriais. O tipo de documento define a composição.

| Página | Material específico e tratamento | Limites editoriais |
| --- | --- | --- |
| **Quem controla?** (`/quem-controla`) | Faixa editorial **dourada com texto tinta** e referências ao TSE, que publicou os **critérios formais fixados pelas direções nacionais dos partidos para o FEFC de 2026**, com processos PJe, acesso ao inteiro teor quando disponível e data de liberação. Inclui também a tabela do FEFC destinado a cada partido, e ligação ao estudo do observatório. | **Critérios declarados não equivalem a transferências individuais, despesas ou prova de favorecimento.** É preciso comparar registros concretos no universo correto, sem inferir intenção. [Fonte: TSE — Critérios FEFC 2026](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc) e [cálculo por partido](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/distribuicao-dos-recursos-do-fundo-especial-de-financiamento-de-campanha-fefc-eleicoes-2026). |
| **Barreiras** (`/barreiras`) | Faixa documental em **coral profundo `#c53f22` e tipografia clara**, apresentando três fontes de natureza diferente: **Lei 14.192/2021** (base normativa), **painel TSE/MPF de violência política de gênero** (processos agregados) e **representações públicas do MPF** (atuações específicas). | Processo não é caso nem vítima; representação ou acusação não comprova crime ou condenação. Manter datas do painel **23/10/2026** (extração) e **28/10/2026** (leitura), inclusive inconsistência entre soma por ano e total, sem inventar atualização ou explicar causa. [Lei](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14192.htm), [MPF — Representações e Dados Estatísticos](https://www.mpf.mp.br/atuacao/fiscalizacao-do-processo-eleitoral/atuacao/gt-violencia-de-genero/representacoes-editadas). |
| **Na voz delas** (`/na-voz-delas`) | Abertura com **reprodução textual** de uma declaração já registrada como conferida em `src/data/falas.ts`, identificando parlamentar, data, origem no Diário da Câmara e link para o registro primário. Abaixo, referências aos outros Diários do recorte. | A transcrição **não é foto do documento** nem documento simulado. O texto citado não deve ser cortado de modo a mudar o sentido; contexto, eventual manifestação da citada e checagem factual seguem em cada ficha. A fonte permite verificar o que foi dito, mas não transforma a afirmação da parlamentar em fato comprovado. |

**Correção factual feita em paralelo, sem alteração de números:** a editoria `Dinheiro` (`src/data/temas.ts`) dizia que os critérios internos do FEFC não eram públicos. A documentação oficial de 2026 demonstra que **os critérios formais são divulgados pelo TSE por partido**. A nova frase distingue o acesso a esses critérios do que ainda não se sabe sobre a **aplicação concreta e justificativa dos repasses a cada candidatura**. Fonte indicada acima; é uma correção de precisão jornalística, não um dado eleitoral novo e nem uma alteração estética.

**Direção visual:** a faixa dourada tem função de tornar visível uma regra de financiamento verificável; a faixa coral profunda trata de fontes normativas e processuais, com **texto claro e contraste medido**; a reportagem de declarações utiliza reprodução de registro escrito, sem imagem artificial. Nenhuma das três deve ser convertida em padrão replicado automaticamente nas outras páginas.

**Governança:** a composição dessas três páginas permanece **em prévia**, sujeita a inspeção desktop/celular e decisão editorial. O PR é rascunho, sem merge e sem deploy. O arquivo `docs/manual-visual.md` do GitHub deve receber o mesmo registro e o resultado do QA. Diferenciar explicitamente aprovação de princípio (fonte pertinente e tipografia clara no coral) e aceite final de composição (ainda pendente).


**QA concluído para o lote 4:** [GitHub Actions #43794329151](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43794329151) — **sucesso** no commit `74d1c234a23ce626e1611e251803fdd4d642da84`. Compilação, TypeScript, quatro rotas (inclusive a homepage) em computador 1440 px e celular 390 px, ausência de erros JavaScript e transbordamento horizontal, links para documentos oficiais na interface, preservação da marca e dos dados numéricos, e **contraste mínimo de 4,5:1 no painel coral** com normalização correta do espaço de cor OKLCH. Capturas de primeira dobra e páginas completas incluídas no artefato `qse-lote4-fontes-primarias`. **Os testes automatizados não substituem conferência humana de todos os documentos ou aprovação estética.**


---

## 15. Atualização de continuidade — 16 de novembro de 2026 (PR #23)

**Sem terceiro redesign.** A direção aprovada permanece: revista jornalística digital contemporânea, roxo estrutural, tinta, papel, dourado e coral profundo; fotografia mista documental, páginas inteiras com ritmo e hierarquia. Preservar sempre a logo original, a homepage, o CSS global e as bases do TSE. No fundo coral profundo, **letra clara**, não letra preta. Nenhum PR de prévia significa publicação.

### 15.1. Estado técnico, editorial e visual

As três páginas-piloto são Quem entrou, Método e Reportagens, na branch do PR #8. PRs independentes #9 (índices), #10 (biblioteca/acervo) e #11 (fontes primárias) também contêm versões de revista. PRs #12 a #22, encadeados, revisaram integralmente Partidos, Histórico, Monitor, Funil, Dinheiro, Comparar, Relatório 2026 e Dados; nenhum deles foi mesclado à main.

**PR #23 (rascunho):** a branch revista-consolidacao-previews-acervo-16nov2026 tem base na branch do PR #22 e recupera seletivamente as 13 rotas dos PRs #8–#11. Não utiliza a versão antiga de Dados do PR #9, porque essa página já recebeu atualização no PR #22. As páginas consolidadas são: Quem entrou, Método, Reportagens, Achados, Investigações, Temas, Biblioteca, Pioneiras, Direitos, Sobre, Quem controla, Barreiras e Na voz delas. Foram incorporados os componentes AtlasEleitas, MetodoRevista, SectionBlock e InvestigationIndex, mais as indicações de fontes de temas. **Não houve publicação.**

### 15.2. Acervo fotográfico e documental recuperado

- Recuperada a fotografia de **posse de Bertha Lutz em 28 de julho de 1936**, nas escadarias da Câmara, Rio de Janeiro. Fonte/atribuição: Domínio público / Acervo Arquivo Nacional, Fundo Federação Brasileira pelo Progresso Feminino; identificação BR_RJANRIO_Q0_BLZ_DEU_CLE_FOT_0001. Arquivo local: public/fotos/posse-bertha-lutz-camara-1936.jpg. Origem/licença: https://commons.wikimedia.org/wiki/File:Posse_de_Bertha_Lutz_como_Deputada_na_C%C3%A2mara_Federal.jpg
- Recuperada a **captura do portal de Dados Abertos do TSE** em public/documentos/tse-candidatos-2026-portal.png, com proveniência em public/documentos/tse-candidatos-2026-portal-fonte.txt. A captura documenta a página Candidatos 2026, **não** reproduz o CSV, nem sua interface herda automaticamente a licença do dataset. Link original: https://dadosabertos.tse.jus.br/dataset/candidatos-2026
- O catálogo local passa de cinco a seis fotografias. A imagem histórica de **Pagu permanece com classificação verificacao-pendente** quanto a direitos autorais; não apresentar essa classificação como licença confirmada.
- Em MetodoRevista.tsx, o número do último passo do esquema metodológico foi corrigido para branco sobre o círculo coral.
- Os documentos nas páginas Quem controla, Barreiras, Partidos e Dinheiro permanecem registrados prioritariamente com **links às fontes primárias**, sem reproduções falsas ou colagens que aparentem documentos originais.

### 15.3. O que ainda falta

O repositório tem 37 arquivos de rota. Considerando 21 modelos de página trabalhados em alguma prévia, faltam **14 rotas de conteúdo** sem revisão integral: Achado individual, Busca, Calendário, Coautoria, Coleção antigênero no poder, Como votaram, Ficha individual de eleita, Em disputa, Lélia Gonzalez, Pagu, Quem chega, Consultar candidatas, Tema individual e Votos. A homepage fica protegida; Condições é um redirecionamento.

**Fotografias, documentos e páginas inteiras:** a auditoria do código mostrou uma lacuna relevante em Histórico, Funil, Dinheiro, Comparar, Relatório 2026 e Dados. Essas rotas usam principalmente indicadores, tabelas e referências textuais a documentos. Cada imagem que entre na composição precisa ter função jornalística, origem, autoria, direitos verificados, data, contexto e legenda. Não preencher a falta de documentos com imagens sintéticas.

**Validação:** workflow próprio do PR #23, .github/workflows/qa-consolidacao-revista-16nov.yml, previsto para compilar TypeScript e HostGator, conferir os arquivos de acervo e produzir capturas completas em desktop de 1440 px e celular de 390 px para as 13 páginas e a homepage. Registrar conclusão e eventuais falhas. Os testes automatizados não substituem inspeção editorial das capturas, acessibilidade WCAG abrangente e conferência documental.

**Capturas dos PRs #20–22:** os arquivos de contato desktop e celular foram examinados diretamente nesta sessão e confirmam a alternância de fundo e hierarquia tipográfica, mas também a escassez de fotografias e documentos nessas três páginas. A comparação visual em tamanho integral e a auditoria de acessibilidade seguem pendentes. Datas e alturas de páginas devem ser conferidas contra os arquivos de QA antes de reprodução como verificadas.

### 15.4. Continuidade

Conferir primeiro a integração e a legibilidade das 13 páginas recuperadas. Depois avançar nas 14 rotas restantes, sem perder as versões anteriores. Fazer uma segunda rodada de apuração visual e documental em toda a cadeia PRs #12–#22, especialmente Relatório 2026 e Dinheiro. Cruzar fontes, períodos, denominadores e categorias de cor/raça. Manter todas as mudanças como PRs de prévia até a autorização explícita de publicação.

**Governança do manual:** os 609 registros/linhas anteriores foram recuperados integralmente da cópia da Biblioteca e permanecem neste mesmo arquivo, com o capítulo 15 acrescentado na branch do PR #23. O arquivo normativo do repositório continua sendo docs/manual-visual.md. A cópia pessoal da Biblioteca não pôde ser substituída em seu local original por falta de permissão para materializar seus bytes, portanto este Markdown sob o nome original na branch #23 é a cópia editável atualizada para continuidade.

---

## 16. Rodada integral das 14 rotas restantes — PR #24, 16/11/2026

**Estado:** prévia em GitHub, sem integração à main e sem deploy. Branch revista-14-rotas-integral-16nov2026, baseada no PR #23. A direção visual da revista continua a aprovada nos pilotos: roxo estrutural, tinta, papel, dourado e coral profundo com texto claro. Marca, homepage, CSS global, bases eleitorais e os arquivos de fotos e documentos existentes permanecem intocados.

### 16.1. Todas as rotas revisadas

1. **Achado individual** (/achados/$id): capa em roxo com número do registro, datas e caderno verificável de origem e método, sem repetir indevidamente a manchete do card.
2. **Busca** (/busca): abertura em tinta; formulário com contraste; categorias de resultados em superfícies de papel e creme; preservados parâmetro q, URL e links.
3. **Calendário** (/calendario): abertura em roxo; meses organizados por faixas, com papel, creme e dourado; mantidos datas, fontes, diferenciação do andamento e cálculo do próximo evento no navegador.
4. **Coautoria** (/coautoria): abertura em roxo, régua numérica dourada, matriz de partidos e pares preservados, fotografia real da Câmara em junho de 2026 explicitamente apresentada como contexto, não prova de autoria; fontes documentais e fórmulas intactas.
5. **Coleção antigênero** (/colecoes/antigenero-no-poder): capa em tinta, números em superfícies distintas, critérios e falas preservados e caderno documental; sem atribuir intenções individuais a partir da seleção editorial de duas votações. Corrigido contraste da abertura após conferência do código.
6. **Como votaram** (/como-votaram): abertura fotográfica original preservada, mais caderno documental entre critérios e consulta; as seis votações e a matriz nominal seguem disponíveis.
7. **Ficha individual de eleita** (/eleitas/$slug): capa em tinta, dados de registro, trajetória, voto, atuação e fontes; destaque a documentos primários e resguardo de fotografias sem licença verificada.
8. **Em disputa** (/em-disputa): normas em cards e caderno de fontes originais com status, data e limitações; sem transformar uma proposição em norma vigente por inferência.
9. **Lélia Gonzalez** (/pioneiras/lelia-gonzalez): caderno das séries históricas 1982 e 1986 do TSE, distinção de cargo e grafia, fonte e limites.
10. **Pagu** (/pioneiras/pagu): caderno histórico de votação de 1950 e limites de inferência de gênero; fotografia classificada como verificacao-pendente **deixa de ser exibida**. Em seu lugar permanece a ficha tipográfica identificada, claramente distinta de reprodução do documento original.
11. **Quem chega** (/quem-chega): fotografia real da bancada feminina de março de 2026 com ressalva temporal, resultados e composição por raça preservados, caderno TSE e distinção entre eleição e exercício de poder.
12. **Consultar candidatas** (/quem-sao-elas): captura real e contextualizada do portal de Dados Abertos do TSE, com distinção explícita entre interface e CSV; categorias preta e parda permanecem separadas; cruzamentos e ferramentas preservados.
13. **Tema individual** (/temas/$slug): seis temas com capítulos em tinta para atores e coral profundo para lacunas, texto claro; fotografia de Bertha Lutz em Memória e plenário em Agenda, quando têm pertinência; sem decorar todas as páginas.
14. **Votos** (/votos): três universos (candidaturas, votos nominais válidos, cadeiras) com numeradores e denominadores, caderno de fontes TSE e cálculos originais preservados.

**Peça de apoio:** src/components/editorial/CadernoDocumentalRevista.tsx contém componentes de fotografia contextualizada, captura oficial do portal do TSE e caderno documental. Trabalha só com fotos previamente cadastradas no acervo local, exclui qualquer entrada com licença verificacao-pendente e publica créditos/links de origem.

**Resguardo transversal:** src/components/editorial/Pioneiras.tsx e src/components/editorial/ReportagemOpening.tsx agora impedem a renderização de fotografias cujo cadastro indique direitos ainda não verificados. Não altera os arquivos físicos nem os metadados originais: bloqueia somente a exibição.

### 16.2. QA e limites

A rotina .github/workflows/qa-14-rotas-revista-16nov.yml compila TypeScript e a versão HostGator, impede alterações em dados/logo/home/acervos, e registra capturas integrais no desktop (1440 × 900) e celular (390 × 844), incluindo seis variações de tema, ficha individual, perfil histórico e busca com termo. O primeiro ensaio revelou que um **ID inexistente foi colocado na URL do próprio teste de Achado individual**: /achados/cor-raca designava tema, não achado. O teste foi retificado para /achados/quanto-mais-alto-mais-brancas, registro que existe no arquivo de dados, sem alterar a aplicação. Registrar a conclusão do teste no relatório de QA após execução.

**Ainda pendente:** inspeção humana de todas as capturas de página inteira, verificação ponto a ponto de licenças/créditos e acessibilidade WCAG integral; aprovar estas páginas significa analisar o conteúdo e as imagens, e não apenas a compilação. A página publicada não reflete automaticamente a branch nem o PR.

**Prioridade depois desta rodada:** reconciliação visual e documental da revista inteira (inclusive páginas PRs #12–#22), correção de problemas identificados nas prévias e integração editorial controlada. Manter a separação entre candidata, eleita, diplomada e ocupante efetiva. Não publicar nem mesclar sem autorização.


### Fechamento da QA das 14 rotas — 16/11/2026
**Resultado real:** execução GitHub Actions #43896345250 concluída com sucesso (commit 3ba5205af50fbebdae5f157341f201f3952f4f25). TypeScript, build HostGator, proteção de homepage, logo, fontes eleitorais e arquivos documentais aprovados. O script abriu 20 variações de URL, cobrindo 14 modelos de conteúdo, seis temas, perfil de eleita, busca e uma homepage de controle, em desktop 1440 × 900 e celular 390 × 844: **40 capturas completas, nenhuma falha registrada**. O teste conferiu respostas HTTP, título H1, largura, erros de execução e carregamento efetivo das imagens, inclusive as lazy. A imagem de Pagu com direitos pendentes não apareceu no DOM.

**Artefato de prova:** https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43896345250 (artefato qse-14-rotas-revista-integrais, ID 14239282143), incluindo capturas, relatório JSON e os dois manuais. Foram montadas e **visualmente examinadas folhas de contato** com o início, um ponto intermediário e o final das 20 páginas em cada viewport. Nesta leitura de conjunto, preservaram-se contrastes estruturais, bandas de revista e fontes destacadas; trata-se de uma inspeção de panorama, que não substitui revisão individual em escala real, de todas as imagens, links ou controles por teclado.

**Pendente antes de publicar:** revisão editorial final das 35 rotas de conteúdo no conjunto integrado, auditoria WCAG completa, direitos/licenças e verificação documental específica. Nenhum PR foi mesclado nem foi executado deploy.

---

## 17. Auditoria das evidências visuais — PR #25, 16 de novembro de 2026

**Branch e PR:** revista-evidencias-visuais-documentais-16nov2026, PR #25 rascunho com base no PR #24. Nenhum merge, deploy, exclusão de mídia ou alteração dos dados eleitorais. As 35 rotas de conteúdo foram avaliadas na matriz de auditoria em `docs/matriz-fotografias-documentos-graficos-16nov2026.md`, com decisões específicas sobre **fotografia**, **documento original** e **gráfico**. A homepage é protegida e `condicoes.tsx` é só redirecionamento.

### 17.1. Decisões de direção, com justificativa jornalística

- **Fotografia:** registrar o acontecimento e seu contexto, não preencher blocos vazios. Acervo da Câmara é CC BY, desde que constem fotógrafo, instituição e licença; fotografias de 2023 e junho de 2026 não retratam todos os votos analisados nem as eleitas de 2027. Atribuição e ressalva acompanhando cada uso. Retratos de Lélia Gonzalez e Pagu não foram publicados por falta de confirmação suficiente de direitos na realidade editorial brasileira. Para fontes Commons, indicação de domínio público na plataforma não dispensa conferência legal.
- **Documento:** o material documental só é reproduzido visualmente se houver origem verificável, data, identificação, natureza e direito de uso. A captura de 15/11/2026 mostra a página de disponibilização dos dados de Candidatos 2026, não o CSV, nem a Prestação de Contas; não estender automaticamente licença de dataset à interface. Enquanto um fac-símile verdadeiro não puder ser mostrado, usar uma cartela claramente rotulada como reconstrução/organização editorial, com link ao original. Diferenciar decisão judicial, lei, critério do partido e recebimento financeiro.
- **Gráfico:** privilegiar sempre que forem comparados universos, proporções e séries. Deixar numerador, denominador, período, base e exclusões visíveis. Manter PRETA e PARDA como categorias separadas. Não fazer barras percentuais para recortes de menos de 20 casos, quando a amostra torna comparações frágeis. O comparador indica pontos percentuais entre proporções, não a chance de uma mesma mulher chegar à cadeira.

### 17.2. Intervenções realizadas

1. **Relatório 2026:** dentro dos capítulos, gráfico da participação de mulheres entre todos os deputados eleitos (federal/estadual/distrital), com numerador e denominador da base de 2026; fotografia documental de 30/06/2026 (Thiago Cristino/Câmara, CC BY), acompanhada de ressalva temporal; caderno de fontes oficiais TSE e Câmara. A edição preliminar mantém sua data de corte editorial de 04/11.
2. **Comparar:** novo bloco gráfico interativo de duas etapas, que reage aos filtros de partido e estado. Candidaturas e cadeiras são medidas diferentes, representadas em barras que mostram a participação feminina dentro de cada universo; diferença em pontos percentuais. Recortes pequenos, apenas contagem.
3. **Dados:** captura real local do portal TSE no capítulo de origem, com fonte, imagem, data e link. Índice de consulta permanece índice, sem criar um número novo.
4. **Dinheiro:** ficha gráfica de metadados derivados do código de recontagem e dos dados existentes (data da extração, linhas de receita processadas, duplicatas removidas), explicitamente identificada como produto editorial, não como fac-símile de extrato ou recibo. Links reais de critérios do FEFC, cotas e contas declaradas preservados.
5. **Reportagens:** fotografia institucional de maio/2023 (Bruno Spada/Câmara, CC BY) na página de índice, legendada como contexto de tramitação da igualdade salarial, sem atribuir os votos analisados às pessoas da fotografia.
6. **Componente:** `src/components/editorial/EvidenciasGrafadas2026.tsx`. Não houve geração de imagens por IA, imagens fictícias ou edição de bases.

### 17.3. O que permanece deliberadamente sem fotografia

**Funil** (universos e diagramas) e **Histórico** (séries 2014–2026) já possuem visuais adequados e fontes documentais; fotografia de 1927/1936, se incluída sem novo capítulo, deslocaria o recorte histórico. **Barreiras** não receberá foto genérica de vítima nem imagem de violência como decoração. **Comparar** e **Dinheiro** priorizam dado e documento antes de fotografia. **Perfis de Lélia e Pagu** mantêm fichas documentais por direitos pendentes.

### 17.4. Pendências explícitas e validação

Os próximos pontos de pesquisa são: reprodução de documentos originais específicos do FEFC e PJe em Partidos/Quem controla, documentos legislativos e gravações de falas em Como votaram/Na voz delas, arquivo legal pertinente em Direitos/Em disputa/Barreiras, retratos individuais autorizados e eventual nova fotografia de reportagem com legenda situacional. Nenhum documento original será recriado como imagem sintética. A matriz de 35 páginas indica prioridade de cada um.

O workflow `qa-evidencias-visuais-revista-16nov.yml` prevê TypeScript, build HostGator, integridade dos arquivos originais e capturas de 41 URLs em desktop/celular (82 renderizações), abrangendo os modelos das 35 páginas, seis temas e homepage. A conclusão precisa ser conferida no GitHub Actions; testes automatizados **não validam, por si, acessibilidade integral, direitos, precisão de números ou aprovação da editora**. A leitura das capturas completas em tamanho real é uma etapa distinta.

**Referências documentais públicas:**
- Acervo fotográfico da Câmara e licença: https://www2.camara.leg.br/a-camara/documentos-e-pesquisa/arquivo/acervo-por-tipo/fotos
- Prestação de Contas 2026 no portal do TSE: https://dadosabertos.tse.jus.br/pt_BR/dataset/prestacao-de-contas-eleitorais-2026
- Candidatos 2026: https://dadosabertos.tse.jus.br/dataset/candidatos-2026
- Resultados 2026: https://dadosabertos.tse.jus.br/dataset/resultados-2026

**Continuidade:** preservar integralmente as decisões anteriores. A versão original do manual sob o mesmo nome permanece neste PR como arquivo editável; sua versão na Biblioteca não pode ser sobrescrita automaticamente pelas permissões do Projeto.

---

### Correção factual transversal — Senado projetado para 2027 (16/11/2026)

**Achado na inspeção visual:** a manchete do Relatório 2026 e o gráfico de Senado já projetavam **29 das 81 cadeiras para o PL**, enquanto o texto de `quem-chega.tsx` ainda indicava **28**. A base local `src/data/senado-2027.ts` já registra Luís Felipe Cunha (PL), primeiro suplente de Sergio Moro, e Alex Diniz (PL), primeiro suplente de Cleitinho. A edição da rota ficou defasada em relação à própria base.

**Fonte institucional conferida:** Agência Senado, 25/10/2026, “Fim da eleição define composição do Senado em 2027, com 13 partidos” — https://www12.senado.leg.br/noticias/materias/2026/10/25/fim-da-eleicao-define-composicao-do-senado-em-2027-com-13-partidos . A Agência Senado projeta **29 cadeiras do PL** e identifica Luís Felipe Cunha como suplente do Paraná pelo PL e Alex Diniz em Minas. A filiação de Luís Felipe Cunha ao PL em **08/10/2026** está documentada também em https://www.cnnbrasil.com.br/eleicoes/senador-que-ocupara-cadeira-deixada-por-moro-se-filia-ao-pl/ . Número **projetado**, não fotografia de cadeiras já ocupadas em 2027.

**Ajuste feito na branch de prévia:** texto de `src/routes/quem-chega.tsx` reconciliado em **29 de 81**, com observação da correção, link oficial e a contagem de 19 eleitos em 2026 + 10 dos mandatos que se estendem a 2031. A ficha metodológica do gráfico em `src/components/editorial/Senado2027.tsx` passou a citar expressamente a Agência Senado e o uso da confirmação de partido do suplente, suprindo a lacuna da API. A estrutura da base e seus números **não foram alterados**. Incluído teste para evitar regressão do “29 das 81”. A informação segue sujeita a mudanças de filiação, judicialização ou substituições antes da posse.

**Lição da auditoria:** comparar manchetes, textos, gráficos e referências de data entre páginas é parte da verificação jornalística de um produto visual. Build e capturas não detectam inconsistências desse tipo sem conferência de conteúdo.