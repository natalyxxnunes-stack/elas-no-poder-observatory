import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SectionBlock } from "@/components/editorial/SectionBlock";
import { ComoSabemos } from "@/components/editorial/ComoSabemos";
import { FichaGrafico } from "@/components/editorial/ChartFrame";
import { Conferencia, LinhaDoTempo, PerfilHero, PerfilNav } from "@/components/editorial/Pioneiras";
import { ANCORAS_PIONEIRAS, RJ_1982, RJ_1986 } from "@/data/perfis-pioneiras";
import { formatInt } from "@/lib/format-br";

export const Route = createFileRoute("/pioneiras/lelia-gonzalez")({
  head: () => ({
    meta: [
      { title: "Lélia Gonzalez · Pioneiras · Quem são elas?" },
      {
        name: "description",
        content:
          "Lélia Gonzalez disputou duas eleições no Rio de Janeiro e ficou suplente nas duas. Em 1986, teve quase o triplo de votos do deputado estadual eleito com menos votos.",
      },
      { property: "og:title", content: "Lélia Gonzalez: a pensadora que as urnas deixaram na suplência" },
      {
        property: "og:description",
        content:
          "Perfil com a votação oficial de Lélia Gonzalez em 1982 e 1986, recontada a partir dos arquivos do TSE.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeliaPage,
});

const n = formatInt;
const a = RJ_1982;
const b = RJ_1986;

function Fonte({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer" className="inline-block py-1.5 underline decoration-plum underline-offset-4">
        {children}
      </a>
    </li>
  );
}

type Linha = { rotulo: string; valor: number; destaque?: boolean };

function Barras({ titulo, linhas }: { titulo: string; linhas: Linha[] }) {
  const max = Math.max(...linhas.map((l) => l.valor));
  return (
    <>
      <figcaption className="font-display text-xl leading-snug text-ink">{titulo}</figcaption>
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
    </>
  );
}

function LeliaPage() {
  return (
    <PageShell breadcrumb={[{ label: "Pioneiras", to: "/pioneiras" }, { label: "Lélia Gonzalez" }]}>
      <PerfilHero
        fotoId="lelia-gonzalez"
        years="1935–1994"
        nome="Lélia Gonzalez"
        quemFoi="Filósofa, antropóloga e uma das fundadoras do Movimento Negro Unificado. Disputou duas eleições no Rio de Janeiro e ficou suplente nas duas."
        ancora={ANCORAS_PIONEIRAS["lelia-gonzalez"]!}
      />

      <SectionBlock
        id="eleicoes"
        kicker="As eleições"
        question="Duas campanhas, duas suplências"
        align="wide"
        lead={
          <p>
            Lélia concorreu em {a.data.slice(-4)}, a deputada federal pelo PT, e em {b.data.slice(-4)}, a
            deputada estadual pelo PDT, sempre no Rio de Janeiro. As bases do TSE dessas eleições não
            registram sexo nem cor/raça; os números abaixo vêm da votação nominal, candidatura por
            candidatura.
          </p>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <figure className="poster-frame p-5 md:p-6">
            <Barras
              titulo="1982 · deputada federal · PT, em votos"
              linhas={[
                { rotulo: "Lélia Gonzalez (PT)", valor: a.lelia.votos, destaque: true },
                { rotulo: `${a.partido.eleito.nome}, único eleito do PT`, valor: a.partido.eleito.votos },
                { rotulo: "Eleito com menos votos no estado", valor: a.menorVotacaoEleita },
                { rotulo: "Mediana de todas as candidaturas", valor: a.medianaGeral },
              ]}
            />
            <FichaGrafico
              ficha={{
                vendo:
                  "Votos nominais de Lélia comparados com o eleito do PT, o eleito com menos votos e a mediana da disputa para deputado federal no Rio.",
                contados: `As ${n(a.candidaturas)} candidaturas a deputado federal no Rio de Janeiro, para ${n(a.cadeiras)} cadeiras; a lista do PT tinha ${n(a.partido.candidaturas)}.`,
                denominador: "Cada barra é um número absoluto de votos.",
                data: `Eleição de ${a.data}.`,
                fonte: "TSE, Dados Abertos, Resultados 1982, Votação nominal por UF. Recontagem independente.",
                limitacao:
                  "A cadeira dependia da votação do partido. Ficar perto do eleito com menos votos do estado não garantia vaga.",
              }}
            />
          </figure>

          <figure className="poster-frame p-5 md:p-6">
            <Barras
              titulo="1986 · deputada estadual · PDT, em votos"
              linhas={[
                { rotulo: "Lélia Gonzalez (PDT)", valor: b.lelia.votos, destaque: true },
                { rotulo: "Eleito com menos votos na coligação dela", valor: b.coligacao.menorVotacaoEleita },
                { rotulo: "Eleito com menos votos no estado", valor: b.menorVotacaoEleita },
                { rotulo: "Mediana de todas as candidaturas", valor: b.medianaGeral },
              ]}
            />
            <FichaGrafico
              ficha={{
                vendo:
                  "Votos nominais de Lélia comparados com o último eleito da coligação dela, o eleito com menos votos no estado e a mediana da disputa para a Assembleia do Rio.",
                contados: `As ${n(b.candidaturas)} candidaturas a deputado estadual no Rio de Janeiro, para ${n(b.cadeiras)} cadeiras; a coligação dela tinha ${n(b.coligacao.candidaturas)}.`,
                denominador: "Cada barra é um número absoluto de votos.",
                data: `Eleição de ${b.data}.`,
                fonte: "TSE, Dados Abertos, Resultados 1986, Votação nominal por UF. Recontagem independente.",
                limitacao:
                  "A cadeira dependia da votação da coligação. Por isso a comparação mais justa é com o último eleito da própria coligação.",
              }}
            />
          </figure>
        </div>

        <ul className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-ink">
          <li>
            <strong>Em 1982, foi a segunda mais votada do PT no Rio.</strong> O partido lançou{" "}
            {n(a.partido.candidaturas)} nomes e elegeu {n(a.partido.eleitos)}, {a.partido.eleito.nome}, com{" "}
            {n(a.partido.eleito.votos)} votos. Lélia teve {n(a.lelia.votos)} e ficou na{" "}
            {a.posicaoGeral}ª posição entre {n(a.candidaturas)} candidaturas. O eleito com menos votos
            no estado teve {n(a.menorVotacaoEleita)}: faltaram a ela {n(a.menorVotacaoEleita - a.lelia.votos)}.
          </li>
          <li>
            <strong>Em 1986, teve quase o triplo do eleito com menos votos.</strong> Para a Assembleia,
            o último eleito do estado entrou com {n(b.menorVotacaoEleita)} votos, por uma coligação
            que fez só duas cadeiras. Lélia teve {n(b.lelia.votos)} e ficou de fora, porque concorria
            na coligação do PDT, a segunda que mais elegeu: {n(b.coligacao.candidaturas)} candidaturas
            e {n(b.coligacao.eleitos)} cadeiras, todas do PDT. Ali, o último eleito precisou de{" "}
            {n(b.coligacao.menorVotacaoEleita)} votos. Lélia foi a {b.partido.posicaoLelia}ª da lista.
          </li>
        </ul>

        <div className="mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
          <article className="border-t-2 border-dashed border-ink pt-4">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-ink">Interpretação editorial</p>
            <p className="mt-2 text-[17px] leading-relaxed text-ink">
              No sistema proporcional, a vaga depende de onde a candidata disputa. Numa lista forte,
              com muitos nomes bem votados, uma votação alta pode render só a suplência; numa lista que
              elege pouca gente, quem lidera leva a cadeira com bem menos votos.
            </p>
          </article>
          <article className="border-t-2 border-ink pt-4">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-ink">Hipótese em investigação</p>
            <p className="mt-2 text-[17px] leading-relaxed text-ink">
              A posição de uma mulher negra dentro da lista do partido pode pesar tanto quanto o total
              de votos que ela recebe. Para testar, falta comparar a posição de candidatas e
              candidatos negros nas listas das grandes legendas em 2026, que já registram cor/raça.
            </p>
          </article>
        </div>
      </SectionBlock>

      <SectionBlock id="quem-foi" kicker="Quem foi" question="De Belo Horizonte à Constituinte">
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-ink">
          Lélia de Almeida nasceu em Belo Horizonte, em 1935, penúltima de 18 irmãos. O pai, Accacio,
          era ferroviário e negro; a mãe, Orcinda, empregada doméstica de origem indígena. A família se
          mudou para o Rio em 1942. Lélia trabalhou como babá ainda menina e estudou no Colégio Pedro
          II. Formou-se em História e Geografia e depois em Filosofia na Universidade do Estado da
          Guanabara, hoje Uerj, e fez mestrado em Comunicação e doutorado em Antropologia. Em 1964,
          casou-se com o colega de faculdade Luiz Carlos Gonzalez, de quem ficou com o sobrenome.
        </p>
        <LinhaDoTempo
          itens={[
            {
              ano: "1976",
              titulo: "Cultura negra como objeto de estudo",
              texto:
                "Ajudou a criar o Instituto de Pesquisas das Culturas Negras (IPCN), no Rio, e deu no Parque Lage um dos primeiros cursos de cultura negra do país.",
            },
            {
              ano: "1978",
              titulo: "MNU e PUC-Rio",
              texto:
                "Esteve na fundação do Movimento Negro Unificado. No mesmo ano começou a dar aulas na PUC-Rio, onde ensinou Antropologia e Cultura Popular Brasileira até morrer e chefiou o departamento de Sociologia e Política.",
            },
            {
              ano: "1980",
              titulo: "Racismo e sexismo",
              texto:
                "Em outubro, apresentou num encontro da Anpocs o texto “Racismo e sexismo na cultura brasileira”, em que mostra como raça e gênero se combinam na vida das mulheres negras.",
            },
            {
              ano: "1982",
              titulo: "Lugar de negro e a primeira candidatura",
              texto: (
                <>
                  Publicou com o sociólogo Carlos Hasenbalg o livro <em>Lugar de negro</em>. Disputou
                  uma vaga de deputada federal pelo PT e teve {n(a.lelia.votos)} votos.
                </>
              ),
            },
            {
              ano: "1983",
              titulo: "Nzinga",
              texto: "Fundou o Nzinga, Coletivo de Mulheres Negras.",
            },
            {
              ano: "1985",
              titulo: "O Estado",
              texto:
                "Integrou o primeiro Conselho Nacional dos Direitos da Mulher e trabalhou com o movimento de mulheres junto à Assembleia Constituinte de 1987 e 1988.",
            },
            {
              ano: "1986",
              titulo: "A segunda candidatura",
              texto: `Disputou uma vaga de deputada estadual pelo PDT e teve ${n(b.lelia.votos)} votos. Os números estão no topo desta página.`,
            },
            {
              ano: "1988",
              titulo: "Amefricanidade",
              texto:
                "Formulou a categoria de amefricanidade, para nomear a experiência comum dos povos negros e indígenas nas Américas.",
            },
            {
              ano: "1994",
              titulo: "Morte e obra reunida",
              texto: (
                <>
                  Morreu no Rio de Janeiro em 10 de julho, aos 59 anos, de problemas
                  cardiorrespiratórios. Seus textos foram reunidos depois, e o livro{" "}
                  <em>Por um feminismo afro-latino-americano</em>, de 2020, levou sua obra a um público
                  novo.
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
        question="O que circula sobre Lélia, e o que o documento mostra"
      >
        <Conferencia
          itens={[
            {
              status: "Corrigido pelo TSE",
              circula: "“Candidata a deputada federal em 1982 e em 1986.”",
              documento: `Várias biografias dizem isso, inclusive em enciclopédias acadêmicas. O arquivo oficial do TSE registra outra coisa: em 1986, Lélia Gonzalez concorreu a deputada estadual, com ${n(b.lelia.votos)} votos. Não há candidatura dela a deputada federal em 1986 no arquivo do Rio de Janeiro.`,
            },
            {
              status: "Documento",
              circula: "O nome nas urnas.",
              documento:
                "Em 1982, ela aparece registrada como “Lélia de Almeida Gonzales”, com s; em 1986, como “Lélia de Almeida Gonzalez”, com z.",
            },
            {
              status: "A conferir",
              circula: "Nasceu em 1º de fevereiro de 1935.",
              documento:
                "As fontes que consultamos concordam no ano e apontam o dia. O perfil usa só o ano até conferirmos em documento.",
            },
            {
              status: "Fontes divergem",
              circula: "Mestrado e doutorado.",
              documento:
                "As biografias registram os dois títulos, mas divergem sobre instituições e datas. O perfil cita só as áreas.",
            },
          ]}
        />
      </SectionBlock>

      <PerfilNav atual="lelia-gonzalez" />

      <ComoSabemos
        fonte={
          <ul className="space-y-1">
            <Fonte href="https://dadosabertos.tse.jus.br/dataset/resultados-1982">
              TSE, Dados Abertos, Resultados 1982, Votação nominal por UF
            </Fonte>
            <Fonte href="https://dadosabertos.tse.jus.br/dataset/resultados-1986">
              TSE, Dados Abertos, Resultados 1986, Votação nominal por UF
            </Fonte>
            <Fonte href="https://prefeitura.pbh.gov.br/cultura/ric/personalidades-negras/lelia-gonzalez">
              Prefeitura de Belo Horizonte, Personalidades negras: Lélia Gonzalez
            </Fonte>
            <Fonte href="https://www.ea.fflch.usp.br/sites/ea.fflch.usp.br/files/inline-files/L%C3%A9lia%20Gonzalez.pdf">
              Juliana Bartholomeu, “Lélia Gonzalez”, Enciclopédia de Antropologia, USP, 2019
            </Fonte>
            <Fonte href="https://www.brasildefato.com.br/2018/02/01/intelectual-e-feminista-lelia-gonzalez-a-mulher-que-revolucionou-o-movimento-negro/">
              Brasil de Fato, 1º fev. 2018
            </Fonte>
            <Fonte href="https://www.marxists.org/portugues/gonzalez/1980/10/31.htm">
              Lélia Gonzalez, “Racismo e sexismo na cultura brasileira”, 1980
            </Fonte>
            <li>Alex Ratts e Flavia Rios, <em>Lélia Gonzalez</em>, Selo Negro, 2010.</li>
          </ul>
        }
        universo={`Eleições no Rio de Janeiro: ${n(a.candidaturas)} candidaturas a deputado federal em 1982 (${n(a.cadeiras)} cadeiras) e ${n(b.candidaturas)} a deputado estadual em 1986 (${n(b.cadeiras)} cadeiras).`}
        base={`Arquivos ${a.arquivo} (SHA-256 ${a.arquivoSha256}; pacote ${a.zipSha256}) e ${b.arquivo} (SHA-256 ${b.arquivoSha256}; pacote ${b.zipSha256}), conferidos em 30/10/2026.`}
        calculo={
          <>
            Recontagem da votação nominal, candidatura por candidatura, com o mesmo script usado no
            perfil da Pagu (scripts/pioneiras/votacao_historica.py). Em 1986, a coligação foi lida
            na coluna de composição do próprio arquivo.
          </>
        }
        limites={[
          "A trajetória é contada a partir de biografias e reportagens; onde as fontes divergem, o texto diz.",
          "As bases de 1982 e 1986 não registram sexo nem cor/raça; nenhum número aqui conta mulheres ou pessoas negras na disputa.",
          "A votação nominal não inclui os votos dados só à legenda do partido.",
        ]}
      />
    </PageShell>
  );
}
