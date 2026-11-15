import type { ReactNode } from "react";
import { Hemiciclo } from "@/components/editorial/Hemiciclo";
import { CAMARA_FUNIL } from "@/data/manchetes";
import { RESULT_2026_META, RESULT_2026_PROPORCIONAL } from "@/data/resultado-2026";
import { RIGHTS_TIMELINE } from "@/data/rights-timeline";
import { SENADO_2027, SENADO_2027_META } from "@/data/senado-2027";
import type { TemaSlug } from "@/data/temas";
import { VPG, VPG_META } from "@/data/violencia-2026";
import { DINHEIRO_REELEICAO, VOTACOES } from "@/data/votacoes-camara";
import { formatInt as n, formatPct } from "@/lib/format-br";

/**
 * ObjetoTema — o número-objeto que abre cada tema (12/11/2026).
 *
 * Um dado desenhado como coisa contável: cada ponto é uma cadeira, cada
 * quadrado é uma pessoa, cada folha é um processo. Nada é arredondado para
 * caber no desenho: o número de marcas é o número do dado. Os objetos são
 * pensados para fundo roxo escuro. Laranja marca só o dado de agora (2026 e
 * a composição que começa em 2027); o resto fica em tons claros.
 */
export type Objeto = {
  /** frase-manchete do objeto: o que se vê, dito com o número */
  frase: string;
  figura: ReactNode;
  /** como ler o desenho */
  comoLer: string;
  fonte: string;
  link: { to: string; hash?: string; label: string };
};

function Quadrados({
  total,
  grupos,
  rotulo,
  colunas = 20,
}: {
  total: number;
  grupos: { n: number; className: string }[];
  rotulo: string;
  colunas?: number;
}) {
  const cls: string[] = [];
  grupos.forEach((g) => {
    for (let i = 0; i < g.n; i++) cls.push(g.className);
  });
  while (cls.length < total) cls.push("border border-cream/50");
  return (
    <div
      role="img"
      aria-label={rotulo}
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}
    >
      {cls.map((c, i) => (
        <span key={i} className={`aspect-square ${c}`} />
      ))}
    </div>
  );
}

function presenca(): Objeto {
  const f = CAMARA_FUNIL;
  const etapas = [
    { rotulo: "das candidaturas", valor: f.candidaturas },
    { rotulo: "dos votos", valor: f.votos },
    { rotulo: "das cadeiras", valor: f.cadeiras },
  ];
  return {
    frase: `${n(f.eleitas)} das ${n(f.vagas)} cadeiras da Câmara ficaram com mulheres.`,
    figura: (
      <div>
        <Hemiciclo
          total={f.vagas}
          destaque={f.eleitas}
          corDestaque="fill-coral"
          corResto="fill-cream/25"
          titulo={`Plenário da Câmara com ${n(f.vagas)} cadeiras; ${n(f.eleitas)} ocupadas por mulheres a partir de 2027`}
        />
        <ol className="mt-6 grid grid-cols-3 gap-3 border-t border-cream/25 pt-4">
          {etapas.map((e, i) => (
            <li key={e.rotulo}>
              <span
                className={`poster-figure block text-3xl md:text-4xl ${i === 2 ? "text-coral" : "text-paper"}`}
              >
                {formatPct(e.valor)}
              </span>
              <span className="mt-1 block text-[14px] leading-snug text-cream/85">{e.rotulo}</span>
            </li>
          ))}
        </ol>
      </div>
    ),
    comoLer:
      "Cada ponto é uma cadeira da Câmara. Em laranja, as ocupadas por mulheres a partir de 2027. Embaixo, a fatia de mulheres em cada etapa da disputa.",
    fonte: `TSE, candidaturas, votação e resultado de 2026, base de ${RESULT_2026_META.baseGeneratedAt.split(" ")[0]}. Recontagem própria.`,
    link: { to: "/votos", label: "Candidatura, voto e cadeira" },
  };
}

function dinheiro(): Objeto {
  const F = DINHEIRO_REELEICAO.F.porFaixa;
  const linhas = [
    { rotulo: "Terço de maior receita", ...F["terço de maior receita"] },
    { rotulo: "Terço do meio", ...F["terço do meio"] },
    { rotulo: "Terço de menor receita", ...F["terço de menor receita"] },
  ];
  const alta = F["terço de maior receita"];
  const baixa = F["terço de menor receita"];
  return {
    frase: `Entre as deputadas que tentaram voltar, ${n(alta.eleitos)} de ${n(alta.total)} das que mais arrecadaram se reelegeram. Entre as que menos arrecadaram, ${n(baixa.eleitos)} de ${n(baixa.total)}.`,
    figura: (
      <div className="space-y-5">
        {linhas.map((l) => (
          <div key={l.rotulo}>
            <p className="mb-2 flex items-baseline justify-between gap-3 text-[14px] text-cream/90">
              <span>{l.rotulo}</span>
              <span className="font-mono tabular-nums">
                {n(l.eleitos)} de {n(l.total)}
              </span>
            </p>
            <Quadrados
              total={l.total}
              grupos={[{ n: l.eleitos, className: "bg-coral" }]}
              rotulo={`${l.rotulo}: ${n(l.eleitos)} reeleitas de ${n(l.total)}`}
            />
          </div>
        ))}
      </div>
    ),
    comoLer:
      "Cada quadrado é uma deputada federal que tentou a reeleição em 2026, separadas em três grupos pela receita de campanha. Em laranja, as reeleitas.",
    fonte: `TSE, prestação de contas final do 1º turno, base de ${DINHEIRO_REELEICAO.base}, e resultado de 2026. Recontagem própria.`,
    link: { to: "/como-votaram", label: "Receita e reeleição, na reportagem" },
  };
}

function agenda(): Objeto {
  const v = VOTACOES.find((x) => x.id === "2351179-51")!;
  const F = v.porSexo.F;
  const nao = F.votos["Não"] ?? 0;
  const sim = F.votos["Sim"] ?? 0;
  const outros = F.total - nao - sim;
  return {
    frase: `Em ${v.data.slice(0, 4)}, ${n(nao)} deputadas votaram contra a lei de igualdade salarial entre mulheres e homens.`,
    figura: (
      <div>
        <Quadrados
          total={F.total}
          colunas={15}
          grupos={[
            { n: nao, className: "bg-paper" },
            { n: sim, className: "bg-cream/30" },
          ]}
          rotulo={`${n(F.total)} deputadas em exercício: ${n(nao)} votaram não, ${n(sim)} votaram sim, ${n(outros)} não votaram`}
        />
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-cream/90">
          <li className="flex items-center gap-2">
            <span className="size-3.5 bg-paper" aria-hidden="true" /> não: {n(nao)}
          </li>
          <li className="flex items-center gap-2">
            <span className="size-3.5 bg-cream/30" aria-hidden="true" /> sim: {n(sim)}
          </li>
          <li className="flex items-center gap-2">
            <span className="size-3.5 border border-cream/50" aria-hidden="true" /> ausentes:{" "}
            {n(outros)}
          </li>
        </ul>
      </div>
    ),
    comoLer: `Cada quadrado é uma das ${n(F.total)} deputadas em exercício na votação do ${v.proposicao}, em ${v.data.split("-").reverse().join("/")}.`,
    fonte: "Câmara dos Deputados, Dados Abertos, votações nominais.",
    link: { to: "/como-votaram", label: "As seis votações, deputada por deputada" },
  };
}

function poder(): Objeto {
  const total = SENADO_2027.length;
  const mulheres = SENADO_2027.filter((c) => c.genero === "F").length;
  return {
    frase: `O Senado começa 2027 com ${n(mulheres)} mulheres em ${n(total)} cadeiras.`,
    figura: (
      <Hemiciclo
        total={total}
        destaque={mulheres}
        linhas={5}
        corDestaque="fill-coral"
        corResto="fill-cream/25"
        titulo={`Senado de 2027 com ${n(total)} cadeiras; ${n(mulheres)} ocupadas por mulheres`}
      />
    ),
    comoLer: `Cada ponto é uma cadeira do Senado a partir de 2027 (as eleitas em 2026 e as que seguem no mandato). Hoje são ${n(SENADO_2027_META.hoje.mulheres)} senadoras.`,
    fonte: `Senado Federal, consulta em ${SENADO_2027_META.consultaSenado}; TSE, resultado de 2026.`,
    link: { to: "/quem-chega", hash: "senado", label: "O Senado de 2027, cadeira por cadeira" },
  };
}

function violencia(): Objeto {
  // 2018 entra para responder "e a eleição de 2018?": o crime só passou a
  // existir em agosto de 2021 (Lei 14.192), então não há processo a contar.
  const anos = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"].map((ano) => ({
    ano,
    processos: VPG.porAno.find((p) => p.ano === ano)?.processos ?? null,
    vazio: ano === "2018" ? "não era crime" : "sem dado",
  }));
  const max = Math.max(...VPG.porAno.map((p) => p.processos));
  const ultimo = VPG.porAno[VPG.porAno.length - 1]!;
  return {
    frase: `${n(ultimo.processos)} processos de violência política de gênero foram abertos na Justiça Eleitoral em ${ultimo.ano}. Na eleição geral anterior, em 2022, foram ${n(VPG.porAno.find((p) => p.ano === "2022")!.processos)}. Em 2018, a violência política de gênero ainda não era crime.`,
    figura: (
      <div
        role="img"
        aria-label={`Processos por ano de autuação: ${VPG.porAno.map((p) => `${p.ano}, ${p.processos}`).join("; ")}. Em 2018 a violência política de gênero não era crime; 2020 e 2021 não aparecem no painel.`}
      >
        <div className="flex h-64 items-end gap-2 md:h-80 md:gap-4">
          {anos.map((a) => (
            <div key={a.ano} className="flex h-full flex-1 flex-col items-center justify-end">
              {a.processos === null ? (
                <span className="mb-2 text-center text-[13px] leading-tight text-cream/70">
                  {a.vazio}
                </span>
              ) : (
                <>
                  <span
                    className={`mb-1 font-mono text-[13px] tabular-nums ${a.ano === "2026" ? "text-coral" : "text-paper"}`}
                  >
                    {n(a.processos)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`block w-full max-w-14 ${a.ano === "2026" ? "folhas-coral" : "folhas"}`}
                    style={{ height: `${(a.processos / max) * 100}%`, minHeight: "3px" }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2 border-t border-cream/40 pt-2 md:gap-4">
          {anos.map((a) => (
            <span key={a.ano} className="flex-1 text-center font-mono text-[13px] text-cream/85">
              {a.ano}
            </span>
          ))}
        </div>
      </div>
    ),
    comoLer:
      "Cada pilha junta os processos autuados no ano, como uma pilha de folhas. A violência política de gênero virou crime em agosto de 2021 (Lei 14.192): em 2018, ano da eleição geral anterior, a violência existia, mas não havia crime com esse nome para processar. Quem contou os casos antes da lei foram organizações como a Justiça Global e a Terra de Direitos, com método próprio. O painel registra 2 processos em 2019 sem explicar a origem, e não mostra 2020 nem 2021; o desenho deixa os buracos à mostra. A comparação justa é entre eleições gerais: 15 em 2022, 224 em 2026.",
    fonte: `${VPG_META.fonte}. Extraído em ${VPG_META.extraidoEm}.`,
    link: { to: "/barreiras", label: "Violência política, os dados completos" },
  };
}

function memoria(): Objeto {
  const anos = RIGHTS_TIMELINE.map((m) => Number(m.year));
  const ini = anos[0]!;
  const fim = anos[anos.length - 1]!;
  // o maior intervalo sem nenhum marco
  let gapIni = ini;
  let gapFim = ini;
  for (let i = 1; i < anos.length; i++) {
    if (anos[i]! - anos[i - 1]! > gapFim - gapIni) {
      gapIni = anos[i - 1]!;
      gapFim = anos[i]!;
    }
  }
  const pos = (a: number) => 4 + ((a - ini) / (fim - ini)) * 92;
  const rotulados = [ini, gapIni, gapFim, fim];
  return {
    frase: `${n(RIGHTS_TIMELINE.length)} marcos desde ${ini}. Entre ${gapIni} e ${gapFim}, ${n(gapFim - gapIni)} anos sem nenhum.`,
    figura: (
      <div
        role="img"
        aria-label={`Linha do tempo com ${RIGHTS_TIMELINE.length} marcos, de ${ini} a ${fim}: ${RIGHTS_TIMELINE.map((m) => m.year).join(", ")}. Nenhum marco entre ${gapIni} e ${gapFim}.`}
      >
        <div className="relative h-36">
          <span className="absolute inset-x-0 top-1/2 h-px bg-cream/50" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute top-1/2 h-10 -translate-y-1/2 border-x border-dashed border-cream/50"
            style={{ left: `${pos(gapIni)}%`, width: `${pos(gapFim) - pos(gapIni)}%` }}
          />
          <span
            className="absolute top-[18%] -translate-x-1/2 whitespace-nowrap font-display text-lg italic text-cream/90 md:text-xl"
            style={{ left: `${(pos(gapIni) + pos(gapFim)) / 2}%` }}
          >
            {n(gapFim - gapIni)} anos
          </span>
          {RIGHTS_TIMELINE.map((m, i) => (
            <span
              key={`${m.year}-${i}`}
              aria-hidden="true"
              className={`absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-plum-deep ${Number(m.year) >= 2026 ? "bg-coral" : "bg-paper"}`}
              style={{ left: `${pos(Number(m.year))}%` }}
            />
          ))}
          {rotulados.map((a) => (
            <span
              key={a}
              aria-hidden="true"
              className={`absolute top-[70%] -translate-x-1/2 font-mono text-[13px] ${a === fim ? "text-coral" : "text-paper"}`}
              style={{ left: `${pos(a)}%` }}
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    ),
    comoLer:
      "Cada ponto é uma lei, decisão ou emenda que mudou o acesso das mulheres às urnas e ao dinheiro de campanha, na posição do ano em que passou a valer.",
    fonte:
      "Legislação federal e decisões do TSE e do STF, com o documento de cada marco na página Direitos.",
    link: { to: "/direitos", label: "Os marcos, um por um" },
  };
}

export const OBJETOS: Record<TemaSlug, () => Objeto> = {
  presenca,
  dinheiro,
  agenda,
  poder,
  violencia,
  memoria,
};

export function ObjetoFigura({ slug, compacto = false }: { slug: TemaSlug; compacto?: boolean }) {
  const o = OBJETOS[slug]();
  return (
    <figure>
      <div className={compacto ? "" : "md:px-2"}>{o.figura}</div>
      <figcaption className="mt-5 text-[14px] leading-relaxed text-cream/85">
        {o.comoLer}
        <span className="mt-2 block text-[13px] text-cream/70">{o.fonte}</span>
      </figcaption>
    </figure>
  );
}
