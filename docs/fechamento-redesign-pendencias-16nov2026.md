# Fechamento do redesign — quadro de entregas e pendências verificáveis

**Projeto:** Quem são elas? · **Corte:** 16/11/2026 · **Repositório:** `natalyxxnunes-stack/elas-no-poder-observatory` · **PR #33:** `revista-consolidada-ajustes-de-ritmo-16nov2026` (base `main`, draft). **Não publicado.**

## O que está realmente concluído

- **35 de 35 modelos editoriais** da matriz receberam ao menos **uma amostra de auditoria** nos PRs #28–#32, conforme [relatório do quarto lote](qa-acessibilidade-lote4-16nov2026.md). Não confundir modelo coberto com cada estado dinâmico ou aprovação visual.
- O PR #33 consolidou os ajustes da revista e seu repertório cromático, fontes, fotografias e documentos, com revisões em páginas inteiras de Achados, Barreiras, Histórico, Direitos, Pioneiras, Dinheiro, Quem controla, Na voz delas, entre outras. A homepage e a logo original continuam preservadas. As peças em cinza/creme quase branco deixaram de ser a solução automática para capítulos de prova; áreas claras permanecem onde a leitura exige.
- A matriz e os manuais agora distinguem **fotografia real**, **página de documento público**, **captura de interface**, **recorte de índice**, **gráfico autoral** e **reprodução tipográfica**. Nem toda página precisa de fotografia, mas a editora deve receber captura legível e identificada da evidência que existe.
- A revisão de **seis variantes temáticas** (`presenca`, `dinheiro`, `agenda`, `poder`, `violencia`, `memoria`) e **duas fichas individuais** (Perpétua Almeida, deputada federal, e Raquel Lyra, governadora) foi acrescentada ao QA. Na **Memória**, registradas fotos de Bertha Lutz de 1927 e de sua posse em 1936; em **Agenda**, foto de plenário de 2023 em contexto, sem atribuição à série de votações.

## Falha real identificada e corrigida: página 404

**Sintoma antes da correção:** `/eleitas/raquel-lyra-pe` respondia **404** no pacote HostGator da branch apesar de o nome integrar a base `ELEITAS_2026`; `/eleitas/perpetua-almeida-ac` respondia 200. A razão foi o uso de `crawlLinks` para descobrir as páginas de uma lista que só revela 18 eleitas inicialmente. **Correção:** `vite.config.static.ts` enumera os slugs de `ELEITAS_2026` e os seis Temas no `pages` de pré-renderização, preservando o conjunto dos achados.

**Evidência final:** [workflow #43976601483](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43976601483), sucesso: **342 fichas + seis Temas com HTML próprio e incluídos no sitemap, zero ausências**. O mesmo workflow verificou **nove rotas × três larguras = 27** cenários, **zero violações axe-core selecionadas, zero erros estruturais** e **18 testes funcionais** em computador e celular. Isso verifica a existência de rotas, não o conteúdo jornalístico individual de cada ficha nem cada interação. [Capturas, diagnóstico, interações](https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43976601483/artifacts/14279714782).

**Semântica documental corrigida:** `PortalTSEEmContexto` em `src/components/editorial/CadernoDocumentalRevista.tsx` vincula a imagem original da interface do portal do TSE a seu `figcaption`; especifica que a captura da página não é o arquivo CSV e mantém a situação dos direitos pendente.

## O que ainda impede a conclusão final

| Frente | Estado | Decisão restante |
| --- | --- | --- |
| **Aceite visual** | Modelos auditados e páginas revistas, mas a editora rejeitou versões anteriores com fundos demasiado claros e evidências visualmente apagadas | Conferir **páginas inteiras + recortes em tamanho legível** e aprovar/comentar somente os pontos remanescentes; não reiniciar identidade |
| **Direitos** | Dois retratos históricos bloqueados no build normal; TSE interface e quatro recortes públicos com liberação jurídica pendente | Decisão registrada por obra/imagem: publicar, publicar com restrições ou substituir por referência/link, com crédito, fundamento e contexto |
| **Acessibilidade humana** | Verificações selecionadas axe-core e funcionamento por automação; sem ensaios reais NVDA/VoiceOver/zoom | Testar teclado até o miolo, menus móveis, tabelas horizontais, leitor de tela e zoom/reflow real |
| **Publicação** | PR #33 consolidado sobre `main`, sem merge; deploy HostGator não executado | Revisão final do diff (código, dados e assets), autorização expressa da editora, depois integração/publicação e conferência do site ao vivo |

### Pendências documentais individualizadas

1. **Pagu**, fotografia histórica, autor e primeira divulgação incertos; flag de prévia apenas.
2. **Lélia Gonzalez**, foto atribuída a Cezar Loureiro, base jurídica de reprodução e primeira publicação pendentes; armazenamento apenas em `docs/acervo-em-revisao`, fora de `public` no build normal.
3. **Captura da interface TSE 2026**, cujo direito de reprodução não é estabelecido pela licença da base CSV.
4. **Resolução CEN 043/2026 do União Brasil**, página de documento anexado a PJe/TSE.
5. **Resolução 14/2026 da Federação Brasil da Esperança**, presente no PJe do PT; não é regra exclusiva do PT.
6. **Capa do processo PJe do PL** (documento de identificação, não resolução de critérios).
7. **Linha do índice de discursos da Câmara** (recorte verdadeiro, não fac-símile da página 163 do Diário).

**Cautela:** a existência de imagens no GitHub público torna o acervo consultável a terceiros; branch draft não significa privado. Não inferir autorização da disponibilidade pública do registro. Essas sete pendências não são sete páginas sem imagens, mas **sete decisões específicas de reprodução**.

## Critério de encerramento

Redesign considerado pronto **após** aceite de página inteira das composições, solução dos direitos para cada item efetivamente publicado, acessibilidade humana essencial, aprovação do diff e deploy conferido. Não acrescentar porcentagem arbitrária de progresso ou prazo presumido. Continuar exclusivamente no PR #33 e registrar decisões no mesmo manual, respeitando a âncora dos pilotos e sem substituir a paleta aprovada.
