#!/usr/bin/env python3
"""QA reflow: emulacao desktop 200% e espaco de texto; NAO teste humano ou zoom nativo."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright
OUT=Path("relatorios-fechamento-a11y")
OUT.mkdir(exist_ok=True)
ROUTES=[("/","home"),("/eleitas","quem-entrou"),("/eleitas/raquel-lyra-pe","ficha-governadora"),("/dinheiro","dinheiro"),("/metodo","metodo"),("/na-voz-delas","na-voz-delas"),("/partidos","partidos"),("/quem-controla","quem-controla"),("/reportagens","reportagens"),("/pioneiras/pagu","pagu"),("/pioneiras/lelia-gonzalez","lelia")]
MODES=[("desktop",1280,900,1,False),("equivalente-200",640,450,2,False),("espacamento-mobile",390,844,1,True)]
CSS="""html *:not(svg):not(path):not(rect):not(circle){letter-spacing:.12em!important;word-spacing:.16em!important}html p,html li{line-height:1.5!important}html p{margin-bottom:2em!important}"""
records=[];failures=[];keyboard=[]
with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path="/usr/bin/google-chrome",args=["--no-sandbox","--disable-dev-shm-usage"])
  for mode,w,h,dpr,spacing in MODES:
    ctx=browser.new_context(viewport={"width":w,"height":h},device_scale_factor=dpr)
    for route,label in ROUTES:
      page=ctx.new_page()
      errors=[]
      page.on("pageerror",lambda err:errors.append(str(err)))
      try:
        response=page.goto("http://127.0.0.1:4173"+route,wait_until="domcontentloaded",timeout=40000)
        page.locator("main h1").first.wait_for(timeout=15000)
        if spacing:page.add_style_tag(content=CSS)
        metrics=page.evaluate("""() => ({screen:innerWidth,page:document.documentElement.scrollWidth,main:!!document.querySelector('main'),title:(document.querySelector('main h1')?.textContent||'').trim()})""")
        issues=[]
        if not response or response.status!=200:issues.append("HTTP nao 200")
        if metrics["page"]>w+2:issues.append("transbordamento horizontal")
        if not metrics["main"] or not metrics["title"]:issues.append("conteudo principal ausente")
        if errors:issues.append("erro JavaScript: "+errors[0])
        if route=="/eleitas/raquel-lyra-pe" and "Raquel Lyra" not in metrics["title"]:issues.append("nome da ficha incorreto")
        if route.startswith("/pioneiras/"):
          # A editora rejeitou as peças de Pagu e Lélia; abertura sem imagem.
          if page.locator('main header img').count()>0:
            issues.append("abertura das pioneiras contém imagem")
          if page.locator('main header section[aria-label="Ficha eleitoral da pioneira"]').count()!=1:
            issues.append("ficha eleitoral em faixa própria ausente")
        if mode=="desktop" and route=="/eleitas":
          # O H1 vem do SSR: aguardar hidratação antes de acionar o select controlado por React.
          page.wait_for_load_state("networkidle",timeout=15000)
          control=page.locator("#filtros-eleitas select").first
          control.scroll_into_view_if_needed()
          control.focus()
          focused=control.evaluate("(e)=>e===document.activeElement")
          before=control.input_value()
          page.keyboard.press("ArrowDown")
          try:
            page.wait_for_function(
              "(before)=>document.querySelector('#filtros-eleitas select')?.value!==before",
              arg=before,timeout=2500)
          except Exception:
            pass
          after=control.input_value()
          keyboard.append({"route":route,"control":"filtro de UF","before":before,"after":after,"focused":focused})
          if not focused:issues.append("filtro de UF nao recebeu foco")
          if before==after:issues.append("select nao alterou por teclado apos hidratacao")
        if mode=="desktop" and route in ["/dinheiro","/na-voz-delas"]:
          control=page.locator("main details summary").first
          if control.count():
            control.focus()
            details=control.locator("xpath=parent::details")
            before=details.evaluate("(e)=>e.open")
            page.keyboard.press("Enter")
            after=details.evaluate("(e)=>e.open")
            keyboard.append({"route":route,"control":"details","before":before,"after":after})
            if before==after:issues.append("details nao abre por Enter")
        record={"route":route,"mode":mode,"dpr":dpr,"viewport":w,"spacing":spacing,"metrics":metrics,"issues":issues}
        records.append(record)
        if issues:failures.append(record)
        if route in ["/","/eleitas","/dinheiro","/na-voz-delas","/pioneiras/pagu","/pioneiras/lelia-gonzalez"]:
          page.screenshot(path=str(OUT/(label+"-"+mode+".png")),animations="disabled")
      except Exception as err:failures.append({"route":route,"mode":mode,"exception":str(err)})
      finally:page.close()
    ctx.close()
  browser.close()
(OUT/"resultado.json").write_text(json.dumps({"checks":records,"keyboard":keyboard,"failures":failures},ensure_ascii=False,indent=2))
print("Cenarios de reflow e espaco:",len(records),"Teclado:",len(keyboard),"Falhas:",len(failures))
for fail in failures[:20]:print(fail)
assert len(records)==len(ROUTES)*len(MODES),"Teste incompleto"
assert not failures,"Falha: ver relatorios-fechamento-a11y/resultado.json"
