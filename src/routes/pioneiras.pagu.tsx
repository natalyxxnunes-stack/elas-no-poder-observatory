import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { FichaGrafico } from "@/components/editorial/ChartFrame";
import {
  Conferencia,
  LinhaDoTempo,
  FichaVotacao,
  PerfilHero,
  PerfilNav,
} from "@/components/editorial/Pioneiras";
import { ANCORAS_PIONEIRAS, SP_1950 } from "@/data/perfis-pioneiras";
import { formatInt, formatPct } from "@/lib/format-br";

export const Route = createFileRoute("/pioneiras/pagu")({
  head: () => ({
    meta: [
      { title: "Pagu · Pioneiras · Quem são elas?" },
      {
        name: "description",
        content:
          "Patrícia Galvão, a Pagu: presa num comício em Santos em 1931, candidata a deputada estadual em 1950. Teve 171 votos; a eleita com menos votos precisou de 1.909.",
      },
      { property: "og:title", content: "Pagu: da prisão em 1931 aos 171 votos de 1950" },
      {
        property: "og:description",
        content:
          "Perfil com a votação oficial de Pagu na eleição de 1950, recontada a partir do arquivo do TSE.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PaguPage,
});

const n = formatInt;
const d = SP_1950;

function Fonte({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-block py-1.5 underline decoration-plum underline-offset-4"
      >
        {children}
      </a>
    </li>
  );
}

function PaguPage() {
  const linhas = [
    { rotulo: "Pagu (PSB), igual à mediana da lista do PSB", valor: d.pagu.votos, destaque: true },
    { rotulo: "Mediana de todas as candidaturas", valor: d.medianaGeral },
    { rotulo: "Eleita com menos votos", valor: d.menorVotacaoEleita },
  ];
  const max = d.menorVotacaoEleita;

  return (
    <PageShell breadcrumb={[{ label: "Pioneiras", to: "/pioneiras" }, { label: "Pagu" }]}>
      <PerfilHero
        ficha={
          <FichaVotacao ano="1950" uf="SP" cargo="Deputado estadual" registro="PATRÍCIA GALVÃO" partido="PSB" votos={SP_1950.pagu.votos} situacao="Suplente" arquivo={SP_1950.arquivoSp} sha={SP_1950.arquivoSpSha256} />
        }
        fotoId="pagu"
        years="1910–1962"
        nome="Patrícia Galvão, a Pagu"
        quemFoi="Escritora, jornalista e militante, foi presa pela primeira vez aos 21 anos, num comício em Santos. Vinte anos depois, tentou uma vaga na Assembleia de São Paulo."
        ancora={ANCORAS_PIONEIRAS["pagu"]!}
      />

      <SectionBlock
        id="eleicao-1950"
        kicker="A eleição de 1950"
        question={`${n(d.pagu.votos)} votos, numa Assembleia com ${n(d.mulheresEleitas.length)} mulheres em ${n(d.cadeiras)} cadeiras`}
        align="wide"
        lead={
          <p>
            Em {d.data}, Pagu disputou uma vaga de deputada estadual em São Paulo pelo Partido
            Socialista Brasileiro (PSB), com o panfleto de campanha <em>Verdade e Liberdade</em>. Ficou
            como suplente.
          </p>
        }
      >
        <figure className="poster-frame max-w-3xl p-5 md:p-6">
          <figcaption className="font-display text-xl leading-snug text-ink">
            A votação de Pagu e as referências da disputa, em votos
          </figcaption>
          <ul className="mt-5 space-y-4">
            {linhas.map((l) => (
              <li key={l.rotulo}>
                <div className="flex items-baseline justify-between gap-4 text-[15px]">
                  <span className={l.destaque ? "font-semibold text-ink" : "text-ink/80"}>{l.rotulo}</span>
                  <span className="whitespace-nowrap font-mono text-ink">{n(l.valor)}</span>
                </div>
                <div className="mt-1 h-4 w-full bg-plum/10">
                  <div
                    className={l.destaque ? "h-4 bg-plum" : "h-4 bg-plum/35"}
                    style={{ width: `${(l.valor / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <FichaGrafico
            ficha={{
              vendo:
                "Votos nominais de Pagu comparados com duas referências da eleição para a Assembleia Legislativa de São Paulo. Os 171 votos dela são exatamente a mediana da lista do PSB.",
              contados: `As ${n(d.candidaturas)} candidaturas a deputado estadual em São Paulo, de ${n(d.partidos)} partidos; a lista do PSB tinha ${n(d.psb.candidaturas)}.`,
              denominador:
                "Cada barra é um número absoluto de votos; a escala vai até a votação da eleita com menos votos.",
              data: `Eleição de ${d.data}; arquivo baixado em ${d.baixadoEm}.`,
              fonte: "TSE, Dados Abertos, Resultados 1950, Votação nominal por UF. Recontagem independente.",
              limitacao:
                "Em 1950, a eleição era proporcional: a cadeira dependia também dos votos do partido. Votação abaixo da menor eleita não explica sozinha a derrota.",
            }}
          />
        </figure>

        <ul className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-ink">
          <li>
            <strong>No PSB, foi uma candidatura mediana.</strong> O partido lançou{" "}
            {n(d.psb.candidaturas)} nomes e elegeu {n(d.psb.eleitos)}. Os {n(d.pagu.votos)} votos de
            Pagu são exatamente a mediana da lista socialista, e ela foi a mais votada das{" "}
            {n(d.psb.mulheres)} mulheres do partido.
          </li>
          <li>
            <strong>Mulheres na disputa:</strong> pelo menos {n(d.mulheresCandidatasMinimo)} das{" "}
            {n(d.candidaturas)} candidaturas, cerca de{" "}
            {formatPct((d.mulheresCandidatasMinimo / d.candidaturas) * 100, 0)}.
          </li>
          <li>
            <strong>Mulheres eleitas:</strong> {n(d.mulheresEleitas.length)} das {n(d.cadeiras)}{" "}
            cadeiras ({formatPct((d.mulheresEleitas.length / d.cadeiras) * 100)}).{" "}
            {d.mulheresEleitas
              .map(
                (m) =>
                  `${m.nome} (${m.partido}${m.registro !== m.nome ? `, registrada como ${m.registro}` : ""}), com ${n(m.votos)} votos`,
              )
              .join(", e ")}
            .
          </li>
        </ul>

        <div className="mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
          <article className="border-t-2 border-dashed border-ink pt-4">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-ink">Interpretação editorial</p>
            <p className="mt-2 text-[17px] leading-relaxed text-ink">
              Notoriedade e sacrifício político não viraram voto. A candidata conhecida dos jornais e
              com cinco anos de cadeia teve a votação típica de um partido pequeno.
            </p>
          </article>
          <article className="border-t-2 border-ink pt-4">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-ink">Hipótese em investigação</p>
            <p className="mt-2 text-[17px] leading-relaxed text-ink">
              A votação baixa pode ter mais a ver com o tamanho do PSB em São Paulo do que com o fato
              de ela ser mulher: {n(d.psb.homensAbaixoDe200)} dos {n(d.psb.homens)} homens da lista
              também ficaram abaixo de 200 votos. Falta comparar com outras eleições e partidos.
            </p>
          </article>
        </div>
      </SectionBlock>

      <SectionBlock id="quem-foi" kicker="Quem foi" question="Da antropofagia à Assembleia">
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-ink">
          Patrícia Rehder Galvão nasceu em 9 de junho de 1910, em São João da Boa Vista (SP), e morreu
          em 12 de dezembro de 1962, em Santos, de câncer, aos 52 anos. Começou a escrever em jornais
          ainda adolescente. Em 1928, Raul Bopp a apresentou a Tarsila do Amaral e a Oswald de Andrade,
          e foi ele quem lhe deu o apelido. Publicou desenhos na <em>Revista de Antropofagia</em>. Em
          1930, casou-se com Oswald, com quem teve o filho Rudá.
        </p>
        <LinhaDoTempo
          itens={[
            {
              ano: "1931",
              titulo: "O partido e o jornal",
              texto: (
                <>
                  Entrou para o Partido Comunista entre 1930 e 1931 (as fontes divergem sobre o ano).
                  Com Oswald, editou <em>O Homem do Povo</em>, que durou oito números, e assinou nele a
                  coluna “A Mulher do Povo”, em que criticava os modelos de mulher da sociedade em que
                  vivia.
                </>
              ),
            },
            {
              ano: "1931",
              titulo: "A primeira prisão",
              texto:
                "Em 23 de agosto, a polícia ocupou o centro de Santos para impedir um comício em memória de Sacco e Vanzetti, convocado pelo Socorro Vermelho e pela federação sindical da cidade, em meio às greves dos estivadores. Na Praça da República, o ensacador de café Herculano de Souza, militante comunista e negro, foi baleado pela polícia e morreu. Pagu, que tentava socorrê-lo, foi presa, junto com a militante Guiomar Gonçalves. Ficou detida na cadeia da Praça dos Andradas, onde hoje funciona um centro cultural com o nome dela.",
            },
            {
              ano: "1933",
              titulo: "O livro",
              texto: (
                <>
                  Publicou <em>Parque Industrial</em>, em edição própria e com o pseudônimo de Mara
                  Lobo. O romance acompanha operárias do Brás, em São Paulo, e costuma ser apontado como
                  o primeiro romance proletário brasileiro.
                </>
              ),
            },
            {
              ano: "1934",
              titulo: "A viagem e a volta",
              texto:
                "Entre 1933 e 1934, viajou por Estados Unidos, Japão, China, Manchúria e União Soviética, e depois pela Europa. Em Paris, foi presa como comunista estrangeira e mandada de volta ao Brasil.",
            },
            {
              ano: "1935",
              titulo: "Cinco anos de prisão",
              texto:
                "Na repressão que se seguiu ao levante comunista de novembro de 1935, foi presa de novo e torturada pela polícia de Getúlio Vargas. Saiu em 1940, com 44 quilos.",
            },
            {
              ano: "1940",
              titulo: "A ruptura",
              texto: (
                <>
                  Rompeu com o Partido Comunista e se aproximou do trotskismo. Casou-se com o jornalista
                  Geraldo Ferraz e passou a escrever na <em>Vanguarda Socialista</em>, jornal de Mário
                  Pedrosa. Em 1945, publicou com Ferraz o romance <em>A Famosa Revista</em>.
                </>
              ),
            },
            {
              ano: "1950",
              titulo: "A candidatura",
              texto: `Disputou uma vaga na Assembleia de São Paulo pelo PSB e teve ${n(d.pagu.votos)} votos. Os números estão no topo desta página.`,
            },
            {
              ano: "1956",
              titulo: "Jornal e teatro em Santos",
              texto: (
                <>
                  Nos últimos anos, viveu entre São Vicente e Santos. Escreveu no jornal{" "}
                  <em>A Tribuna</em>, onde assinou com o pseudônimo Gim uma das primeiras colunas de
                  televisão do país. Coordenou o Teatro Universitário Santista a partir de 1956 e dirigiu{" "}
                  <em>Fando e Lis</em>, de Arrabal. Ajudou a fundar a associação de jornalistas e a união
                  do teatro amador da cidade.
                </>
              ),
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock
        id="reputacao"
        tone="lilac"
        kicker="O que se sabe e o que é reputação"
        question="O que circula sobre Pagu, e o que o documento mostra"
      >
        <Conferencia
          itens={[
            {
              status: "Sem documento",
              circula: "“A primeira mulher presa por motivo político no Brasil.”",
              documento:
                "O título é repetido em livros, jornais e no site da Prefeitura de Santos, mas não encontramos documento que o sustente, e a própria prisão de 1931 teve outra mulher detida junto, Guiomar Gonçalves. O que dá para afirmar: Pagu está entre as primeiras mulheres com prisão política documentada no país.",
            },
            {
              status: "Sem lista",
              circula: "“Foi presa 23 vezes.”",
              documento:
                "O número aparece na obra do historiador John W. F. Dulles e é repetido por muitas fontes, sem a lista das detenções.",
            },
            {
              status: "Fontes divergem",
              circula: "Quanto durou a prisão de 1931.",
              documento:
                "As fontes divergem entre cerca de duas semanas e quase três meses. Este perfil não traz a duração até conferirmos no prontuário do Deops, no Arquivo Público do Estado de São Paulo.",
            },
            {
              status: "Fontes divergem",
              circula: "Quando ela se afastou do partido.",
              documento:
                "Há relatos de afastamento já em 1932. O perfil usa só a ruptura de 1940, documentada nas biografias.",
            },
          ]}
        />
      </SectionBlock>

      <PerfilNav atual="pagu" />

      <ComoSabemos
        fonte={
          <ul>
            <Fonte href="https://dadosabertos.tse.jus.br/dataset/resultados-1950">
              TSE, Dados Abertos, Resultados 1950, Votação nominal por UF
            </Fonte>
            <Fonte href="https://fpabramo.org.br/a-semana-na-historia-21-a-27-de-agosto/">
              Fundação Perseu Abramo, 23 de agosto de 1931
            </Fonte>
            <Fonte href="https://fpabramo.org.br/indomita-pagu-2/">
              Walnice Nogueira Galvão, “Indômita Pagu”, 2010
            </Fonte>
            <Fonte href="https://revistas.usp.br/alterjor/article/view/132135">
              Gisely Hime, “Os desencontros entre a Mulher do Povo e as mulheres do povo”, Alterjor, 2017
            </Fonte>
            <Fonte href="https://www.santos.sp.gov.br/?q=hotsite%2Fpagu">
              Prefeitura de Santos, hotsite Pagu (texto de Lúcia Teixeira, Centro Cultural Pagu Unisanta)
            </Fonte>
            <li className="py-1.5">Augusto de Campos, <em>Pagu: vida e obra</em>, Companhia das Letras, 2014.</li>
            <li className="py-1.5">John W. F. Dulles, <em>Brazilian Communism, 1935–1945</em>, University of Texas Press.</li>
          </ul>
        }
        universo={`Eleição para a Assembleia Legislativa de São Paulo de ${d.data}: ${n(d.candidaturas)} candidaturas a deputado estadual, ${n(d.cadeiras)} cadeiras.`}
        base={`Arquivo ${d.arquivoSp}, baixado em ${d.baixadoEm}. SHA-256 do pacote: ${d.zipSha256}. SHA-256 do arquivo de São Paulo: ${d.arquivoSpSha256}.`}
        calculo={
          <>
            Recontagem da votação nominal, candidatura por candidatura. A base de 1950 não registra o
            sexo: identificamos as candidatas pelo prenome e conferimos um a um. Três prenomes ambíguos
            ({d.prenomesAmbiguosFora.join(", ")}) ficaram fora, por isso o número é “pelo menos{" "}
            {n(d.mulheresCandidatasMinimo)}”. Script em scripts/pioneiras/votacao_historica.py.
          </>
        }
        limites={[
          "A trajetória é contada a partir de biografias e reportagens; onde as fontes divergem, o texto diz.",
          "A contagem de mulheres candidatas em 1950 é um piso, não o total exato.",
          "A votação nominal não inclui eventuais votos dados só à legenda do partido.",
        ]}
      />
    </PageShell>
  );
}
