#!/usr/bin/env python3
"""Capturas editoriais integras da PR33. Nao aprova paginas automaticamente."""
import json, re
from pathlib import Path
from playwright.sync_api import sync_playwright
BASE="http://127.0.0.1:4173"
OUT=Path("capturas-aceite-editorial-pr33")
OUT.mkdir(exist_ok=True)
ROUTES=[
 ("/","home"),("/achados","achados"),("/achados/quanto-mais-alto-mais-brancas","achado-individual"),
 ("/barreiras","barreiras"),("/busca?q=mulheres","busca-resultados"),("/busca?q=qsezzzinexistente","busca-vazia"),
 ("/calendario","calendario"),("/coautoria","coautoria"),
 ("/colecoes/antigenero-no-poder","colecao-antigenero"),
 ("/como-votaram","como-votaram"),("/comparar","comparar"),("/dados","dados"),
 ("/dinheiro","dinheiro"),("/direitos","direitos"),("/downloads","materiais"),
 ("/eleitas","eleitas-indice"),("/eleitas/perpetua-almeida-ac","eleita-perpetua"),
 ("/eleitas/raquel-lyra-pe","eleita-raquel"),("/em-disputa","em-disputa"),
 ("/funil","funil"),("/historico","historico"),("/investigacoes","investigacoes"),
 ("/metodo","metodo"),("/monitor","monitor"),("/na-voz-delas","na-voz-delas"),
 ("/partidos","partidos"),("/pioneiras","pioneiras"),
 ("/pioneiras/lelia-gonzalez","pioneira-lelia"),("/pioneiras/pagu","pioneira-pagu"),
 ("/quem-chega","quem-chega"),("/quem-controla","quem-controla"),
 ("/quem-sao-elas","candidatas"),("/relatorio-2026","relatorio-2026"),
 ("/reportagens","reportagens"),("/sobre","sobre"),
 ("/temas","temas-indice"),("/temas/agenda","tema-agenda"),
 ("/temas/dinheiro","tema-dinheiro"),("/temas/memoria","tema-memoria"),
 ("/temas/poder","tema-poder"),("/temas/presenca","tema-presenca"),
 ("/temas/violencia","tema-violencia"),("/votos","votos")]
records=[]; failures=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path="/usr/bin/google-chrome",args=["--no-sandbox","--disable-dev-shm-usage"])
    for device,width,height in [("desktop",1440,900),("celular",390,844)]:
        ctx=browser.new_context(viewport={"width":width,"height":height}, device_scale_factor=1, reduced_motion="reduce")
        for url,slug in ROUTES:
            page=ctx.new_page()
            errors=[]
            page.on("pageerror",lambda e: errors.append(str(e)))
            try:
                response=page.goto(BASE+url,wait_until="domcontentloaded",timeout=45000)
                page.locator("main").first.wait_for(timeout=25000)
                page.evaluate("""async () => {
                  const imgs=[...document.images];imgs.forEach(i=>i.loading='eager');
                  await Promise.all(imgs.map(i=>i.decode().catch(()=>{})));
                  await document.fonts.ready;
                }""")
                page.wait_for_timeout(140)
                # Editoria trabalha com pagina completa, nao apenas hero.
                metrics=page.evaluate("""() => {
                    const main=document.querySelector('main');
                    const imgs=[...main.querySelectorAll('img')];
                    const headings=[...main.querySelectorAll('h1,h2,h3')];
                    const sections=[...main.querySelectorAll('section')];
                    const major=[...main.querySelectorAll('section,header')].filter(e=>e.getBoundingClientRect().height>130);
                    return {
                      documentHeight:document.documentElement.scrollHeight,
                      documentWidth:document.documentElement.scrollWidth,
                      viewportWidth:innerWidth,
                      title:[...main.querySelectorAll('h1')].map(x=>x.innerText.trim().slice(0,160)),
                      headings:headings.slice(0,80).map(x=>({tag:x.tagName,text:x.innerText.trim().slice(0,120),top:Math.round(x.getBoundingClientRect().top+scrollY)})),
                      images:imgs.map(x=>({src:x.getAttribute('src'),alt:x.alt,loaded:x.complete&&x.naturalWidth>0,figure:!!x.closest('figure'),caption:!!x.closest('figure')?.querySelector('figcaption'),top:Math.round(x.getBoundingClientRect().top+scrollY)})),
                      sections:sections.length,
                      majorBlocks:major.slice(0,65).map(x=>({tag:x.tagName,top:Math.round(x.getBoundingClientRect().top+scrollY),height:Math.round(x.getBoundingClientRect().height),bg:getComputedStyle(x).backgroundColor})),
                      tables:main.querySelectorAll('table').length,
                      charts:main.querySelectorAll('svg,canvas').length,
                      documents:main.querySelectorAll('a[href*="tse.jus.br"],a[href*="camara.leg.br"],a[href*="senado.leg.br"]').length
                    }
                }""")
                issues=[]
                if not response or response.status!=200:issues.append("http_non_200")
                if metrics["documentWidth"]>width+2:issues.append("horizontal_overflow")
                if not metrics["title"]:issues.append("missing_h1")
                if any(not x["loaded"] for x in metrics["images"]):issues.append("image_not_loaded")
                if errors:issues.append("browser_exception")
                # JPEG integral para escala editorial. PNG do primeiro viewport mantem leitura fina.
                page.screenshot(path=str(OUT/(slug+"-"+device+".jpg")),type="jpeg",quality=82,full_page=True,animations="disabled",timeout=60000)
                if slug in {"home","eleitas-indice","metodo","reportagens","direitos","partidos","dinheiro","tema-memoria"}:
                    page.screenshot(path=str(OUT/(slug+"-"+device+"-abertura.png")),full_page=False,animations="disabled")
                rec={"url":url,"slug":slug,"device":device,"http":response.status if response else None,
                     "metrics":metrics,"issues":issues,"jsErrors":errors[:5]}
                records.append(rec)
                if issues: failures.append({"url":url,"device":device,"issues":issues})
            except Exception as e:
                failures.append({"url":url,"device":device,"exception":str(e)})
            finally:page.close()
        ctx.close()
    browser.close()
(OUT/"diagnostico.json").write_text(json.dumps({"screenshots":records,"failures":failures},ensure_ascii=False,indent=2))
(OUT/"resumo.json").write_text(json.dumps({"rotas":len(ROUTES),"capturas":len(records),"falhas":len(failures),"detalhes":failures[:35]},ensure_ascii=False,indent=2))
print("Rotas:",len(ROUTES),"Capturas:",len(records),"Falhas:",len(failures),flush=True)
for item in failures[:10]:print(item,flush=True)
assert len(records)==len(ROUTES)*2,"Capturas incompletas"
# Diagnostico visual: aviso nao implica reprovar automaticamente um documento.
