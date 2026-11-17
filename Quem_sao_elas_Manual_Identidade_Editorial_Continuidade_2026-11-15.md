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


---

## 18. Cadernos de fontes primárias, PR #26 — 16 de novembro de 2026

**Branch técnica:** revista-documentos-originais-17nov2026 (nome de branch antecipado, intervenção realizada em 16/11/2026). **Base:** PR #25. PR de prévia, sem merge, deploy, alteração das bases eleitorais, troca de logo, CSS global ou mídias locais.

**Decisão editorial:** dar visibilidade aos documentos originais sem produzir simulações de páginas escaneadas. A peça criada pelo observatório deve declarar sua natureza de **ficha de identificação ou índice**, com link inequívoco ao documento público. Documentos mais sensíveis, com dados pessoais, não devem ser reproduzidos sem revisão. Cores da revista permanecem estruturais: tinta, roxo, dourado, creme e coral profundo com texto claro.

**Páginas efetivamente alteradas:**

1. **Partidos** e **Quem controla:** um caderno compartilhado `src/components/editorial/ArquivoDocumentalFEFC.tsx`, baseado no índice oficial do FEFC 2026, separa critério interno declarado, cota destinada pelo TSE e receitas declaradas por cada candidatura. Três registros individuais: **PL, PJe 0600974-71.2026.6.00.0000, liberação 20/08/2026; PT, PJe 0601252-72.2026.6.00.0000, 21/08/2026; União Brasil, PJe 0601251-87.2026.6.00.0000, 21/08/2026**. Os links foram extraídos da tabela oficial, não gerados como supostas cópias. Os identificadores ficam em `src/data/documentos-eleitorais-2026.ts`. A seleção é amostra de acesso, não julgamento comparativo de mérito. O TSE ressalva que não faz juízo de mérito dos critérios, exceto quanto aos destaques de cotas de gênero e raça. Nenhum registro comprova individualmente repasse, aprovação de contas ou irregularidade.
2. **Como votaram:** caderno `DossieVotacoesCamara`, baseado nos seis IDs preservados em `src/data/votacoes-camara.ts`, oferece acesso à ficha e aos votos individuais via caminhos documentados da API v2 da Câmara. Exibe proposição, etapa e data, mas **não interpreta uma resposta JSON como ata em PDF**. A existência dos endpoints foi documentada pela Câmara; a abertura efetiva dos links individuais no navegador ainda exige checagem em dispositivo final, pois as URLs da API não puderam ser abertas pelo buscador desta sessão.
3. **Na voz delas:** `IndiceDiariosCamara` organiza **sete falas com `publicar: true`** por nome, data do discurso, edição e página da publicação oficial, com o endereço de consulta já guardado na base e link de retorno à contextualização. A oitava fala (entrevista de Eduarda Campopiano), marcada `publicar: false` por verificação pendente do áudio e da resposta, permanece **fora da página**. O antigo mecanismo de Diários pode requerer compatibilidade específica; oferecer o portal geral como rota alternativa. Uma fala registrada literalmente não deve ser confundida com posicionamento atual da pessoa.
4. **Quem controla:** trecho legado que dizia faltar análise de despesas foi atualizado para reconhecer que a página Dinheiro já examina parte delas, enquanto a correspondência entre regras internas, decisões e recebimento individual ainda demanda investigação.

**Fotografias e documentos visuais:** nesta rodada, a fonte relevante é o ato, não uma foto de pessoas em plenário. Não foi adicionada imagem nova nem fac-símile sintético. A incorporação da *página real* de um processo em PNG/PDF, quando viável e útil, requer controle de licença, data, versão e eventual exposição de dados pessoais; só depois deve ser embutida no site. O mesmo vale para capturas de transcrição do Diário. Para voto nominal, são preferíveis figuras originais da contagem e links à API auditável.

**Verificação técnica:** workflow `.github/workflows/qa-documentos-originais-17nov.yml` compilando TypeScript/build e fotografando quatro páginas alteradas, Reportagens, Dinheiro e homepage de controle em 1440 e 390 px. Checa no DOM três PJe distintos, seis registros de votos e sete falas, além de imagem quebrada/erro JS/transbordamento. Consultar o resultado real antes de afirmar aprovação. Acessibilidade WCAG ampla, leitura das fontes na origem e validação legal das mídias seguem pendentes.

**Fontes:**
- TSE FEFC 2026: https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc
- Câmara, API v2: https://dadosabertos.camara.leg.br/swagger/api.html
- Câmara, Diários: https://www2.camara.leg.br/a-camara/documentos-e-pesquisa/diariosdacamara

**Próximo passo:** conferir as capturas inteiras e o contraste das fichas, validar endpoints específicos e, apenas se justificável e autorizado, inserir imagens de **documentos autênticos** com crédito, identificação e tratamento de dados pessoais. Manter todo o histórico editorial; nenhuma publicação antecipada.

---

## 19. Documentos originais à vista — PR #27, 16/11/2026

**Branch:** `revista-facsimiles-verificados-16nov2026`, baseada no PR #26. Intervenção em prévia, sem merge/deploy. Os três PDFs do TSE foram baixados de links públicos literais, conferidos por SHA-256 e examinados em páginas selecionadas. O acervo original contém anexos com CPF, endereços pessoais e informações bancárias; **apenas três páginas sem esses dados foram incorporadas como PNG**, nunca o PDF inteiro. Registro completo de origem, SHA, páginas e limites de cada imagem em `docs/acervo-facsimiles-tse-camara-16nov2026.md`.

**Páginas de revista que ganharam prova visual autêntica:**

- **Partidos:** reprodução da Resolução CEN 043, de 01/07/2026, do União Brasil, **página 24 de 33** do PDF do PJe `0601251-87.2026.6.00.0000`. Nela, a Executiva declara 20% do FEFC às disputas majoritárias e 80% às proporcionais, com previsão de ajustes, além de piso para mulheres; **não demonstra a execução dos repasses**. Ao lado, reprodução da Resolução nº 14/2026 da **Federação Brasil da Esperança**, anexa ao processo do PT `0601252-72.2026.6.00.0000`, **página 10 de 64**; indica autonomia dos partidos integrantes e observância de pisos legais. Não chamar essa resolução de critério exclusivo do PT. As imagens originais ficam clicáveis, com legendas, páginas, data, fonte, crédito e links aos PDFs completos.
- **Quem controla:** reprodução da **capa**, página 1 de 34, do processo FEFC do PL `0600974-71.2026.6.00.0000`, gerada em 22/08/2026. A capa identifica processo, objeto e anexos, **não** prova aprovação de mérito ou valores transferidos às candidaturas. Fundo coral profundo com **toda a letra clara**, conforme decisão vinculante.
- **Na voz delas:** recorte fiel de **uma linha do catálogo de Discursos e Notas Taquigráficas da Câmara**, com Julia Zanatta, discurso de 10/03/2026 às 19h20, edição do Diário de 11/03/2026, p. 163. É imagem do **índice de busca**, não da página 163 do Diário, nem verificação autossuficiente da transcrição. O domínio de PDFs da Câmara respondeu HTTP 403 ao acesso automatizado; os links da fonte original permanecem à disposição. A oitava fala, não verificada, continua excluída.

**Interpretação:** documentos apresentados ao TSE e publicação dos critérios não equivalem a julgamento de mérito ou cumprimento de cotas. Manter distinção entre regras planejadas e contas executadas, registro e ocupação efetiva, documento autêntico e ficha editorial. Não criar documentos sintéticos. A reprodução de páginas públicas para finalidade de informação jornalística ainda deve passar por análise de direitos de uso e privacidade antes de publicação na main.

**Arquivos e componentes:** `src/components/editorial/FacsimilesFEFC2026.tsx` e atualização de `IndicesDocumentaisCamara.tsx`; imagens em `public/documentos/tse-uniao-brasil-resolucao-cen043-2026.png`, `tse-fe-brasil-resolucao-14-2026.png`, `tse-pl-processo-fefc-capa-2026.png` e `camara-sitaq-julia-zanatta-2026-03-10-p163.png`. Fotos históricas de Lélia e Pagu não foram alteradas, pois continuam com direitos pendentes.

**QA:** `.github/workflows/qa-facsimiles-originais-16nov.yml` testa TypeScript, build, identidade, integridade das 4 imagens e capturas de página inteira em desktop 1440 e celular 390 px, com checagem de imagens, largura, carga de documentos e texto claro no coral. Registrar resultado final real e revisar capturas antes de anunciar aprovação. A auditoria WCAG integral e o contraditório de eventuais imputações individuais continuam etapas distintas.

**Investigação técnica:** workflows de download e seleção de páginas convertidos em acionamento manual para evitar repetição automática de PDFs com dados pessoais e custos de CI. A captura de um documento com CPF em outro anexo **não autoriza sua reprodução**.

**Fontes originais:** https://www.tse.jus.br/eleicoes/eleicoes-2026-content/prestacao-de-contas/fundo-especial-de-financiamento-de-campanha-fefc e https://www.camara.leg.br/internet/SitaqWeb/ResultadoPesquisaDiscursos.asp?BasePesq=plenario&CampoOrdenacao=dtSessao&PageSize=50&TipoOrdenacao=DESC&btnPesqAvan=Pesquisar&dtFim=31%2F12%2F2026&dtInicio=01%2F01%2F2026&txOrador=Julia+Zanatta .

---

## 20. Acessibilidade, controle de publicação de documentos e limites do PR #28 — 16/11/2026

**Branch:** `revista-acessibilidade-e-licencas-16nov2026`, construída sobre PR #27; sem integração à main e sem deploy. Nenhuma mudança de fotografia, arquivo documental, base de dados, homepage, marca ou CSS global. A decisão visual aprovada permanece: página de revista com roxo estrutural, tinta, creme/papel, dourado e coral profundo. Letras e metadados sobre coral devem ser suficientemente claros e legíveis; branco com 85–90% de opacidade sobre o coral da revista **não** atende à razão mínima de 4,5:1 para textos comuns.

### 20.1. Auditoria automática e correções efetivas

Rodado axe-core 4.10.3 com marcadores WCAG 2 A/AA, 2.1 AA e 2.2 AA nas páginas **Homepage (controle), Partidos, Quem controla, Na voz delas, Como votaram, Reportagens e Dados**, em 1440 × 900, 390 × 844 e 320 × 720 px CSS. O diagnóstico inicial em dois viewports mostrou **18 ocorrências de contraste**, **duas ocorrências de estrutura de lista de definição** e **uma de item fora de lista** (somadas as duplicações por viewport).

Corrigido no código: (a) textos de abertura em Partidos sobre coral de `text-white/90` para `text-white`; (b) texto sobre violeta e algarismo decorativo 04 de dourado insuficientemente contrastado para branco; (c) no capítulo coral de Dados e na reprodução de capa PJe em Quem controla, texto agora em papel opaco, sem alterar a cor do fundo; (d) em Partidos, `<dl>` possui termo e definição sem `role=img` no `<dd>`, porcentagens legíveis como texto e barra decorativa `aria-hidden`; (e) ficha selecionada mobile passou a `<li>` dentro de `<ul>`, não mais item solto.

**Resultado posterior:** execução https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43925782716, **21 verificações e zero violações automáticas das regras selecionadas, sem erros JS ou transbordamento horizontal**, em desktop, 390 px e 320 px. A rotina `.github/workflows/qa-acessibilidade-documentos-16nov.yml` agora falha se detectar nova violação ou erro estrutural. O documento `docs/qa-acessibilidade-e-liberacao-documental-16nov2026.md` guarda relatório detalhado, limitações, metodologia e links.

A evidência de uma execução de axe **não é** certificação WCAG 2.2 AA. Ainda faltam leitor de telas, teste de ampliação real em 200%, foco profundo, rótulos de todos os filtros e controles, conteúdo alternativo de figuras complexas, revisão de todas as páginas restantes e avaliação com pessoas usuárias.

### 20.2. Ressalva editorial de publicação — GitHub é público

**Fato técnico verificado em 16/11/2026:** `natalyxxnunes-stack/elas-no-poder-observatory` possui `visibility: public`. Abrir PR como *draft* bloqueia merge automático, mas não oculta arquivos, imagens e commits da branch; **essas prévias são acessíveis no GitHub**, embora não estejam publicadas no site. Não afirmar que o material permanece privado ou inacessível. Não alterar a visibilidade do repositório sem aprovação da responsável editorial. O estado público agrava a urgência de avaliar reprodução de imagens e a triagem de dados pessoais antes de novas incorporações.

Os quatro recortes de documentos incluídos no PR #27 seguem **com pendência editorial/jurídica para a publicação no site**, apesar de sua procedência e ausência de CPFs/contas nas páginas selecionadas terem sido verificadas. A Lei nº 9.610/1998, art. 8º, IV, trata dos textos de atos oficiais; não concluir automaticamente que resoluções partidárias anexadas a processo público ou capturas de tela de sistemas sejam livres de proteção autoral. A LGPD, art. 4º, II, a, prevê tratamento jornalístico, mas a avaliação concreta continua necessária, especialmente sobre proporcionalidade e interesse público dos dados divulgados.

**Controle de liberação:** `docs/qa-acessibilidade-e-liberacao-documental-16nov2026.md` distingue situação das quatro imagens, fontes, eventuais dados pessoais, verificação factual, direitos de reprodução, aprovação editorial e bloqueios de deploy. Não executar merge dos PRs de acervo nem fazer deploy antes da decisão.

### 20.3. Precisão editorial em Na voz delas

A frase “declarações já autorizadas à publicação editorial” foi corrigida para “declarações selecionadas para publicação editorial”. A flag interna `publicar: true` não é sinônimo de autorização concedida pelas parlamentares. A oitava fala pendente continua fora do material publicado na prévia.

**Diretriz para continuidade:** preservar design, marca, fotografias e documentos já auditados; corrigir violações demonstradas, sem retomar o visual branco/lilás genérico. Continuar a auditoria de acessibilidade na revista inteira, com contrastes calculados e estrutura HTML semântica, e manter revisão de direitos separada da verificação técnica.


## 21. Auditoria de acessibilidade do primeiro lote restante — PR #29, 16/11/2026

O PR #29 continua a partir do **head efetivo do PR #28**, sem mesclar ou publicar. A rotina `.github/workflows/qa-acessibilidade-lote1-16nov.yml` acrescenta sete modelos de conteúdo (Método, Quem entrou?, Funil, Histórico, Dinheiro, Monitor, Temas) e duas variações dinâmicas (ficha de eleita e tema Dinheiro) em **1440, 390 e 320 px**, com **27 verificações** e 18 capturas integrais desktop/celular.

**Antes:** a execução [#43930579720](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43930579720) detectou contraste insuficiente em Funil, Histórico, Monitor, Temas e Tema Dinheiro, e uma lista de definições inválida em Monitor; foram 18 grupos de violações nos três viewports (repetições dos mesmos elementos, não 18 falhas independentes). O primeiro ensaio #43930178877 teve falha de gravação do relatório, corrigida e não computada como auditoria do site.

**Correções mínimas:** branco opaco sobre o coral profundo em Funil, Histórico e Monitor; papel opaco no capítulo Memória de Temas e nas lacunas de Tema Dinheiro; rótulos do componente `Secao` com opacidade adequada sobre fundos escuros/dourados; nota quantitativa de Monitor deslocada de `p` indevido como filho de `dl` para dentro do seu `dd`. O fundo coral, o roxo estrutural, o dourado, as fotografias, documentos, gráficos, números e estrutura de revista não foram substituídos.

**Depois:** execução [#43931907301](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43931907301) aprovada: **27 verificações, zero violações axe-core 4.10.3 nas regras selecionadas, zero erros JS/estruturais/transbordamentos**. Nove URLs com HTTP 200, `main` e `h1`. A comparação das capturas de páginas inteiras não mostrou alterações nas dimensões; as mudanças visuais são localizadas.

**Imagens:** a captura original do portal TSE e a foto da bancada em Método, a foto contextual do plenário em Monitor e a fotografia histórica de Bertha Lutz em Temas permanecem carregadas e legendadas. Não se acrescentaram documentos nem fotos decorativas; a matriz de evidências continua vigente. Direitos/privacidade e aprovação de fac-símiles do PR #27 seguem como pendência independente.

**Limites:** não se realizou teste efetivo de NVDA/VoiceOver, zoom real 200%, espaçamento de texto, operação exaustiva de filtros/teclado ou avaliação com pessoas usuárias. Uma ficha de eleita e um tema são amostras, não validação de todas as rotas dinâmicas. **Nenhuma certificação global de WCAG**. Relatório, metodologia, lista de arquivos, capturas e pendências em `docs/qa-acessibilidade-lote1-16nov2026.md`. Manter PR #29 como rascunho e não fazer merge nem deploy.


## 22. Acessibilidade da investigação, consulta e acervo — PR #30, 16/11/2026

**Continuidade:** branch `revista-acessibilidade-lote2-16nov2026`, criada a partir do head de PR #29. Foram analisados **sete novos modelos**: índice e página individual de Achados, Busca, Calendário, Coleção Antigênero no Poder, Investigações e Barreiras, com um segundo achado e uma busca preenchida. **Nove URLs em 1440, 390 e 320 CSS px: 27 verificações**, mais **18 capturas integrais** desktop/celular.

**Antes, [GitHub Actions #43936946379](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43936946379):** 11 grupos de violações (9 de contraste repetido por largura; 2 de alvo de toque em achado individual), sem JS/overflow. Busca: texto 15 px sobre coral com contraste 4,32:1; Investigações: contador 13 px sobre coral 4,02:1; Achado: link de método 22,5 px de altura no celular.

**Intervenções mínimas:** `text-paper` opaco no capítulo coral da Busca; remoção de `opacity-85` no contador do índice de Investigação; link do Método na página de Achado com `block min-h-11 py-2`, sem dispor os links lado a lado. Não se alteraram dados, conteúdo jornalístico, esquema de cores, fotografias, documentos, gráficos, CSS global, homepage ou logo.

**Depois, [#43937543405](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43937543405):** 27 verificações, nenhuma violação automática das regras WCAG 2 A/AA, 2.1 AA, 2.2 AA selecionadas pelo axe-core 4.10.3, nenhum erro de execução. **Teste complementar [#43938114266](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43938114266):** mesmo resultado e seis interações verificadas em dois tamanhos: busca com termo, teclado Enter para abrir/fechar `details`, âncoras de Achados.

**Fotografias e documentos:** nenhum `img` novo; a Coleção exibe distribuição por figura com descrição textual; Barreiras conserva os links distintos para lei, painel e representações, sem fac-símile inventado. Não se devem adicionar fotos genéricas para substituir prova documental. Revisão da matriz editorial mantida, sem mudança de decisão sobre licenças. A comparação de capturas de páginas inteiras confirma alterações localizadas (na ficha de Achado, 21 px a mais de altura no celular por causa do link).

**Limites e continuidade:** ausência de falhas automáticas não demonstra conformidade WCAG integral. NVDA/VoiceOver, zoom real 200%, espaçamento personalizado e operação completa por teclado permanecem pendentes. Restam **15 modelos de conteúdo** a auditar especificamente dos 35, além de ampliar amostragem dinâmica e revisão jurídica/editorial dos fac-símiles dos PRs anteriores. O diagnóstico detalhado, os arquivos, os artefatos e as pendências foram registrados em `docs/qa-acessibilidade-lote2-16nov2026.md`. Manter **PR #30 em rascunho, sem merge/deploy**.


## 23. Continuidade da auditoria e leitura visual — PR #31 (16/11/2026)

**Escopo e herança:** PR #31 deriva do head de PR #30 e auditou **Coautoria, Comparar, Direitos, Downloads, Em disputa, Pioneiras e Relatório 2026**. Homepage e Método foram controles da referência editorial. A automação do lote `.github/workflows/qa-acessibilidade-lote3-16nov.yml` inspeciona nove URLs, 1440, 390 e 320 CSS px, **27 verificações**, 18 capturas integrais e navegação inicial pelo teclado.

**Falha inicial verificada:** execução [#43939874034](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43939874034): quatro textos do capítulo coral do Relatório usavam papel com 80% de opacidade, contraste **3,72:1**, insuficiente para texto pequeno, repetido em cada viewport. **Correção localizada:** em `src/routes/relatorio-2026.tsx`, usar `text-paper` opaco nos textos secundários de capítulos claros. Fundo coral, paleta, gráficos, fotos, dados, links e composição preservados.

**Testes:** [#43940312286](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43940312286) aprovado em 27 verificações, zero violações de regras axe selecionadas, zero erros de execução. [#43941258951](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43941258951) também aprovado, acrescentando **8 interações** em desktop/celular: seleção de estados no Comparar, expansão por teclado dos detalhes de Downloads, cinco âncoras do Relatório e carregamento/legenda da foto de Pioneiras. Um seletor excessivamente estrito no primeiro teste de interação foi corrigido no workflow; não houve falha atribuída ao site.

**Observação visual por capturas reais:** a homepage fotográfica, o Método (documento do portal TSE + fotografia), Pioneiras (Bertha Lutz em 1936), Relatório (capítulos diferenciados), Coautoria (plenário e matriz) e Materiais (capas de PDF) mantêm o tratamento de revista. Pranchas desktop e celular preparadas para revisão editorial, sem simulação. Fotografia não se torna obrigatória onde o argumento pede série, lei, dados ou índice documental. Reavaliar o excesso de altura das manchetes móveis, especialmente do Relatório, após apreciação editorial; não modificar tipografia automaticamente.

**Reconciliação do universo:** são **35 modelos** na matriz, com **29 amostrados até o PR #31** e **6 pendentes** (Lélia Gonzalez, Pagu, Quem chega, Quem são elas? / candidatas, Sobre e Votos). O registro anterior de 20/15 não incluiu como modelos próprios os dois tipos de página dinâmica auditados no PR #29: ficha individual de eleita e tema individual. O número 29 é cobertura por *modelo amostrado*, não por todas as variantes publicadas.

**Pendências:** consulta real com NVDA/VoiceOver, zoom 200%, reespaçamento, navegação complexa e a análise jurídica de direitos do acervo dos PRs anteriores. Documentos e capturas da auditoria em `docs/qa-acessibilidade-lote3-16nov2026.md`. **Manter PR #31 em rascunho, sem merge nem deploy, sem alterar logo, homepage, CSS global ou bases eleitorais.**


## 24. Encerramento da cobertura por modelo — PR #32 (16/11/2026)

**Continuidade:** branch `revista-acessibilidade-lote4-16nov2026`, base PR #31. O lote reúne os seis modelos que faltavam: **Lélia Gonzalez, Pagu, Quem chega?, Quem são elas? / candidatas, Sobre e Votos**, com homepage, Relatório e Pioneiras como controles. **Nove URLs, três larguras (1440, 390 e 320 CSS px), 27 verificações axe, 18 capturas integrais**.

**Testes:** [#43942839897](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43942839897) passou 27 verificações, sem violações das regras WCAG selecionadas, erros de execução ou transbordamento. [#43944282720](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43944282720) repetiu o resultado e aprovou **12 verificações funcionais**, seis em desktop e celular: âncoras dos perfis, bloqueio dos retratos, explorador de candidatas com camadas externas/internas abertas por Enter, tabela de Votos por teclado, política de correções e link para fichas em Quem chega. Falhas intermediárias eram dos seletores do teste; o site não sofreu alteração.

**Política visual preservada:** Lélia Gonzalez não tem retrato liberado; Pagu está bloqueada por `verificacao-pendente`. As duas páginas usam ficha eleitoral **tipográfica** explicitada como tal, não um falso fac-símile. Quem chega traz fotografia de **março de 2026**, anterior ao pleito e legendada; a página de candidatas exibe captura do portal TSE, com nota e direitos ainda pendentes; Sobre e Votos não precisam de imagem genérica. As cores, documentos, fontes, dados, gráficos, homepage e logo originais foram preservados. Capturas desktop/mobile organizadas em duas pranchas para revisão editorial.

**Balanço:** **35/35 modelos da matriz com ao menos uma rota representativa auditada**, não 35/35 URLs certificadas. Ainda faltam inspeção humana com leitores de tela, zoom real de 200%, reespaçamento, menus móveis, outras variantes das fichas e temas, revisão de título/ritmo no celular e decisão jurídica sobre documentos de PRs anteriores. Documento de verificação: `docs/qa-acessibilidade-lote4-16nov2026.md`. **PR #32 permanece em rascunho, sem merge nem deploy.**


## 25. Correção de rumo e consolidação visual — PR #33 (16/11/2026)

**Motivo:** a editora apontou a regressão processual das rodadas de acessibilidade: aberturas de revista conviviam com miolos extensos em branco/lilás, e a fotografia histórica de Pagu, trabalhada antes, sumira do desenho apresentado. **As diretrizes já aprovadas não mudaram**; a resposta foi restaurar sua aplicação nas páginas, sem definir outra estética.

**PR de revisão consolidada:** [#33](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/33), branch `revista-consolidada-ajustes-de-ritmo-16nov2026`, cópia da ponta do PR #32 com base direta em `main`. Reúne alterações acumuladas dos PRs anteriores para avaliação integral, preservando sua história e **sem merge/deploy**. Âncora vinculante: `docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md` (Quem entrou? / Método / Reportagens). Nenhuma modificação de logo, homepage aprovada, CSS global, fontes de dados, contas, textos jornalísticos ou imagens da produção.

**Ritmo recuperado por página inteira:** aberturas de **Lélia** em roxo e **Pagu** em tinta, capítulo documental de Lélia em dourado, biografias em cadernos de leitura em papel sobre tinta, e intervalos de votos com dados já publicados; **Direitos** ganhou anos destacados em coluna roxa ao longo da linha temporal; **Quem chega** alterna capítulos de Senado, cor/raça, estados, partidos e poder; **Votos** destaca a consulta territorial; **Materiais** separa catálogo do arquivo CSV; **Sobre** individualiza acervo, princípios e política de correções. As mudanças foram localizadas no próprio arquivo de cada página, não impostas como template global.

**Fotografias preservadas e controle jurídico:** `public/fotos/pagu-patricia-galvao-anos-1920.jpg` sempre esteve no acervo. A composição de abertura em tinta com retrato e moldura coral, registrada na curadoria anterior, foi recuperada **somente para a prévia** mediante `VITE_QSE_PREVIEW_PAGU_FOTO=true`. Seu `src/data/fotos.ts` continua com `licenca: "verificacao-pendente"`; o build normal usa ficha do TSE e não reproduz a imagem. Para **Lélia**, foram recuperadas referências, inclusive retrato atribuído a Cezar Loureiro no Commons, mas continua sem retrato local autorizado e sem substituição por IA ou falsa prova documental. Novas fotos somente com procedência e decisão de licença específica.

**Validação:** [GitHub Actions #43950227435](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43950227435) aprovado: build normal sem foto pendente, compilação de prévia explícita com Pagu, 27 auditorias em 9 rotas e 3 larguras, zero violações automáticas nas regras selecionadas ou erros de execução. Capturas reais conferidas com os PRs #29–#32; comparação documentada em `docs/revisao-de-ritmo-e-consolidacao-16nov2026.md`. Os números do diagnóstico são indicadores aproximados de linhas claras em screenshots, não metas cromáticas nem prova de qualidade estética.

**Pendente antes de publicar:** revisão visual humana de todas as páginas e variantes em computador/celular, direitos de Pagu/Lélia e documentos do PR #27, zoom real 200%, leitor de tela e aceitação expressa da editora. **Não iniciar novo redesign, nova paleta ou outra sucessão de PRs; continuar no PR #33 até o fechamento.**


## 26. Pente-fino de páginas completas: Achados, Barreiras e Histórico — PR #33 (16/11/2026)

**Continuidade da mesma identidade, sem novo redesign:** seguir `docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md`, logo e homepage originais, roxo estrutural, tinta, creme quente, coral profundo com texto claro e dourado. A avaliação desta rodada se refere a **seções internas e páginas inteiras**, não apenas à abertura. Alterações feitas **somente** em `src/routes/barreiras.tsx` e `src/routes/historico.tsx`; `src/routes/achados.index.tsx` foi **preservada sem mudanças** por já alternar fundos e formatos de fichas com fontes e visualização própria.

**Barreiras:** capítulo de processos TSE/MPF em tinta, mantendo os **dois gráficos originais** sobre painéis claros e a distinção processo/caso/vítima; feminicídio em creme quente, com Anuário, rótulos e agregado racial conforme o documento; formas documentadas como caderno roxo com conteúdo em papel; critérios metodológicos em creme. O índice coral da Lei 14.192/2021, painel TSE e representações MPF permanece com links oficiais; nenhuma fotografia de vítimas, ilustração fictícia ou falsa reprodução documental foi inserida.

**Histórico:** primeira série Gênero em creme quente; entre o quadro Cargo × ano e o explorador territorial, interlúdio em tinta explicitando que **cada percentual se refere às cadeiras da UF na própria eleição**. A consulta, as quatro eleições, os dados e categorias raciais, cores semânticas dos gráficos, lacunas e arquivos TSE permanecem exatamente como estavam. Sem usar retrato histórico de outra época para ilustrar a série de 2014–2026.

**Verificação real:** [GitHub Actions #43956945141](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43956945141) aprovado: **15 verificações** (cinco páginas/controles × 1440, 390, 320 CSS px), zero violações automáticas das regras axe-core selecionadas e zero erros de execução; **seis testes funcionais** em desktop e celular de âncoras, links e troca de UF; dez capturas de página inteira. QA consolidado do PR #33 também aprovado no mesmo commit. Documento analítico e critérios de avaliação: `docs/revisao-integrada-achados-barreiras-historico-16nov2026.md`, com imagens originais do CI. Teste automático não substitui leitura humana, zoom de 200%, leitores de tela ou revisão de licenças.

**Estado editorial:** proposta aplicada e testada **em prévia do PR #33, ainda sem aceite visual final nem publicação**. Manter todas as decisões anteriores no mesmo manual; trabalhar no **PR #33** até a avaliação conjunta, sem abrir outra sequência de PRs nem voltar ao branco/lilás predominante ou a um template uniforme. 


## 27. Recuperação das fotografias, fundos e páginas de revista — PR #33 (16/11/2026)

**Decisão editorial reafirmada após revisão crítica:** as rodadas anteriores continuaram introduzindo grandes fundos brancos, lilases quase neutros e o creme editorial `--art-cream` como solução recorrente, contrariando as decisões dos pilotos e a [âncora vinculante](docs/design/ANCORA-EDITORIAL-PILOTOS-16NOV2026.md). A classificação de um teste axe como aprovado **não valida a identidade revista**. O trabalho foi corrigido no **mesmo PR #33** sem redesenhar logo, homepage, paleta, CSS global, dados ou textos da apuração.

**Implementado na prévia:** 
- **Lélia Gonzalez:** retrato histórico atribuído a **Cezar Loureiro**, com referência do [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:L%C3%A9lia_Gonzalez_by_Cezar_Loureiro.jpg), enquadrado em dourado na abertura roxa. O JPEG está em `docs/acervo-em-revisao/lelia-gonzalez-cezar-loureiro-referencia.jpg`, **fora de `public/`**. A renderização exige a variável explícita `VITE_QSE_PREVIEW_LELIA_FOTO=true` e cópia temporária do arquivo apenas no job de prévia. No build normal, o retrato **não é exibido**. A ficha Commons aponta uma tese de domínio público que **não foi verificada juridicamente**; primeiro veículo, data e titularidade devem ser investigados antes de publicar.
- **Pagu:** resgatada a fotografia já existente em `public/fotos/pagu-patricia-galvao-anos-1920.jpg`, no desenho de capa preta com moldura coral anteriormente estudado. `FOTOS.pagu.licenca = "verificacao-pendente"` continua; só aparece com `VITE_QSE_PREVIEW_PAGU_FOTO=true`, no build de revisão, com crédito e ressalva. O arquivo do Commons não resolveu autoria e primeira divulgação.
- **Barreiras:** inserida seção fotográfica inteira, com foto de **Renilce Nicodemos** (Kayo Magalhães/Câmara dos Deputados), cuja utilização contextual está vinculada à reportagem de **01/07/2026 sobre o PL 1446/2025**. A imagem é de arquivo, **não registra violência, vítima ou votação** do PL. O [guia oficial da Câmara](https://www2.camara.leg.br/comunicacao/assessoria-de-imprensa/guia-para-jornalistas/noticias-e-fotografias) permite uso de fotografias com crédito; a foto foi classificada em `src/data/fotos.ts` como **`uso-livre-com-credito`**, sem atribuir incorretamente uma licença CC-BY a esta imagem. Fundo dos blocos de feminicídio e critérios deixou de ser creme e passou para ameixa/tinta, conservando áreas de leitura em papel e os mesmos gráficos.
- **Histórico:** criada pausa fotográfica em tinta para o **primeiro turno de 04/10/2026**, com imagem de local de votação no UniCEUB Asa Norte, Brasília, **Saulo Cruz/Agência Senado**, e legenda que não a confunde com as eleições 2014, 2018 e 2022. A [ficha do Commons](https://commons.wikimedia.org/wiki/File:Elei%C3%A7%C3%B5es_2026_-_Primeiro_turno_(55567948757).jpg) registra licença **CC BY-SA 4.0**, confirmada por FlickreviewR em 05/10/2026. Primeira série em plano de leitura; comparação por gênero/raça em tinta; cargo/UF em roxo. Corrigido contraste de `ContextBox` dentro de fundo escuro por painel claro localizado, sem retornar a longos fundos claros.
- **Achados:** capítulos temáticos passam a alternar `bg-ink`, `--art-plum` e papel, reservando a área clara à consulta de fichas. A tentativa intermediária em violeta claro provocou falha objetiva de contraste; foi revertida para a **ameixa profunda já existente**, sem criar cor nova, alterar barras ou manusear as bases.

**Proveniência das três imagens incorporadas nesta rodada:** script e hashes arquivados em GitHub Actions [#43959698093](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43959698093). Arquivos públicos: `public/fotos/renilce-nicodemos-pl1446-camara.jpg` e `public/fotos/local-votacao-2026-agencia-senado.jpg`; Lélia permanece fora da pasta pública. Os metadados de crédito, contexto e condição estão em `src/data/fotos.ts`. Os arquivos públicos de imprensa **não provam apuração individual dos números eleitorais**; têm função contextual identificada.

**Teste de separação de ambientes:** [GitHub Actions #43962425567](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43962425567) aprovado: build normal **sem** retratos históricos de autorização pendente, compilação especial com as duas fotografias e legendas, capturas reais em desktop/celular e verificação axe das páginas. A auditoria específica de Achados/Barreiras/Histórico também verifica loading, alt, caption e interações em 1440/390/320 CSS px; seguir o registro detalhado em `docs/recuperacao-fotografias-e-contraste-16nov2026.md`.

**Limite de aceite:** a prévia visual **não constitui licença de reprodução** nem aprovação da versão final. Estão pendentes direitos de Lélia/Pagu e dos recortes anteriores, conferência editorial de todas as páginas inteiras, validação em leitores de tela/zoom real e decisão expressa da editora antes de qualquer merge ou deploy. **Continuar somente no PR #33, sem nova paleta nem novo projeto.**


## 28. Investigação, dinheiro e falas: evidências no corpo da revista — PR #33 (16/11/2026)

**Motivo editorial:** a revisão de visual e fotografia mostrou que algumas páginas continuavam com miolos de texto em superfícies quase brancas, embora já tivessem fonte documental relevante. Aplicar a mesma **identidade consolidada** por assunto, sem nova paleta, sem outro PR, sem alterações na homepage, no logo, nas contas, datas de corte, classificações raciais, textos de investigação ou CSS global.

**Quem controla? (`src/routes/quem-controla.tsx`)** — a abertura em roxo, o caderno FEFC em tinta e a reprodução **real** da capa PJe do PL em coral profundo já cumpriam a direção e foram preservados. A listagem das **cinco alavancas** passou a composição de fichas numeradas sobre papel, enquadradas em capítulo roxo; cada ficha mantém exatamente sua descrição, indicador exigido e status disponível/parcial/pendente. O capítulo jurídico `As regras que incidem` deixou o lilás e passou para tinta, com caixas claras locais e link da Lei 9.504/1997 legível em papel. **A imagem da capa identifica apenas o processo e os anexos**, sem comprovar execução, regularidade ou distribuição dos valores a candidaturas.

**Dinheiro (`src/routes/dinheiro.tsx`)** — no percurso entre **critérios do FEFC** e **recursos efetivamente recebidos**, foram inseridas **duas páginas reais de resoluções** já existentes na branch e com proveniência registrada no acervo documental: `public/documentos/tse-uniao-brasil-resolucao-cen043-2026.png` e `public/documentos/tse-fe-brasil-resolucao-14-2026.png`. Renderizam em `DuasResolucoesFEFC` com identificação, página exata, fonte integral, legenda e ressalva. A Federação Brasil da Esperança consta como **documento anexo ao processo do PT, não resolução exclusiva do PT**. As imagens ilustram **critérios formais declarados** e não mostram quanto cada candidata recebeu ou eventual infração legal. A seção de gênero × cor/raça passou a plano de tinta com painel de papel para os gráficos e notas. Nenhum valor, cor de categoria racial, denominador, universo, filtro ou data de corte foi alterado. **Licença/publicação dos recortes continuam sujeitas ao controle jurídico específico do PR #27.**

**Na voz delas (`src/routes/na-voz-delas.tsx`)** — preservados os textos literais das falas, nomes, contextos, respostas, indicadores do Anuário, fontes, datas, regras de publicação e a captura **autêntica** de uma linha do catálogo de discursos da Câmara, que já estava no final da reportagem com legenda diferenciando índice de Diário. Os registros alternam tinta, roxo estrutural e papel em vez de uma sequência uniforme de branco/creme. Os quadros contendo **dado oficial** usam dourado com tipografia em tinta. Fotografia genérica de parlamentar não foi incluída: a evidência jornalística pertinente são a transcrição e os documentos de origem, e um retrato ilustrativo poderia induzir associação a outra sessão.

**Reportagens (`src/routes/reportagens.tsx`)** — **preservada e usada como controle de direção editorial**, com manchete em roxo, figura de votos em tinta, fotografia contextual da Câmara de maio de 2023, capítulo coral de falas e índice de documentos. A foto segue identificada como **contexto**, não registro fotográfico das seis votações da apuração.

**Validação técnica e visual** — [GitHub Actions #43971435624](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43971435624), commit `77759a3731676b9238671e67520f723ee3b3d05a`, **aprovado**: TypeScript/HostGator, **5 rotas × 3 larguras = 15 verificações** axe-core selecionadas (1440, 390, 320 CSS px), sem violações identificadas, sem erros JS/horizontal overflow; **6 testes funcionais** em desktop/celular de alavancas, link legal, documento TSE, duas resoluções do FEFC com legenda e imagem carregada, captura da Câmara e navegação às falas fechadas. **Dez capturas integrais** originais, inclusive páginas completas longas em desktop/celular: [artefato do workflow](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43971435624/artifacts/14279395493). Leituras de página inteira foram inspecionadas; a visualização serve como evidência de intervenção, **não como aceite estético da editora**.

**Resultado e limite:** este lote preserva as fotografias documentais já catalogadas e insere **documentos reais onde eram ausentes**, com capítulos escuros para organização e papel delimitado às áreas de leitura. Não confundir conclusão de teste com licença, verdade jurídica ou aprovação para publicação. Permanecem pendentes os direitos de Lélia, Pagu e de reproduções oficiais identificadas, a avaliação com zoom real e leitores de tela e o aceite editorial final do PR #33, que continua **draft sem merge nem deploy**. Detalhamento em `docs/revisao-investigacoes-documentos-16nov2026.md`. Não recompor uma nova identidade ao retomar esta conversa.


## 29. Visualização legível das fontes e reforço do documento em Na voz delas — PR #33 (16/11/2026)

**Problema constatado pela editora:** a prancha entregue para comparação das quatro páginas era uma montagem de miniaturas de páginas de **até aproximadamente 9,5 mil pixels de altura**. A redução para poucos centímetros ocultou as fotografias, os recortes e os fac-símiles, mesmo quando as imagens estavam tecnicamente presentes. **É um erro de apresentação e de verificação editorial:** screenshots integrais são arquivo técnico, **não** são, sozinhos, prova visual adequada para a revisão humana. É obrigatório fornecer **também recortes a aproximadamente 1:1, com largura próxima à original**, de cada fotografia, documento e visualização relevante, além da página inteira para ritmo e navegação.

**Verificação do material real no PR #33:**
- **Quem controla?** mostra a capa autêntica do PJe do PL/TSE no capítulo coral, legível na captura desktop sem redução extrema. É capa de processo, não critérios anexos e nem prestação de contas.
- **Dinheiro** mostra as páginas originais do FEFC **União Brasil (Resolução CEN 043/2026) e Federação Brasil da Esperança (Resolução 14/2026, anexa ao processo do PT)** em caderno documental roxo; no print inteiro estavam abaixo da metade da página, e a montagem tornava ambas quase invisíveis. Não são fotografias, mas reproduções documentais reais, com legendas, origens e PDF integral.
- **Reportagens** tem fotografia de plenário da Câmara, datada de maio de 2023, corretamente identificada como contexto, **não fotografia das seis votações**.
- **Na voz delas** tinha uma imagem verdadeira, porém **muito fina e concentrada no caderno de fontes ao fim da página**: captura de **uma única linha** do índice de discursos da Câmara, que aponta a fala de Julia Zanatta para o Diário de 11/03/2026, p. 163. Isso não é uma imagem da página 163 do Diário, nem comprova o teor da citação sem o original.

**Correção de composição aplicada:** Na voz delas ganhou **um interlúdio documental roxo imediatamente após a abertura**, com título de investigação, número **163** em dourado, recorte **original e ampliável**, legenda de natureza e limite da evidência, e link direto para a pesquisa da Câmara. O recorte anterior **foi retirado do caderno final**, que conserva as referências textuais de todas as falas, para evitar duplicação decorativa da mesma imagem. Arquivos alterados: `src/routes/na-voz-delas.tsx` e `src/components/editorial/IndicesDocumentaisCamara.tsx`, que passou a aceitar `incluirRecorte={false}` sem afetar o padrão dos outros usos.

**Segurança e limites:** nenhuma fala, estatística, pessoa ou fonte foi alterada; nenhum documento foi fabricado; sem fotografia fora de contexto. [GitHub Actions #43973899797](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43973899797) aprovado, com cinco páginas em três larguras e testes de autenticidade visual mínima do recorte (arquivo carrega, alt, figura e legenda) e navegação ao registro. **Contraste automático aprovado não equivale a aceite de direção de arte.** Todos os prints de apresentação de agora em diante devem incluir **detalhes ampliados**, apresentados no mesmo tamanho visual das imagens, com **indicação de qual página e do que se trata**. Reportar a ausência de imagens quando real e a natureza exata de cada fonte; não afirmar simplesmente que uma página "tem fotografia" quando ela apresenta apenas texto, gráfico ou índice de dados.

Esta decisão é aditiva e **não reinicia o redesign**. PR #33 permanece em rascunho, sem merge/publicação. Registro da etapa em `docs/visibilidade-real-de-imagens-documentos-16nov2026.md`.


## 30. Fechamento editorial: cobertura dos modelos, variantes e publicação estática — PR #33 (16/11/2026)

**Situação aferida (prévia):** a matriz de `docs/matriz-fotografias-documentos-graficos-16nov2026.md` relaciona **35 modelos editoriais**. Os relatórios PRs #28–#32 já haviam testado **ao menos uma amostra de cada modelo**: 35/35. **Cobertura de modelos não é aceite visual da página inteira, nem auditoria exaustiva de todos os estados e URLs.** O PR #33 consolidou e revisou capítulos, fotografias e documentos sem mudar a identidade. A prioridade agora é **fechar pendências reais**, e não reiniciar o redesign, abrir novo PR ou recolorir indiscriminadamente.

**Bloqueio de publicação encontrado e corrigido:** o build HostGator tinha `prerender.crawlLinks=true` e incluía explicitamente apenas achados. A listagem de eleitas mostra inicialmente 18 fichas, deixando outras URLs fora da malha de links rastreados; a URL real `/eleitas/raquel-lyra-pe`, cujo registro consta da base, retornou **HTTP 404 na versão estática de teste**. Corrigido em `vite.config.static.ts`, que agora inclui explicitamente todos os **342 slugs de `ELEITAS_2026`** e os **seis slugs de `TEMAS`**, além dos achados. Não foram alterados nomes, candidaturas, resultados, filtros ou informações das fichas.

**QA após a correção:** [GitHub Actions #43976601483](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43976601483), aprovado. **342 de 342 páginas de eleitas e seis de seis páginas de Temas presentes como `index.html` no pacote estático, sem ausências no sitemap.** Teste Playwright/axe-core selecionado de **nove páginas-amostra × três larguras = 27 verificações**, zero violações selecionadas e zero erros de execução; **18 verificações funcionais** em desktop e celular (seis variantes temáticas, uma ficha de deputada, uma de governadora e a captura documental da página Quem são elas?). Os testes não equivalem à leitura visual de cada uma das 342 fichas.

**Semântica de documento:** a captura real do portal TSE na rota `/quem-sao-elas` deixou de ser `div` + parágrafo solto e agora usa `figure` + `figcaption`; a legenda identifica a página **de disponibilização**, não uma captura do CSV ou da base completa, e lembra que **o direito sobre a interface não decorre automaticamente da licença dos dados**. Código: `src/components/editorial/CadernoDocumentalRevista.tsx`; arquivo fotográfico original preservado.

**Imagens conferidas na auditoria de variantes:** tema **Memória** tem fotografias documentais datadas de Bertha Lutz em 1927 e na posse de 1936; tema **Agenda** apresenta fotografia de contexto parlamentar, explicitando que ela não registra as votações recontadas. Os outros temas usam prioritariamente gráficos, número-objeto, citações e fontes; não acrescentar fotografia decorativa só por simetria. As fichas individuais não recebem retratos de pessoas sem direito documentalmente verificado. Capturas completas e inventário em [artefato #14279714782](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43976601483/artifacts/14279714782).

**Três frentes ainda abertas, antes de finalizar o redesign:**
1. **Aceite editorial de página inteira e estados de uso:** conferir composições e evidências em tamanho real, manchetes longas, páginas de dados extensas e combinações de filtros/celular. Revisar as variantes de fichas mais complexas por amostragem, sem presumir que 342 HTMLs entregues significam 342 fichas avaliadas humanamente.
2. **Direito de reprodução individual:** retratos históricos **Pagu e Lélia** permanecem bloqueados no build normal; decisão específica sobre a captura da interface **TSE** e quatro recortes públicos anteriores (**União Brasil, Federação Brasil da Esperança, capa PJe do PL e índice da Câmara**) antes do merge. A presença de arquivo em repositório público não constitui autorização; manter fontes, dados pessoais, origem, data, licença ou fundamento jurídico e alternativa textual.
3. **Acessibilidade humana e publicação:** navegação real por teclado, leitores de tela NVDA/VoiceOver, zoom de 200% e reespaçamento; revisão do diff integral do PR #33 contra `main`, aceite explícito da editora e integração/deploy supervisionado na HostGator. **Nenhuma mesclagem, publicação, mudança da homepage ou redefinição da paleta foi autorizada nesta rodada.**

Registro completo em `docs/fechamento-redesign-pendencias-16nov2026.md`. Decisões visuais anteriores (roxo estrutural, tinta, coral profundo com texto claro, dourado, imagem factual, leitura em papel pontual, logo original) seguem vinculantes.


## 31. Fechamento: reflow e direitos de reprodução — 16/11/2026

**Escopo:** PR #33, sem merge/deploy. Permanecem intactas a logo, a homepage, a paleta roxo estrutural/tinta/coral profundo com texto claro/dourado e os critérios de prova visual. Não recolorir páginas indiscriminadamente.

**Teste novo:** scripts/qa/reflow-teclado-fechamento.py e .github/workflows/qa-fechamento-reflow-teclado-16nov.yml. [GitHub Actions #43980902610](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43980902610) aprovado: 27 cenários de nove rotas (desktop, reflow com 640 CSS px/DPR2 e texto reespaçado no celular), nenhum transbordamento detectado e três interações por teclado funcionais. Esse reflow é **equivalente e simulado**, não zoom nativo 200% nem teste NVDA/VoiceOver. A avaliação humana continua necessária.

**Direitos com fonte institucional:** a Câmara permite uso de fotografias do Banco de Imagens com crédito, em regra CC BY; outras imagens e documentos não herdaram automaticamente essa licença. Fotos Pagu e Lélia continuam bloqueadas em produção, por incertezas de autoria, primeira publicação ou enquadramento da ficha Commons. A captura de interface TSE, a resolução interna do União Brasil, a resolução da Federação Brasil da Esperança, a capa PJe do PL e uma linha do catálogo de discursos da Câmara continuam **com avaliação individual pendente**. Lei 9.610/1998, arts. 8º e 46; nenhuma liberação tácita.

**Registro analítico:** docs/triagem-direitos-e-a11y-final-16nov2026.md, com fontes, sete decisões pendentes e limites metodológicos. O PR continua draft; o aceite visual de páginas inteiras e documentos em tamanho legível precede o encerramento.


## 32. Revisão de fotografias e distribuição do acervo (16/11/2026)

**Inspeção de páginas completas, sem mudança de identidade:** os screenshots originais de Barreiras, Histórico, Achados, Direitos, Quem chega, Votos, Sobre, Materiais e Pioneiras foram examinados. Barreiras apresenta fotografia real de Renilce Nicodemos na discussão do PL de proteção a pré-candidatura, não fotografia de vítima ou julgamento. Histórico contém registro do local de votação de 04/10/2026, com legenda de 2026, distinto das séries históricas de 2014, 2018 e 2022. Direitos utiliza transcrições identificadas e cronologia, sem fingir que cartelas são fac-símiles. Persistem áreas claras de leitura, sobretudo dados e documentos, mas não foram encontradas razões suficientes para repintura generalizada. **Nenhum redesign adicional foi feito nesta rodada**; logo original, homepage, paleta e fotografias atuais preservadas.

**Falha de publicação corrigida:** o componente de Pagu bloqueava a renderização da foto por direitos pendentes, mas o arquivo public/fotos/pagu-patricia-galvao-anos-1920.jpg ainda era copiado para dist/client/ pelo Vite e pelo restaurador de arquivos. Assim, permanecia acessível por URL mesmo oculto na interface. O script scripts/hostgator-public-binaries.mjs passa a **remover arquivos pendentes do pacote normal**, abrangendo Pagu e preventivamente Lélia; somente as flags VITE_QSE_PREVIEW_PAGU_FOTO=true e VITE_QSE_PREVIEW_LELIA_FOTO=true habilitam seus arquivos na compilação de prévia editorial. Não se alteram originais do GitHub público nem fichas tipográficas normais. Essa proteção se aplica ao pacote estático HostGator, não a outros serviços de distribuição.

**Teste verificável:** [Actions #43983013191](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43983013191), sucesso no commit 0d1c549305d11f0581ee9c2b0878b777476b2e44; workflow .github/workflows/qa-ritmo-revista-integrada-16nov.yml comprova ausência dos retratos em dist/client no build normal, presença na prévia, renderização da ficha no build normal e imagens válidas nos previews. As outras três rotinas gerais também passaram no mesmo commit. Se direitos vierem a ser confirmados, a retirada do bloqueio deve ser explicitamente autorizada e documentada.

**Pendências restantes:** avaliação jurídica individual dos materiais ainda pendentes; leitura humana de páginas longas e variantes com filtros e tabelas, zoom nativo, leitores de tela; aprovação editorial das composições e diff de PR #33 antes de qualquer integração e deploy. PR #33 permanece em rascunho.

## 33. Pente-fino do PR consolidado, integridade de 399 páginas e apresentação para aceite visual — 16/11/2026

**Escopo e governança:** PR #33, baseado em main, permanece rascunho e sem publicação. O diff completo tinha 120 arquivos no momento da conferência (incluindo documentação, testes, rotas e assets). O inventário de arquivos de maior risco identificou alterações nas fichas de fotografia, novo índice de fontes partidárias e uma atualização editorial pontual em src/data/temas.ts: os critérios formais do FEFC são públicos no TSE, mas sua aplicação a cada candidatura ainda exige apuração. **Não foram alteradas a home, a logo, as bases centrais de votação, candidaturas e resultados, nem os arquivos de estilos globais.** A alteração do empacotamento está restrita à HostGator e preserva o código publicado em main.

**QA integral do pacote estático:** script scripts/qa/integridade-links-pacote.py, workflow .github/workflows/qa-integridade-links-16nov.yml. [Execução inicial #43985935626](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43985935626): 399 páginas HTML pré-renderizadas; 19.845 ocorrências de links internos válidos; 596 ocorrências de links externos listadas, sem verificação HTTP; 37 referências locais de mídia válidas encontradas no HTML; zero erros de destino interno, fragmentos e mídia, zero placeholders. As duas fotografias históricas em análise autoral permanecem ausentes do pacote normal. Esses números descrevem **ocorrências de links no HTML**, não URLs únicas nem estados interativos. **Após revisão do diagnóstico sem falso positivo**, o teste deixou de ser apenas informativo e passou a FALHAR se houver links/mídias locais quebrados, fragmentos ausentes, retratos bloqueados no pacote ou queda anormal da contagem de páginas. [QA de regressão #43986261537](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43986261537), sucesso.

**Revisão da página inteira, não só da abertura:** capturas efetivas de Direitos, Quem chega, Sobre e Votos (desktop e celular) foram separadas para avaliação da editora; originais da [execução de prévia #43981679297](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43981679297) antecedem apenas testes e bloqueios de arquivos, sem modificação da composição dessas quatro páginas. Em Direitos, os cadernos de normas funcionam como reprodução tipográfica explicitamente rotulada, não simulação de fac-símile. Quem chega alterna abertura forte, fotografia contextual, capítulo do Senado e dados por estado/partido, com seções longas que precisam de leitura em tamanho nativo. Sobre é institucional e não requer fotografia genérica de bastidores. Votos usa os próprios gráficos e denominadores como peças visuais; fotografia de plenário seria inadequada se não registrasse a votação analisada. **Não se determina recoloração ou inclusão automática de fotos por simetria.** Aceite estético continua sendo decisão da editora.

**O que a auditoria não cobre:** links externos não foram requisitados; disponibilidade dos documentos públicos pode mudar. A extração HTML não cobre todas as alterações de DOM após filtros, leitor de tela ou navegação durante animação. O inventário de mídia inclui apenas tags explícitas do HTML pré-renderizado, não todos os recursos baixados pelo JavaScript. O sucesso dos testes de CI não confere autorização de reprodução a imagens nem substitui avaliação jurídica ou humana.

**Restante antes do encerramento:** revisão de direitos individual de Pagu, Lélia e cinco imagens de interface/processo; última leitura humana de páginas completas, filtros e tabelas, zoom nativo e tecnologia assistiva; aprovação do diff e autorização expressa para mesclar e publicar. Não iniciar outra identidade, não atualizar números eleitorais por inferência e não mesclar PR #33 automaticamente.


## 34. Etapa 1 do fechamento — parecer visual de 43 rotas completas (16/11/2026)

**Direção normativa preservada:** consulta da âncora dos três pilotos, capítulos anteriores do manual e matriz fotográfica. Foram registradas **86 capturas completas de 43 rotas** da versão PR #33, em 1440 e 390 CSS px, sem falhas detectadas na coleta ([Actions #43993887153](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43993887153)). A cobertura inclui as **35 famílias de página** da matriz, seis variantes temáticas, fichas individuais e dois estados de busca; não são 399 páginas aprovadas uma a uma nem avaliação humana de todos os estados.

**Achado visual e intervenção pontual:** nos Temas **Memória** e **Violência política**, o único achado ocupava só um terço da seção num grid de três colunas e gerava coluna excessivamente longa com vazio lateral. A rota src/routes/temas.$slug.tsx passou a destacar o único achado com largura de até 1024px e escala tipográfica de matéria; dois achados em duas colunas, três ou mais em até três colunas. Sem mexer em fotografia, gráfico, cor, número, título, texto ou fonte. QA específico com dimensão mínima em desktop/celular, [Actions #43994685648](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43994685648), aprovado; capturas posteriores desses dois Temas guardadas com as capturas anteriores dos demais.

**Parecer de conjunto:** favorável ao aceite editorial sem redesenho amplo. Manter roxo estrutural, tinta, coral profundo com **texto claro**, ouro pontual, materiais de leitura em papel, Fraunces + sans, fotografia documental verdadeira quando há acontecimento/personagem registrável e documentação/gráficos como protagonistas em séries. **Não é exigência pôr foto em toda página**; registros de votos, regras e dados agregados frequentemente pedem gráfico, cartela tipográfica corretamente rotulada ou fac-símile com direitos comprovados. As páginas mais longas (Direitos, Achados, Em disputa, Histórico, Quem chega, Votos) exigem leitura em tamanho real no celular, mas não foram recoloridas automaticamente.

**Relação individual de cada rota e critérios de decisão:** docs/parecer-editorial-visual-etapa1-16nov2026.md. A editora continua responsável pelo aceite final de cada objeção visual. O PR #33 permanece **draft, sem merge e sem deploy**. Direitos e acessibilidade humana continuam nas etapas seguintes.


## 32. Peça-piloto de colagem editorial — Pagu (16/11/2026)

Após a revisão jurídica das sete reproduções, foi aprovada a exploração de **colagem editorial** como alternativa provisória a fotografias sem licença comprovada, sem abandonar a busca por fotografias e documentos autênticos. Referência visual fornecida pela editora: composição de Pagu com textura de papel, gravura, recortes de imprensa, tinta escura e cores fortes. **Não considerar a referência gerada por IA como retrato documental, registro de época ou licença da fotografia original.**

**Implementação pontual no PR #33:** em `src/components/editorial/Pioneiras.tsx`, a abertura de Pagu no build normal apresenta uma **peça gráfica tipográfica original construída no próprio front-end** (nome PAGU, campos temáticos e formas em roxo, tinta, coral, dourado e papel). Legenda expressa que não se trata de retrato ou documento original. A ficha de votação de 1950 foi **preservada** ao lado/abaixo da composição. Não houve alteração nos dados, denominadores, homepage, logo, CSS global, nem nas regras de bloqueio dos dois retratos. A prévia especial com flag fotográfica mantém seu próprio comportamento para revisão, sem autorização para publicação.

**Regra de expansão, ainda sem aceite:** testar visualmente a página completa e a versão celular antes de criar peças em outras páginas. Usar colagem editorial apenas quando tiver função narrativa, com fontes documentais identificadas em separado. Elementos decorativos nunca devem simular conteúdo verificável (gráficos com valores inventados, jornais falsos, manchetes apócrifas, fac-símiles). Não uniformizar todas as páginas nem substituir automaticamente fotografias licenciáveis por ilustrações.

**Status:** alteração apenas na branch do PR #33, que continua em rascunho, sem merge ou publicação. Build, captura integral e aceite estético desta peça ainda precisam ser realizados.
