// Contagem de visitas com GoatCounter (https://www.goatcounter.com).
//
// Por que GoatCounter: grátis para projetos sem fins lucrativos, não usa
// cookies e não guarda dado pessoal, então dispensa banner de consentimento
// (LGPD). Conta só o site publicado em quemsaoelas.com.br: o preview do
// Lovable e o ambiente local ficam de fora para não poluir os números.
//
// O site navega entre páginas sem recarregar (React), então a contagem
// automática do script fica desligada (`no_onload`) e cada troca de página
// é registrada a partir do __root.tsx com `trackPageview`.

const GOATCOUNTER_ENDPOINT = "https://quemsaoelas.goatcounter.com/count";
const SCRIPT_SRC = "https://gc.zgo.at/count.js";
const PRODUCTION_HOSTS = new Set(["quemsaoelas.com.br", "www.quemsaoelas.com.br"]);

type GoatCounter = {
  count?: (vars: { path: string; title?: string; referrer?: string }) => void;
  no_onload?: boolean;
};

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

let loading = false;
const pending: string[] = [];

function isProduction(): boolean {
  return typeof window !== "undefined" && PRODUCTION_HOSTS.has(window.location.hostname);
}

function send(path: string) {
  try {
    window.goatcounter?.count?.({ path });
  } catch {
    // Falha de contagem nunca pode quebrar a página.
  }
}

function load() {
  if (loading) return;
  loading = true;
  window.goatcounter = { ...(window.goatcounter ?? {}), no_onload: true };
  const script = document.createElement("script");
  script.async = true;
  script.src = SCRIPT_SRC;
  script.setAttribute("data-goatcounter", GOATCOUNTER_ENDPOINT);
  script.setAttribute("data-goatcounter-settings", JSON.stringify({ no_onload: true }));
  script.onload = () => {
    while (pending.length) send(pending.shift()!);
  };
  document.head.appendChild(script);
}

export function trackPageview(path: string) {
  if (!isProduction()) return;
  if (window.goatcounter?.count) {
    send(path);
    return;
  }
  pending.push(path);
  load();
}
