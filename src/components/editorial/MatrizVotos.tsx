import { useState } from "react";
import { ChartFrame } from "@/components/editorial/ChartFrame";
import { DEPUTADAS, VOTACOES, VOTACOES_META } from "@/data/votacoes-camara";
import { formatInt as n } from "@/lib/format-br";

/**
 * Matriz de votação (02/11/2026): seis faixas, uma por votação; cada quadrado é
 * uma deputada, sempre na mesma posição em todas as faixas, para o padrão
 * aparecer de cima a baixo. Ordem: partido (do maior para o menor), depois nome.
 *
 * Voto marcado por forma e preenchimento, nunca só por cor:
 *  - Sim: quadrado roxo cheio
 *  - Não: quadrado vazado com borda escura
 *  - Abstenção ou obstrução: meio preenchido
 *  - Ausente (em exercício, sem voto): ponto cinza
 *  - Fora do mandato na data: lugar vazio tracejado
 * Cor sem juízo de valor: "Sim" significa coisas diferentes em cada votação,
 * e o que significa está escrito em cada faixa.
 */

const CURTO: Record<string, string> = {
  "2351179-51": "Igualdade salarial",
  "2352476-149": "Anistia às cotas",
  "345311-270": "Marco temporal",
  "2358548-89": "Dosimetria do 8 de janeiro",
  "2270800-160": "PEC das prerrogativas",
  "2482078-57": "Norma do Conanda",
};

type Dep = (typeof DEPUTADAS)[number];

const partidoDe = (d: Dep) =>
  VOTACOES.map((v) => d.votos[v.id])
    .filter(Boolean)
    .at(-1)?.partido ?? "";

const dataBR = (iso: string) => iso.split("-").reverse().join("/");

function Celula({ voto, apagada, titulo }: { voto: string | undefined; apagada: boolean; titulo: string }) {
  const base = "block h-[14px] w-[14px] box-border";
  let cls = "";
  let style: React.CSSProperties | undefined;
  if (!voto) cls = "border border-dashed border-rule";
  else if (voto === "Sim") cls = "bg-plum";
  else if (voto === "Não") cls = "border-2 border-ink bg-paper";
  else if (voto === "Abstenção" || voto === "Obstrução") {
    cls = "border border-plum";
    style = { background: "linear-gradient(135deg, var(--color-plum) 50%, transparent 50%)" };
  } else if (voto === "Ausente") {
    cls = "flex items-center justify-center";
  } else cls = "border border-rule";
  return (
    <span title={titulo} className={`${base} ${cls} ${apagada ? "opacity-20" : ""}`} style={style}>
      {voto === "Ausente" ? <span className="block h-1 w-1 rounded-full bg-muted-foreground" /> : null}
    </span>
  );
}

export function MatrizVotos() {
  const contagem = new Map<string, number>();
  for (const d of DEPUTADAS) contagem.set(partidoDe(d), (contagem.get(partidoDe(d)) ?? 0) + 1);
  const partidos = [...contagem.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const ordem = partidos.map(([p]) => p);
  const linhas = [...DEPUTADAS].sort(
    (a, b) => ordem.indexOf(partidoDe(a)) - ordem.indexOf(partidoDe(b)) || a.nome.localeCompare(b.nome),
  );
  const [foco, setFoco] = useState("");

  const chip = (ativo: boolean) =>
    `min-h-10 border px-3 py-1 text-[13px] font-semibold ${ativo ? "border-ink bg-ink text-cream" : "border-rule bg-card text-ink hover:border-ink"}`;

  return (
    <ChartFrame
      eyebrow="Matriz de votação · deputadas"
      title="Em cada votação, cada quadrado é uma deputada, sempre no mesmo lugar"
      ariaLabel="Matriz com o voto de cada deputada nas seis votações"
      legend={
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-ink/80">
          <li className="flex items-center gap-1.5"><Celula voto="Sim" apagada={false} titulo="" /> Sim</li>
          <li className="flex items-center gap-1.5"><Celula voto="Não" apagada={false} titulo="" /> Não</li>
          <li className="flex items-center gap-1.5"><Celula voto="Abstenção" apagada={false} titulo="" /> Abstenção ou obstrução</li>
          <li className="flex items-center gap-1.5"><Celula voto="Ausente" apagada={false} titulo="" /> Ausente</li>
          <li className="flex items-center gap-1.5"><Celula voto={undefined} apagada={false} titulo="" /> Fora do mandato na data</li>
        </ul>
      }
      ficha={{
        vendo: "O voto nominal de cada deputada em seis votações de mérito no plenário da Câmara. A posição de cada quadrado é a mesma em todas as faixas.",
        contados: `As ${n(DEPUTADAS.length)} deputadas que estavam em exercício em ao menos uma das seis datas. A presidente da sessão não vota e aparece como fora da contagem.`,
        denominador: "Cada faixa conta só quem estava em exercício naquela data.",
        data: VOTACOES_META.coletaEm,
        fonte: VOTACOES_META.fonte,
        limitacao: "Sim e Não têm sentidos diferentes em cada votação; o que cada um significa está escrito em cada faixa. O partido é o da data do voto. A matriz descreve votos; não mede efeito do voto na eleição.",
      }}
    >
      <div className="px-5 py-5 md:px-6">
        <p className="sr-only">
          Para ler voto a voto, use a tabela Deputada por deputada, logo abaixo, que traz os mesmos dados em texto.
        </p>
        <label className="flex flex-col gap-1 text-[13px] font-semibold text-ink md:hidden">
          Destacar um partido
          <select
            value={foco}
            onChange={(e) => setFoco(e.target.value)}
            className="min-h-11 border border-rule bg-card px-3 text-[15px] font-normal text-ink"
          >
            <option value="">Todos os partidos</option>
            {partidos.map(([p, c]) => (
              <option key={p} value={p}>
                {p} ({n(c)})
              </option>
            ))}
          </select>
        </label>
        <div className="hidden flex-wrap gap-2 md:flex" role="group" aria-label="Destacar um partido">
          <button type="button" className={chip(!foco)} aria-pressed={!foco} onClick={() => setFoco("")}>
            Todos
          </button>
          {partidos.map(([p, c]) => (
            <button key={p} type="button" className={chip(foco === p)} aria-pressed={foco === p} onClick={() => setFoco(p)}>
              {p} ({n(c)})
            </button>
          ))}
        </div>
        <ol className="mt-6 space-y-6" aria-hidden="true">
          {VOTACOES.map((v) => {
            const emExercicio = linhas.filter((d) => d.votos[v.id] && d.votos[v.id]?.voto !== "Presidência da sessão");
            const sim = emExercicio.filter((d) => d.votos[v.id]?.voto === "Sim").length;
            const nao = emExercicio.filter((d) => d.votos[v.id]?.voto === "Não").length;
            return (
              <li key={v.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-display text-lg leading-snug text-ink">
                    {CURTO[v.id] ?? v.titulo}{" "}
                    <span className="font-mono text-[13px] text-muted-foreground">{dataBR(v.data)}</span>
                  </p>
                  <p className="font-mono text-[13px] text-ink/80">
                    {n(sim)} sim · {n(nao)} não
                  </p>
                </div>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground">Sim = {v.sim}.</p>
                <div className="mt-2 grid gap-[3px]" style={{ gridTemplateColumns: "repeat(auto-fill, 14px)" }}>
                  {linhas.map((d) => {
                    const x = d.votos[v.id];
                    const voto = x?.voto === "Presidência da sessão" ? undefined : x?.voto;
                    return (
                      <Celula
                        key={d.nome}
                        voto={voto}
                        apagada={Boolean(foco) && partidoDe(d) !== foco}
                        titulo={`${d.nome} (${x?.partido ?? partidoDe(d)}-${d.uf}): ${x?.voto ?? "fora do mandato"}`}
                      />
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </ChartFrame>
  );
}
