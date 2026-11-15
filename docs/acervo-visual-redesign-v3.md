# Acervo visual — implementação editorial v3

Data de conferência: 14/11/2026. Esta branch é teste isolado, sem publicação.

## Ativos com origem individualizada

### Bertha Lutz, 1927
- Página de origem: https://commons.wikimedia.org/wiki/File:Bertha_Lutz_e_a_campanha_pelo_voto_feminino.jpg
- Arquivo original identificado: https://upload.wikimedia.org/wikipedia/commons/1/14/Bertha_Lutz_e_a_campanha_pelo_voto_feminino.jpg
- Acervo: Arquivo Nacional, Fundo Federação Brasileira pelo Progresso Feminino.
- Crédito da ficha: Domínio público / Acervo Arquivo Nacional.
- Estado: licença identificada; download local tentado e não concluído. Imagem não registrada no código.

### Célia Xakriabá, Câmara, 04/03/2026
- Galeria: https://www.camara.leg.br/banco-imagens/eventos/8327BCE3-BAAC-4C71-B8B4-2A1550A2A73A
- Prévia do item: https://www.camara.leg.br/internet/bancoimagem/banco/2026/03/img20260304112235745PEQ.jpg
- Legenda de origem: homenagem ao Dia Internacional da Mulher, deputada Célia Xakriabá.
- Crédito: Kayo Magalhães / Câmara dos Deputados.
- Regime indicado pelo banco: Creative Commons BY, com crédito obrigatório.
- Estado: arquivo individual e autoria identificados; download local e versão em alta resolução pendentes. Não inserir foto na página até obter cópia local com ficha.

### Documentos
- Agenda: PL 1.085/2023; registro oficial: https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2351179
- Violência: Lei 14.192/2021, publicação oficial: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14192.htm
- Dinheiro: critérios partidários do FEFC 2026, fonte TSE; selecionar arquivo e página específicos antes de produzir composição documental.
- Poder: registros da Comissão de Defesa dos Direitos da Mulher, reunião de 11/03/2026; selecionar registro e página específicos.
- Estado: identificados como fontes documentais. Nenhum fac-símile novo foi fabricado.

### Materiais já presentes no repositório
- public/materiais/infografico-universos-quadrado.png
- public/materiais/cartilha-cota.pdf
- public/materiais/oficina-funil.pdf
- Estado: os três arquivos já constam do projeto. O infográfico é mostrado com a imagem original. PDFs são visualizados pelo navegador quando suportado, com fallback explícito.

## Como funciona a implementação de teste
1. A rota inicial chama CapaEditorialV3 somente na branch redesign-editorial-v3-teste.
2. A abertura trabalha com reportagem publicada no índice e com arte SVG geométrica escrita no código, rotulada como composição editorial não documental.
3. Os três destaques usam composições ortogonais originais com indicação explícita de que são gráficos, não fotografias ou documentos.
4. Os seis temas ocupam grade consistente, sem micrográficos nem blocos inclinados.
5. Um único módulo de dados mostra a participação de mulheres nas cadeiras da Câmara, calculada diretamente de resultado-2026.ts, com numerador, denominador e corte.
6. A Biblioteca usa um infográfico realmente existente e PDFs do próprio acervo. Não repete títulos dentro de capas inventadas.
7. Não há imagens geradas por IA, URLs remotas de fotografia ou citação documental construída como se fosse literal.

## Pendências antes de aprovar merge
- Arquivar os originais de Bertha Lutz e Célia Xakriabá, verificar contextos e direitos de edição e registrar arquivos locais em src/data/fotos.ts.
- Gerar miniaturas estáticas reais da primeira página dos PDFs caso o visualizador do navegador não funcione satisfatoriamente em celular.
- Verificar os números contraditórios do financiamento em suas bases de origem (56,1% e 56,2%) antes de destacá-los.
- Testar compilação, lint e renderização real em desktop e celular com dependências disponíveis.
- Revisar com a editora a aparência das composições, títulos e condições de uso das fotografias.
- Manter main e hospedagem pública sem alterações até aprovação.

## Regra de publicação
Foto documental somente após cópia local, crédito e licença por item. Colagem com documentos somente após verificar teor e proveniência. Estudos com IA não entram no código. Não há autorização para merge nem publicação automática desta branch.
