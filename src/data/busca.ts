/**
 * busca — índice da busca do site (02/11/2026), montado no build a partir dos
 * mesmos arquivos de dados das páginas. Só dado público já publicado.
 */
import { ACHADOS } from "@/data/achados";
import { CANDIDATAS_MAJORITARIAS_2026 } from "@/data/candidatas-majoritarias-2026";
import { FALAS } from "@/data/falas";
import { PERFIS_PIONEIRAS } from "@/data/perfis-pioneiras";
import { REPORTAGENS } from "@/data/reportagens";
import { RESULT_2026_PARTIDOS } from "@/data/resultado-2026";
import { TEMAS } from "@/data/temas";
import { DEPUTADAS, VOTACOES } from "@/data/votacoes-camara";
import { ELEITAS_2026 } from "@/data/eleitas-2026";
import { CARGO_ROTULO, ELEITA_POR_CHAVE, chaveEleita } from "@/data/eleitas-cruzamentos";

export type TipoResultado = "Página" | "Tema" | "Reportagem" | "Achado" | "Fala" | "Votação" | "Pessoa" | "Partido" | "Estado";

export type ItemBusca = {
  tipo: TipoResultado;
  titulo: string;
  sub: string;
  to: string;
  hash?: string;
  /** termos extras que ajudam a achar, sem aparecer na tela */
  extra?: string;
};

const UF: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará", DF: "Distrito Federal",
  ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul",
  MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí",
  RJ: "Rio de Janeiro", RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima",
  SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
};

const PAGINAS: ItemBusca[] = [
  ["/quem-chega", "Quem chega", "As eleitas, casa por casa", "eleitas cadeiras resultado senado camara governadoras"],
  ["/quem-sao-elas", "Quem são elas?", "As candidatas por cor/raça e cargo", "candidatas cor raça vice suplente"],
  ["/partidos", "Partido por partido", "Eleitas, fundo e votações por sigla", "partidos siglas"],
  ["/votos", "Na urna", "Candidatura, voto e cadeira", "votos votação nominal"],
  ["/dinheiro", "Dinheiro", "Receita, fundo eleitoral, gasto e vaquinhas", "fundo eleitoral fefc receita financiamento"],
  ["/historico", "Histórico", "A série desde 2014", "série histórica 2014 2018 2022"],
  ["/funil", "O funil", "Da candidatura ao poder", "etapas"],
  ["/quem-controla", "Quem controla?", "As decisões dos partidos", "partidos listas"],
  ["/barreiras", "Barreiras", "Violência política e contra mulheres", "violência política gênero processos"],
  ["/como-votaram", "Como votaram", "Seis votações, deputada por deputada", "votações plenário câmara matriz"],
  ["/na-voz-delas", "Na voz delas", "O que disseram, com o dado ao lado", "falas discursos feminismo antifeminista"],
  ["/pioneiras", "Pioneiras", "Quem abriu o caminho", "perfis história"],
  ["/achados", "Achados", "Notas curtas e datadas", ""],
  ["/direitos", "Direitos", "Os marcos de 1932 a 2026", "lei voto cota emenda"],
  ["/em-disputa", "Em disputa", "Regras e projetos em tramitação", "projetos de lei"],
  ["/metodo", "Método", "Fontes, fórmulas, versões e correções", "metodologia fontes correções sha-256"],
  ["/downloads", "Downloads", "Bases e materiais para baixar", "csv dados abertos"],
  ["/sobre", "Sobre", "Quem faz o observatório", "contato"],
].map(([to, titulo, sub, extra]) => ({ tipo: "Página" as const, to: to!, titulo: titulo!, sub: sub!, extra: extra ?? "" }));

const CARGO: Record<string, string> = { presidencia: "Presidência", governo: "governo estadual", senado: "Senado" };

export const INDICE_BUSCA: readonly ItemBusca[] = [
  ...PAGINAS,
  ...TEMAS.map((t) => ({ tipo: "Tema" as const, titulo: t.nome, sub: t.linha, to: `/temas/${t.slug}` })),
  ...REPORTAGENS.map((r) => ({ tipo: "Reportagem" as const, titulo: r.titulo, sub: r.linhaFina, to: r.to, extra: r.tema })),
  ...ACHADOS.map((a) => ({
    tipo: "Achado" as const,
    titulo: a.titulo,
    sub: a.texto,
    to: "/achados",
    hash: `achado-${a.id}`,
  })),
  ...FALAS.filter((f) => f.publicar).map((f) => ({
    tipo: "Fala" as const,
    titulo: `${f.pessoa} (${f.partido})`,
    sub: `“${f.fala.split(" [...]")[0]}” · ${f.data}`,
    to: "/na-voz-delas",
    hash: f.id,
    extra: f.contexto,
  })),
  ...VOTACOES.map((v) => ({
    tipo: "Votação" as const,
    titulo: v.titulo,
    sub: `${v.proposicao} · Sim = ${v.sim}`,
    to: "/como-votaram",
    extra: v.bloco,
  })),
  ...ELEITAS_2026.map((e) => ({
    tipo: "Pessoa" as const,
    titulo: e.nome,
    sub: `Eleita ${CARGO_ROTULO[e.cargo]} em 2026 · ${e.partido}-${e.uf}`,
    to: `/eleitas/${e.slug}`,
    extra: `${UF[e.uf] ?? ""} ${e.partido} eleita`,
  })),
  ...DEPUTADAS.filter((d) => !ELEITA_POR_CHAVE.has(chaveEleita(d.nome, d.uf))).map((d) => {
    const partido = Object.values(d.votos).at(-1)?.partido ?? "";
    return {
      tipo: "Pessoa" as const,
      titulo: d.nome,
      sub: `Deputada federal (${partido}-${d.uf}) · em 2026: ${d.desfecho2026}`,
      to: "/como-votaram",
      hash: "deputadas",
      extra: `${UF[d.uf] ?? ""} ${partido}`,
    };
  }),
  ...CANDIDATAS_MAJORITARIAS_2026.filter(([nome, , uf]) => !ELEITA_POR_CHAVE.has(chaveEleita(nome, uf))).map(([nome, cargo, uf, partido]) => ({
    tipo: "Pessoa" as const,
    titulo: nome,
    sub: `Candidata em 2026 · ${CARGO[cargo] ?? cargo}${uf !== "BR" ? ` · ${uf}` : ""} · ${partido}`,
    to: "/quem-sao-elas",
    hash: "elas",
    extra: `${UF[uf] ?? ""} ${partido}`,
  })),
  ...PERFIS_PIONEIRAS.filter((p) => p.to).map((p) => ({
    tipo: "Pessoa" as const,
    titulo: p.name,
    sub: `Pioneiras · ${p.linhaFina}`,
    to: p.to!,
  })),
  ...Object.keys(RESULT_2026_PARTIDOS.electedByParty).map((p) => ({
    tipo: "Partido" as const,
    titulo: p,
    sub: "Eleitas, fundo eleitoral e votações da sigla",
    to: "/partidos",
  })),
  ...Object.entries(UF).map(([sigla, nome]) => ({
    tipo: "Estado" as const,
    titulo: nome,
    sub: `${sigla} · candidatas, partidos e eleitas no estado`,
    to: "/quem-sao-elas",
    hash: "estados",
    extra: sigla,
  })),
];

export const normaliza = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export function busca(q: string, limite = 60): ItemBusca[] {
  const termos = normaliza(q).split(/\s+/).filter((t) => t.length > 1);
  if (!termos.length) return [];
  const pontos = (it: ItemBusca) => {
    const titulo = normaliza(it.titulo);
    const resto = normaliza(`${it.sub} ${it.extra ?? ""}`);
    let p = 0;
    for (const t of termos) {
      // termos curtos (siglas como PL, PT, SP) só batem como palavra inteira
      const bate = (s: string) =>
        t.length <= 3 ? new RegExp(`(^|[^a-z0-9])${t}([^a-z0-9]|$)`).test(s) : s.includes(t);
      if (bate(titulo)) p += titulo.startsWith(t) ? 3 : 2;
      else if (bate(resto)) p += 1;
      else return 0;
    }
    return p;
  };
  return INDICE_BUSCA.map((it) => ({ it, p: pontos(it) }))
    .filter((x) => x.p > 0)
    .sort((a, b) => b.p - a.p)
    .slice(0, limite)
    .map((x) => x.it);
}
