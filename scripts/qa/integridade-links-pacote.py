#!/usr/bin/env python3
"""Auditoria do pacote estático: href, fragmentos e mídias locais.

Fonte: HTML pré-renderizado (inclui fichas e variantes), não DOM após interações.
Confere presença dos arquivos; não confere HTTP de sites externos.
"""
import json
from collections import Counter, defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote

DIST = Path("dist/client")
OUT = Path("relatorios-integridade-links")
OUT.mkdir(exist_ok=True)
ROOT = "https://quemsaoelas.com.br"
DOMINIOS_LOCAIS = {"quemsaoelas.com.br", "www.quemsaoelas.com.br"}
MIDIAS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico", ".pdf", ".csv", ".json", ".xml", ".txt", ".webmanifest", ".woff", ".woff2"}

class H(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
        self.midia = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.add(a["id"])
        if tag == "a" and a.get("href") is not None:
            self.links.append(a["href"])
        if tag in {"img", "source", "video", "audio"}:
            for k in ("src", "poster"):
                if a.get(k):
                    self.midia.append(a[k])
            if a.get("srcset"):
                # Não inclui data-uri, que é mantida fora do teste.
                self.midia += [x.strip().split()[0] for x in a["srcset"].split(",") if x.strip() and not x.strip().startswith("data:")]

def origin_of(file):
    rel = file.relative_to(DIST)
    if rel.name == "index.html":
        rel = rel.parent
    return "/" if rel == Path(".") else "/" + rel.as_posix().rstrip("/")

def target_of(raw, origin):
    if not raw or raw == "#":
        return None, "placeholder"
    if raw.startswith(("mailto:", "tel:", "sms:", "data:", "blob:", "javascript:")):
        return None, "special"
    absolute = urljoin(ROOT + origin.rstrip("/") + "/", raw)
    uri = urlsplit(absolute)
    if uri.netloc.lower() not in DOMINIOS_LOCAIS:
        return None, "external"
    return (unquote(uri.path), unquote(uri.fragment)), "internal"

def resolve_path(urlpath):
    if not urlpath or urlpath == "/":
        return DIST / "index.html"
    plain = urlpath.lstrip("/")
    candidate = DIST / plain
    if candidate.is_file():
        return candidate
    return candidate / "index.html"

all_docs = {}
for file in sorted(DIST.rglob("index.html")):
    parser=H()
    parser.feed(file.read_text("utf-8", errors="replace"))
    all_docs[origin_of(file)] = (file, parser)

errors=[]
warnings=[]
counts=Counter()
for origin, (file, page) in all_docs.items():
    for raw in page.links:
        target, kind = target_of(raw, origin)
        counts["links_"+kind] += 1
        if target is None:
            if kind == "placeholder":
                warnings.append({"kind":"placeholder","source":origin,"href":raw})
            continue
        path,fragment = target
        dest = resolve_path(path)
        if not dest.is_file():
            errors.append({"kind":"internal_link_404","source":origin,"href":raw,"target":path})
            continue
        counts["internal_valid"] += 1
        if fragment:
            target_url = (path or "/").rstrip("/") or "/"
            if target_url in all_docs and fragment not in all_docs[target_url][1].ids:
                warnings.append({"kind":"missing_ssr_fragment","source":origin,"href":raw,"target":target_url,"fragment":fragment})
    for raw in page.midia:
        target,kind=target_of(raw, origin)
        counts["media_"+kind]+=1
        if target is None:continue
        path,_=target
        dest=resolve_path(path)
        if not dest.is_file():
            errors.append({"kind":"missing_media","source":origin,"src":raw,"target":path})
        else:
            counts["media_valid"]+=1

# Um arquivo com reprodução ainda pendente não pode ser servido por URL
# mesmo quando o componente editorial não o exibe.
blocked=[
    "fotos/pagu-patricia-galvao-anos-1920.jpg",
    "fotos/lelia-gonzalez-cezar-loureiro-referencia.jpg",
    "documentos/tse-candidatos-2026-portal.png",
]
for path in blocked:
    if (DIST/path).exists():
        errors.append({"kind":"restricted_media_in_public_package","target":path})
    else:
        counts["restricted_media_excluded"]+=1

# Relatório mantém até milhares de ocorrências, e um resumo compacto.
unique=defaultdict(set)
for e in errors:
    unique[e["kind"]].add(e.get("target", e.get("href", "?")))
summary={
    "html_pages":len(all_docs),
    "pages_with_listed_links":sum(bool(x[1].links) for x in all_docs.values()),
    "counts":dict(counts),
    "broken_distinct_by_kind":{k:len(v) for k,v in unique.items()},
    "broken_occurrences":len(errors),
    "warnings":dict(Counter(x["kind"] for x in warnings)),
    "first_broken":errors[:40],
    "first_warnings":warnings[:30],
}
(OUT/"resumo.json").write_text(json.dumps(summary,ensure_ascii=False,indent=2))
(OUT/"todos-os-achados.json").write_text(json.dumps({"errors":errors,"warnings":warnings},ensure_ascii=False,indent=2))
print(json.dumps(summary,ensure_ascii=False,indent=2))
# A varredura diagnóstica inicial foi revisada em 16/11/2026:
# 399 páginas, zero links/fragmentos/mídias locais quebrados e duas fotos
# bloqueadas corretamente fora do pacote. Daqui em diante, erros reais
# de integridade interrompem o QA antes de uma publicação futura.
assert len(all_docs) >= 390, "Regressão: número inesperadamente pequeno de páginas pré-renderizadas"
assert not errors, "Erro interno de link, mídia ou acervo bloqueado; consultar relatório JSON"
assert not warnings, "Âncora ou link incompleto; consultar relatório JSON"
