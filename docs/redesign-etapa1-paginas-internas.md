# Redesign editorial — Etapa 1: páginas internas
**Concluída na branch de teste:** `redesign-editorial-v3-teste` · 15/11/2026  
**Pull request:** https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/pull/1  
**Estado:** código implementado e prévia técnica validada. **Sem merge, sem publicação.**

## Escopo realizado

### Reportagens e coleção
- `/na-voz-delas`: abertura documental com referências originais do Diário da Câmara; declarações, datas, dados oficiais, contexto, versões e fontes **preservados**. Três primeiras entradas em leitura aberta e demais registros em seção expansível; links diretos abrem o conteúdo de destino.
- `/como-votaram`: preservada a abertura fotográfica e a leitura por camadas implementadas antes desta etapa. Nenhum resultado, critério ou gráfico recontado aqui.
- `/reportagens`: índice visual com fotografia documental contextualizada em uma matéria, arte editorial original na outra e hierarquia de títulos.
- `/colecoes/antigenero-no-poder`: capa com referências às duas proposições, grade editorial de evidências e visualização completa dos mandatos acessível sob demanda. Listas, ressalvas, métodos e contraditório originais preservados.

### Seis temas
A rota `/temas/$slug` usa `TemaOpening`, com aberturas específicas:
1. **Presença:** visualização própria do funil e das cadeiras, ligada à base existente.
2. **Dinheiro:** figura do financiamento sobre fundo escuro com abertura clara.
3. **Agenda:** fotografia documental do plenário na tramitação da igualdade salarial, identificada como foto de arquivo de maio de 2023.
4. **Poder:** fotografia da bancada feminina da Câmara em março de 2026, com ressalva explícita de que ela não representa as eleitas em outubro.
5. **Violência:** referência tipográfica à Lei 14.192/2021 e link para o documento oficial; não é fac-símile.
6. **Memória:** fotografia de Bertha Lutz de 1927, domínio público / Acervo Arquivo Nacional.

Todas as visualizações originais de `ObjetoTema.tsx` permanecem disponíveis. Para os quatro temas que abrem com foto/documento, o gráfico detalhado passou para um painel de consulta. As páginas ganharam navegação interna para tese, achados, atores, lacunas e leitura/consulta. Foram retirados os recortes de papel rasgado do rodapé dos temas. **Nenhuma tese, conclusão, universo, categoria racial ou número foi reescrito.**

### Perfis e páginas de consulta
- `/pioneiras`, `/pioneiras/pagu`, `/pioneiras/lelia-gonzalez`: linguagem de arquivo histórico, abertura editorial distinta e reprodução tipográfica do registro oficial do TSE na ausência de fotografia licenciada, inclusive em telas móveis. Sem retratos inventados.
- `/eleitas` e `/eleitas/$slug`: cabeçalhos de catálogo e de ficha eleitoral, diferentes das reportagens. Onde não existe retrato com direitos verificados, aparece identificação documental recomposta a partir dos dados públicos, identificada como tal. Busca, filtros, recortes, bases e períodos preservados.
- `/temas`: índice com hierarquia de leitura, fotografia histórica creditada e seis entradas editoriais sem recortes rasgados.

## Verificação executada
- **16 rotas** (incluindo seis temas, reportagens, coleção, perfis históricos e fichas eleitorais) renderizadas pelo build estático.
- Capturas em **1440 px desktop** e **390 px celular**, 32 imagens no total, pelo workflow `qa-paginas-internas.yml`.
- TypeScript (`tsc --noEmit`) e build HostGator aprovados no GitHub Actions.
- A construção continua validando os binários públicos, incluindo fotografias e miniaturas originais.
- Evidência: https://github.com/natalyxxnunes-stack/elas-no-poder-observatory/actions/runs/43675776758

## Limites conhecidos para o pente-fino posterior
- Capturas de navegador **não** equivalem a auditoria completa de teclado, leitor de tela, links profundos, filtros interativos e dispositivos físicos.
- Rever contraste real, cortes fotográficos, tipografia e ritmo de cada página, especialmente os trechos longos das histórias e os gráficos expandidos.
- Conferir a condição de reutilização individual da fotografia da Câmara por Bruno Spada e da fotografia da bancada feminina por Vinicius Loures antes de publicar.
- Reconciliar o indicador de financiamento de **56,1%/56,2%** com base, universo e data de corte antes de apresentar um valor como confirmado.
- A apuração jornalística e as situações processuais **não** foram revalidadas nesta etapa: a intervenção foi de apresentação, sem mudanças nas fontes, cálculos, declarações ou universo publicado.
- O componente `Recorte.tsx` continua no código para compatibilidade com outras áreas não alteradas nesta etapa; a remoção é localizada nas rotas de temas.
- Limpar eventuais workflows de uso único e consolidar o pull request durante o pente-fino final.

**Protocolo:** manter este PR em rascunho. Não incorporar `revista-temas` a `main`, não usar Lovable e não publicar na HostGator até a aprovação editorial explícita.
