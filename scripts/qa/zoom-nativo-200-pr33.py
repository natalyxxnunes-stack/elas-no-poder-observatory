#!/usr/bin/env python3
"""Homologação automatizada de zoom NATIVO do Chrome via teclas de sistema/X11.

Só é considerada válida se window.devicePixelRatio mudar até ~2x o valor inicial
E a viewport CSS encolher; NÃO é CSS zoom, device_scale_factor ou Playwright viewport.
Continua não sendo substituto de NVDA/VoiceOver e testes humanos.
"""
import json
import re
import subprocess
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT=Path("relatorios-zoom-nativo-200-pr33")
OUT.mkdir(parents=True,exist_ok=True)
BASE="http://127.0.0.1:4173"
ROUTES=[
    ("/","home"),("/eleitas","eleitas"),("/pioneiras/pagu","pagu"),
    ("/pioneiras/lelia-gonzalez","lelia"),("/dados","dados"),
    ("/metodo","metodo"),("/dinheiro","dinheiro"),("/quem-controla","quem-controla"),
    ("/partidos","partidos"),("/na-voz-delas","na-voz-delas")
]
results=[]
errors=[]
def xdo(*args):
    return subprocess.run(["xdotool",*args],check=True,text=True,capture_output=True).stdout.strip()

def chrome_window():
    for _ in range(30):
        for pattern in ["google-chrome","Google-chrome","Chromium","chrome"]:
            r=subprocess.run(["xdotool","search","--onlyvisible","--class",pattern],
                text=True,capture_output=True)
            if r.returncode==0 and r.stdout.strip():
                return r.stdout.strip().splitlines()[-1]
        time.sleep(.3)
    raise AssertionError("Janela visível do Chrome não encontrada: zoom nativo não testado")

def metrics(page):
    return page.evaluate("""() => ({
      dpr: window.devicePixelRatio,
      viewport: document.documentElement.clientWidth,
      inner: window.innerWidth,
      content: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      title: (document.querySelector('main h1')?.textContent || '').trim(),
      imageErrors: [...document.querySelectorAll('main img')]
        .filter(el=>!el.complete || el.naturalWidth===0)
        .map(el=>el.getAttribute('src')).slice(0,6)
    })""")

with sync_playwright() as pw:
    browser=pw.chromium.launch(
      headless=False,executable_path="/usr/bin/google-chrome",
      args=["--no-sandbox","--disable-dev-shm-usage","--window-size=1440,980",
            "--force-device-scale-factor=1","--no-first-run"]
    )
    # Null viewport deixa o tamanho vir da janela real, sem emulação Playwright.
    ctx=browser.new_context(viewport=None,device_scale_factor=1)
    page=ctx.new_page()
    try:
        page.goto(BASE+"/",wait_until="domcontentloaded",timeout=50000)
        page.locator("main h1").wait_for(timeout=15000)
        before=metrics(page)
        window=chrome_window()
        xdo("windowactivate","--sync",window)
        xdo("windowfocus","--sync",window)
        for _ in range(5):
            xdo("key","--clearmodifiers","--window",window,"ctrl+equal")
            time.sleep(.18)
        page.wait_for_timeout(850)
        after=metrics(page)
        zoom_ratio=after["dpr"]/before["dpr"]
        css_ratio=before["viewport"]/max(after["viewport"],1)
        print("NATIVO Chrome: dpr inicial/final",before["dpr"],after["dpr"],
              "ratio",round(zoom_ratio,3),"viewport CSS",before["viewport"],after["viewport"])
        # Não permitir 'aprovação' com mera emulação/zoom CSS.
        if not 1.94 <= zoom_ratio <= 2.06 or not 1.8 <= css_ratio <= 2.2:
            raise AssertionError("Chrome não confirmou zoom nativo de 200%; "+
                                 json.dumps({"before":before,"after":after},ensure_ascii=False))
        for route,slug in ROUTES:
            js_errors=[]
            page.on("pageerror",lambda err: js_errors.append(str(err)))
            try:
                response=page.goto(BASE+route,wait_until="domcontentloaded",timeout=50000)
                page.locator("main h1").wait_for(timeout=15000)
                page.wait_for_timeout(250)
                # Imagens com loading=lazy só carregam quando entram na área de
                # leitura. Rolá-las e esperar o decode separa atraso normal de
                # erro de origem, sem mascarar uma imagem realmente quebrada.
                image_wait_notes=[]
                images_checked_in_view=0
                images=page.locator("main img")
                for i in range(images.count()):
                    img=images.nth(i)
                    if not img.is_visible(): continue
                    images_checked_in_view+=1
                    src=img.get_attribute("src") or ""
                    try:
                        img.scroll_into_view_if_needed(timeout=10000)
                        # Aguardar imagem renderizada, não o primeiro resultado
                        # de decode(), que pode rejeitar durante hidratação.
                        page.wait_for_function(
                          """(src)=>Array.from(document.querySelectorAll('main img'))
                            .some(el=>el.getAttribute('src')===src &&
                              el.complete && el.naturalWidth>0)""",
                          arg=src,timeout=8000)
                    except Exception as err:
                        image_wait_notes.append({"src":src,"note":str(err)[:180]})
                page.evaluate("window.scrollTo(0,0)")
                page.wait_for_timeout(150)
                m=metrics(page)
                issues=[]
                if not response or response.status!=200: issues.append("HTTP diferente de 200")
                if m["content"]>m["viewport"]+2: issues.append("rolagem horizontal na página")
                if not m["title"]: issues.append("H1 ausente")
                # Imagens lazy podem ser descarregadas após saírem da viewport;
                # vale o carregamento constatado quando a imagem estava visível.
                if image_wait_notes:
                    issues.append("imagens não carregadas quando visíveis: "+str(image_wait_notes))
                if not 1.94<=m["dpr"]/before["dpr"]<=2.06:issues.append("zoom não persistiu")
                if js_errors:issues.append("erro de JavaScript: "+js_errors[0][:250])
                if route in ("/pioneiras/pagu","/pioneiras/lelia-gonzalez"):
                    if page.locator("main img").count():issues.append("imagem em perfil sem imagem")
                    if page.locator('main section[aria-label="Ficha eleitoral da pioneira"]').count()!=1:
                        issues.append("ficha eleitoral ausente")
                if route=="/na-voz-delas":
                    # Regressão de 200% em novembro: imagem de SITAQ sem
                    # dimensões era invisível/altura zero ao carregar sob zoom.
                    sita=page.locator('main img[src="/documentos/camara-sitaq-julia-zanatta-2026-03-10-p163.png"]').first
                    if not sita.count():
                        issues.append("recorte SITAQ ausente")
                    else:
                        sita.scroll_into_view_if_needed(timeout=10000)
                        page.wait_for_function(
                          "()=>{let i=document.querySelector('main img[src*=camara-sitaq-julia-zanatta]');return !!i&&i.complete&&i.naturalWidth>0&&i.getBoundingClientRect().height>0;}",
                          timeout=12000)
                        sita.screenshot(path=str(OUT/"sitaq-recorte-200-nativo.png"))
                if route=="/eleitas":
                    page.wait_for_load_state("networkidle",timeout=15000)
                    control=page.locator("#filtros-eleitas select").first
                    control.scroll_into_view_if_needed()
                    control.focus()
                    old=control.input_value()
                    page.keyboard.press("ArrowDown")
                    page.wait_for_timeout(350)
                    if control.input_value()==old:issues.append("filtro de UF não responde a seta no zoom")
                # Captura da janela em 200%, não imagem reprocessada.
                page.screenshot(path=str(OUT/(slug+"-200-nativo.png")),animations="disabled")
                record={"path":route,"zoom_dpr":m["dpr"],"viewport_css":m["viewport"],
                        "largura_conteudo":m["content"],"h1":m["title"],"issues":issues,"images_checked_in_view":images_checked_in_view,"image_wait_notes":image_wait_notes,"image_state_after_scroll_top":m["imageErrors"]}
                results.append(record)
                if issues:errors.append(record)
            except Exception as err:
                record={"path":route,"exception":str(err)}
                results.append(record)
                errors.append(record)
        (OUT/"resultado.json").write_text(json.dumps({
            "tipo":"Chrome headful X11 + atalhos físicos via xdotool; confirmação por DPR e viewport",
            "chrome_version":browser.version,"before":before,"zoom_measured":after,
            "ratio_dpr":zoom_ratio,"ratio_viewport":css_ratio,"checks":results,
            "failures":errors,"limitations":"Teste automatizado; não substitui NVDA/VoiceOver nem observação humana."
        },ensure_ascii=False,indent=2))
        print("ZOOM NATIVO 200% confirmado. Rotas:",len(results),"Falhas:",len(errors))
        for e in errors:print(e)
        assert len(results)==len(ROUTES),"Número de páginas não conferido"
        assert not errors,"Regressões sob zoom nativo: conferir resultado.json"
    finally:
        ctx.close()
        browser.close()
