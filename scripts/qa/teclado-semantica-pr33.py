#!/usr/bin/env python3
"""QA instrumental de teclado, semântica e axe no candidato PR #33.

É uma simulação automatizada de teclas reais em Chrome, e não substitui
NVDA/VoiceOver, avaliação de uma pessoa ou homologação visual externa.
"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT=Path("relatorios-aceite-teclado-pr33")
OUT.mkdir(exist_ok=True)
ROOT="http://127.0.0.1:4173"
ROUTES=[
    "/","/eleitas","/pioneiras/pagu","/pioneiras/lelia-gonzalez",
    "/dados","/metodo","/dinheiro","/quem-controla",
    "/partidos","/na-voz-delas","/reportagens","/sobre"
]
VIEWPORTS=[("desktop",1440,900),("celular",390,844),("reflow",320,700)]
AXE="/tmp/axe.min.js"
records=[]
failures=[]
warnings=[]
with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,executable_path="/usr/bin/google-chrome",
        args=["--no-sandbox","--disable-dev-shm-usage"])
    for dev,w,h in VIEWPORTS:
        context=browser.new_context(viewport={"width":w,"height":h},device_scale_factor=1)
        for route in ROUTES:
            page=context.new_page()
            js=[]
            page.on("pageerror",lambda e:js.append(str(e)))
            problems=[]
            warnings_route=[]
            try:
                response=page.goto(ROOT+route,wait_until="domcontentloaded",timeout=40000)
                page.locator("main h1").first.wait_for(timeout=12000)
                page.wait_for_timeout(400)
                status=response.status if response else None
                if status!=200:problems.append("HTTP "+str(status))
                main_count=page.locator("main").count()
                h1_count=page.locator("main h1").count()
                if main_count!=1:problems.append("main não é único")
                if h1_count!=1:warnings_route.append("H1 total no main: "+str(h1_count))
                if page.evaluate("document.documentElement.scrollWidth>document.documentElement.clientWidth+2"):
                    problems.append("rolagem horizontal do documento")
                for key in ["Tab"]*28+["Shift+Tab"]*5:
                    page.keyboard.press(key)
                    focus=page.evaluate("""() => {
                      const e=document.activeElement;
                      if (!e || e===document.body || e===document.documentElement)return null;
                      const r=e.getBoundingClientRect(),c=getComputedStyle(e);
                      return {tag:e.tagName,display:c.display,visibility:c.visibility,
                        rect:{top:r.top,left:r.left,width:r.width,height:r.height},
                        focusVisible:e.matches(':focus-visible'),
                        label:(e.getAttribute('aria-label')||e.innerText||'').trim().slice(0,80)};
                    }""")
                    if focus:
                        if focus["display"]=="none" or focus["visibility"]=="hidden":
                            problems.append("foco em elemento oculto: "+focus["tag"])
                            break
                        if focus["rect"]["height"]<=0 or focus["rect"]["width"]<=0:
                            problems.append("foco sem área visível: "+focus["tag"])
                            break
                        if focus["rect"]["top"]>h+5 or focus["rect"]["top"]<-focus["rect"]["height"]-5:
                            warnings_route.append("foco fora da viewport: "+focus["tag"])
                if route=="/eleitas" and dev=="desktop":
                    select=page.locator("#filtros-eleitas select").first
                    select.scroll_into_view_if_needed()
                    select.focus()
                    old=select.input_value()
                    page.keyboard.press("ArrowDown")
                    page.wait_for_timeout(350)
                    if old==select.input_value():
                        problems.append("seta não alterou filtro de UF")
                if route.startswith("/pioneiras/"):
                    if page.locator("main img").count():
                        problems.append("perfil de pioneira contém imagem rejeitada")
                    if page.locator('main section[aria-label="Ficha eleitoral da pioneira"]').count()!=1:
                        problems.append("ficha eleitoral ausente")
                details=page.locator("main details:visible")
                if details.count():
                    d=details.first
                    d.locator("summary").first.focus()
                    before=d.get_attribute("open")
                    page.keyboard.press("Enter")
                    after=d.get_attribute("open")
                    if before==after:
                        problems.append("details não alternou com Enter")
                # Normalizar posição antes do axe. A navegação Tab anterior
                # pode deixar um alvo parcialmente recortado na borda do viewport,
                # causando falso positivo de target-size sobre uma área 56px.
                page.evaluate("window.scrollTo(0,0)")
                page.wait_for_timeout(120)
                page.add_script_tag(path=AXE)
                violations=page.evaluate("""async() => {
                  const r=await axe.run(document,{runOnly:{type:'tag',
                    values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
                  return r.violations.map(v=>({id:v.id,impact:v.impact,
                    selectors:v.nodes.slice(0,5).map(n=>n.target.join(' ')),
                    count:v.nodes.length}));
                }""")
                if violations:
                    problems.append("axe: "+json.dumps(violations,ensure_ascii=False))
                if js:
                    problems.append("JS: "+js[0][:250])
                rec={"device":dev,"route":route,"status":status,
                    "main":main_count,"h1":h1_count,"details":details.count(),
                    "axeViolations":violations,"failures":problems,
                    "warnings":list(dict.fromkeys(warnings_route))}
            except Exception as exc:
                rec={"device":dev,"route":route,"failures":["exceção: "+str(exc)[:400]],"warnings":[]}
            records.append(rec)
            if rec["failures"]:failures.append(rec)
            if rec["warnings"]:warnings.append(rec)
            page.close()
        context.close()
    browser.close()
report={"natureza":"QA instrumental, não teste humano com NVDA/VoiceOver",
        "routes":len(ROUTES),"devices":len(VIEWPORTS),"scenarios":len(records),
        "failed_scenarios":len(failures),"warnings_scenarios":len(warnings),
        "records":records}
(OUT/"resultado.json").write_text(json.dumps(report,indent=2,ensure_ascii=False))
(OUT/"README.txt").write_text(
    "Resultado automatizado de foco/teclado/axe em Chrome. "
    "Não comprova funcionamento com NVDA/VoiceOver nem renderização "
    "sob zoom em Firefox ou em máquina física.\n")
print("QA TECLADO",json.dumps({"scenarios":len(records),"failed":len(failures),
    "warnings":len(warnings)},ensure_ascii=False),flush=True)
for fail in failures[:15]:print("FALHA",fail["device"],fail["route"],str(fail["failures"])[:900],flush=True)
assert not failures,"QA teclado e semântica: houve falhas (ver resultado.json)"
