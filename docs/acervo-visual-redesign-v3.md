# Acervo visual — implementação editorial v3

Data de conferência: 14/11/2026. Esta branch é teste isolado, sem publicação.

## Ativos com origem individualizada

### Bertha Lutz, 1927
- Página de origem: https://commons.wikimedia.org/wiki/File:Bertha_Lutz_e_a_campanha_pelo_voto_feminino.jpg
- Arquivo original identificado: https://upload.wikimedia.org/wikipedia/commons/1/14/Bertha_Lutz_e_a_campanha_pelo_voto_feminino.jpg
- Acervo: Arquivo Nacional, Fundo Federação Brasileira pelo Progresso Feminino.
- Crédito da ficha: Domínio público / Acervo Arquivo Nacional.
- Estado: fotografia original obtida e salva em public/fotos/bertha-lutz-1927.jpg; SHA-1 verificado com a ficha do Commons (34fae1c264d484e377f7a21a584579ce736a4a92). Registrada em src/data/fotos.ts e exibida na chamada Memória.

### Plenário da Câmara durante tramitação da igualdade salarial, maio de 2023
- Página oficial de contexto: https://www.camara.leg.br/noticias/957955-camara-pode-votar-nesta-quarta-feira-projeto-que-equipara-salario-entre-homens-e-mulheres/
- Arquivo disponibilizado na Agência Câmara: https://www.camara.leg.br/midias/image/2023/05/img20230502202050592-768x512.jpg
- Crédito da fotografia: Bruno Spada/Câmara dos Deputados.
- Banco da Câmara indica licença CC BY para seu acervo; a aplicabilidade à fotografia publicada na notícia requer conferência individual antes do uso definitivo.
- Cópia obtida e validada como JPEG: public/fotos/plenario-igualdade-salarial-2023.jpg.
- Aplicação: fotografia da abertura editorial; legenda identifica o uso como imagem de arquivo associada a UMA das pautas investigadas. Não apresenta a foto como registro das seis votações.

### Foto coletiva da bancada feminina da Câmara, 04/03/2026
- Registro: fotografia oficial da bancada feminina em homenagem ao Dia Internacional da Mulher, **antes das eleições de outubro de 2026**. Esta foto **não é** a composição das mulheres eleitas para a legislatura iniciada em 2027.
- Artigo da Agência Câmara que reproduz a foto: https://www.camara.leg.br/noticias/1299890-representacao-feminina-total-de-candidatas-a-camara-cai-24-em-2026
- Fonte primária do arquivo: https://www.camara.leg.br/midias/image/2026/03/img20260304142115193-768x473.jpg
- Banco de Imagens da Câmara, 04/03/2026: https://www.camara.leg.br/internet/bancoimagem/default.asp?data=04/03/2026
- Crédito conferido: **Vinicius Loures/Câmara dos Deputados**. O banco oficial informa utilização com crédito, sob regime Creative Commons BY.
- Cópia local: `public/fotos/bancada-feminina-camara-marco-2026.jpg`. Arquivo JPEG verificado por assinatura e tamanho no GitHub Actions.
- Usada na chamada “Quem chega às cadeiras” como **contexto institucional de 2026**, com legenda temporal explícita. Não apresentar como fotografia das eleitas de outubro, nem associar presença na foto à eleição.
- Aplicação visual: fotografia integral, sem filtros, desenhos por cima, recortes que mudem sentido ou retratos gerados por IA.

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
- Estado: três materiais reais disponíveis. Os PDFs têm miniaturas fiéis da primeira página, geradas pelo pdftoppm.
- Em auditoria visual foi detectada corrupção do infográfico quadrado. O PNG foi regenerado a partir de scripts/materiais/infografico-universos.html; a exportação Vite alterava seus bytes mesmo com a fonte íntegra.
- A rotina scripts/hostgator-public-binaries.mjs agora restaura e compara byte a byte os recursos binários de public/ e dist/client/ no build:hostgator. O CI também valida assinaturas PNG/JPEG.

## Como funciona a implementação de teste
1. A rota inicial chama CapaEditorialV3 somente na branch redesign-editorial-v3-teste.
2. A abertura trabalha com reportagem publicada no índice e com fotografia original da Agência Câmara, contextualizada e creditada, em substituição ao painel SVG genérico.
3. O destaque Memória usa fotografia documental de domínio público do Arquivo Nacional com crédito. Os outros dois usam composições gráficas originais, identificadas como tais.
4. Os seis temas ocupam grade consistente, sem micrográficos nem blocos inclinados.
5. Um único módulo de dados mostra a participação de mulheres nas cadeiras da Câmara, calculada diretamente de resultado-2026.ts, com numerador, denominador e corte.
6. A Biblioteca apresenta miniaturas genuínas, com abertura compacta e capas de materiais reais, sem quatro ícones decorativos de arquivos.
7. Não há imagens geradas por IA, URLs remotas de fotografia ou citação documental construída como se fosse literal.

## Pendências antes de aprovar merge
- Obter a fotografia selecionada de Célia Xakriabá em resolução editorial, conferir o arquivo individual, os termos de utilização e registrar em src/data/fotos.ts se aprovada.
- Miniaturas reais geradas e utilizadas; checagem visual em navegador automatizado realizada para a Biblioteca e a homepage. Recomenda-se ainda teste manual em dispositivos físicos.
- Verificar os números contraditórios do financiamento em suas bases de origem (56,1% e 56,2%) antes de destacá-los.
- TypeScript e build HostGator executados na branch; validação adicional de binários está em revisão final. Lint, teclado, contraste e teste físico não estão encerrados.
- Revisar com a editora a aparência das composições, títulos e condições de uso das fotografias.
- Manter main e hospedagem pública sem alterações até aprovação.

## Regra de publicação
Foto documental somente após cópia local, crédito e licença por item. Colagem com documentos somente após verificar teor e proveniência. Estudos com IA não entram no código. Não há autorização para merge nem publicação automática desta branch.
