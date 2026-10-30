/**
 * falas — declarações públicas de eleitas sobre mulheres, feminismo e
 * violência, com data e fonte primária. Regras:
 *  - só entra fala com fonte primária localizada (transcrição oficial da
 *    Câmara, vídeo ou áudio original), citada entre aspas, sem corte que
 *    mude o sentido;
 *  - quando a fala afirma um fato, o dado oficial vai ao lado;
 *  - quando a pessoa explicou ou corrigiu a fala, a versão dela entra;
 *  - toda pessoa citada recebe pedido de posicionamento; resposta entra com data;
 *  - `publicar: false` = levantado, mas ainda não conferido no áudio/vídeo
 *    original; não aparece no site.
 */
import { FEMINICIDIO_2025, FEMINICIDIO_META } from "@/data/violencia-2026";
import { formatDecimal, formatInt } from "@/lib/format-br";

export type Fala = {
  id: string;
  pessoa: string;
  partido: string;
  cargo: string;
  data: string;
  onde: string;
  /** o que estava em discussão */
  contexto: string;
  fala: string;
  fonteUrl: string;
  fonteRotulo: string;
  /** dado oficial que confirma ou contradiz a afirmação de fato */
  dado?: { texto: string; fonte: string };
  /** versão da própria pessoa sobre a fala, quando houver */
  versao?: { texto: string; data: string; fonte: string; url: string };
  posicionamento?: { texto: string; data: string };
  publicar: boolean;
  checagem?: string;
};

const DC = (d: string, p: number) =>
  `https://imagem.camara.gov.br/dc_20b.asp?largura=&altura=&tipoForm=diarios&selCodColecaoCsv=D&Datain=${encodeURIComponent(d)}&txPagina=${p}&txSuplemento=&enviar=Pesquisar`;

const ANUARIO = `${FEMINICIDIO_META.fonte}, publicado em ${FEMINICIDIO_META.publicadoEm}`;

export const FALAS: Fala[] = [
  {
    id: "zanatta-2026-03-10",
    pessoa: "Julia Zanatta",
    partido: "PL-SC",
    cargo: "deputada federal, reeleita em 2026",
    data: "10/03/2026",
    onde: "Plenário da Câmara",
    contexto: "Discurso na semana do Dia Internacional da Mulher.",
    fala: "O Brasil registra o maior número de feminicídios da história. Mais de 1.500 mulheres foram assassinadas em um único ano.",
    fonteUrl: DC("11/3/2026", 163),
    fonteRotulo: "Diário da Câmara, 11/03/2026, p. 163",
    dado: {
      texto: `O Anuário confirma: ${formatInt(FEMINICIDIO_2025.vitimas)} vítimas de feminicídio em 2025, ${FEMINICIDIO_2025.variacao}.`,
      fonte: ANUARIO,
    },
    publicar: true,
  },
  {
    id: "zambelli-2024-03-05",
    pessoa: "Carla Zambelli",
    partido: "PL-SP",
    cargo: "deputada federal até 2025 (mandato vago desde 14/12/2025)",
    data: "05/03/2024",
    onde: "Plenário da Câmara",
    contexto: "Discurso na Semana da Mulher, sobre a guerra entre Israel e o Hamas.",
    fala: "Eu não sou feminista, Deputado Delegado Éder Mauro, mas reconheço que Simone de Beauvoir teve sua importância na história.",
    fonteUrl: DC("6/3/2024", 104),
    fonteRotulo: "Diário da Câmara, 06/03/2024, p. 104",
    publicar: true,
  },
  {
    id: "zanatta-2023-03-07",
    pessoa: "Julia Zanatta",
    partido: "PL-SC",
    cargo: "deputada federal, reeleita em 2026",
    data: "07/03/2023",
    onde: "Plenário da Câmara",
    contexto: "Discurso depois de um bate-boca na bancada feminina.",
    fala: "A bancada feminina não é bancada feminista; é bancada feminina. [...] Não é o movimento político-partidário que é o feminismo que vai dizer o que é o meu direito, o nosso direito.",
    fonteUrl: DC("8/3/2023", 77),
    fonteRotulo: "Diário da Câmara, 08/03/2023, p. 77",
    publicar: true,
  },
  {
    id: "kicis-2023-12-21",
    pessoa: "Bia Kicis",
    partido: "PL-DF",
    cargo: "deputada federal, eleita senadora em 2026",
    data: "21/12/2023",
    onde: "Plenário da Câmara",
    contexto:
      "Fala sobre ter sido a primeira mulher a presidir a CCJ e a Comissão de Fiscalização Financeira e Controle.",
    fala: "Ainda existe certo preconceito. Vejam bem que não é mimimi ou papo de feminista, não. Mas ainda percebo algumas atitudes de alguns Deputados, quando se dirigem às Deputadas que assumem a Presidência de alguma Comissão, de forma um pouco agressiva [...]. Isso irá passar, mas não será na marra ou por meio de lei.",
    fonteUrl: DC("22/12/2023", 109),
    fonteRotulo: "Diário da Câmara, 22/12/2023, p. 109",
    publicar: true,
  },
  {
    id: "kicis-2025-07-08",
    pessoa: "Bia Kicis",
    partido: "PL-DF",
    cargo: "deputada federal, eleita senadora em 2026",
    data: "08/07/2025",
    onde: "Plenário da Câmara",
    contexto: "Orientação de voto num projeto sobre descumprimento de medida protetiva.",
    fala: "Esse substitutivo não foi feito com a bancada feminina. Ele foi feito com a bancada feminista.",
    fonteUrl: DC("9/7/2025", 129),
    fonteRotulo: "Diário da Câmara, 09/07/2025, p. 129",
    publicar: true,
  },
  {
    id: "tonietto-2023-09-26",
    pessoa: "Chris Tonietto",
    partido: "PL-RJ",
    cargo: "deputada federal, reeleita em 2026",
    data: "26/09/2023",
    onde: "Plenário da Câmara",
    contexto:
      "Discurso sobre a ADPF 442, que discute no STF a descriminalização do aborto até a 12ª semana.",
    fala: "E não venham dizer, feministas, que isso é pela população pobre, negra ou indígena, porque muitos não querem o aborto.",
    fonteUrl: DC("27/9/2023", 160),
    fonteRotulo: "Diário da Câmara, 27/09/2023, p. 160",
    publicar: true,
  },
  {
    id: "ventura-2023-06-07",
    pessoa: "Adriana Ventura",
    partido: "NOVO-SP",
    cargo: "deputada federal, reeleita em 2026",
    data: "07/06/2023",
    onde: "Plenário da Câmara",
    contexto:
      "Explicação do voto contra a lei de igualdade salarial (PL 1.085/2023), um mês depois da votação.",
    fala: "O projeto, na verdade, não falava de igualdade, porque isso já está na CLT desde 1940, está em outras quatro leis aprovadas depois. Ali se falava de multa, de interferência na iniciativa privada, que é quem emprega.",
    fonteUrl: DC("8/6/2023", 73),
    fonteRotulo: "Diário da Câmara, 08/06/2023, p. 73",
    publicar: true,
  },
  {
    id: "campopiano-2026",
    pessoa: "Eduarda Campopiano",
    partido: "PL-SP",
    cargo: "vereadora de Praia Grande, eleita deputada estadual em 2026",
    data: "13/10/2026",
    onde: "Café com a Gazeta, Gazeta do Povo (YouTube)",
    contexto:
      "Entrevista para responder à repercussão de uma fala anterior, em debate gravado, em que disse não achar que feminicídio exista. Sites atribuem a fala a um podcast com Fernanda Melchionna; ela diz que foi num debate no canal de Felipe Cestaro e que circula um recorte de 10 segundos.",
    fala: "Em nenhum momento eu disse que não existem mulheres sendo assassinadas. [...] A tipificação de feminicídio, no meu ver, ela prejudica medidas de combate a esse tipo de crime.",
    fonteUrl: "https://www.youtube.com/watch?v=SK228weoMi4",
    fonteRotulo: "Gazeta do Povo, Café com a Gazeta, 13/10/2026, por volta de 1:20 e 3:05",
    dado: {
      texto: `O feminicídio é crime autônomo no Código Penal desde a Lei 14.994/2024. Em 2025, ${formatDecimal(FEMINICIDIO_2025.razoesDeGeneroPct)}% das mulheres assassinadas no Brasil foram mortas por razões de gênero, o maior percentual desde 2015, e houve ${formatInt(FEMINICIDIO_2025.vitimas)} vítimas de feminicídio.`,
      fonte: ANUARIO,
    },
    publicar: false,
    checagem:
      "Trecho lido na transcrição automática do YouTube. Antes de publicar: ouvir o vídeo de 0:50 a 3:30, localizar a gravação original do debate e pedir posicionamento.",
  },
];

/** data em que os pedidos de posicionamento foram enviados (null = ainda não) */
export const FALAS_PEDIDO_ENVIADO_EM: string | null = null;
