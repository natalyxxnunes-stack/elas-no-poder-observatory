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
from PIL import Image, ImageStat
from mss import mss
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

def capturar_tela_x11(nome, window):
    # Captura de pixels da janela X11: independente de page.screenshot/CDP.
    geom=xdo("getwindowgeometry","--shell",window)
    dims={}
    for item in geom.splitlines():
        if "=" in item:
            k,v=item.split("=",1)
            if k in ("X","Y","WIDTH","HEIGHT"):
                dims[k]=int(v)
    with mss() as capture:
        width=min(dims["WIDTH"],1600-dims["X"])
        height=min(dims["HEIGHT"],1100-dims["Y"])
        snap=capture.grab({"left":max(0,dims["X"]),"top":max(0,dims["Y"]),
                           "width":width,"height":height})
        img=Image.frombytes("RGB",snap.size,snap.rgb)
        img.save(OUT/(nome+"-x11.png"))
        # Recorte central exclui barra do navegador e bordas do desktop.
        center=img.crop((int(width*.30),int(height*.35),
                         int(width*.70),int(height*.70)))
        stat=ImageStat.Stat(center)
        result={"image":nome,"geometry":dims,
                "pixel_central":center.getpixel((center.width//2,center.height//2)),
                "mean":list(map(lambda x:round(x,1),stat.mean)),
                "stddev":list(map(lambda x:round(x,1),stat.stddev))}
        print("CAPTURA X11",json.dumps(result,ensure_ascii=False),flush=True)
        return result

def inspetor_visibilidade(page,etapa):
    vals=page.evaluate("""() => {
      const nodes=[[innerWidth*.5,120],[innerWidth*.5,innerHeight*.5],
                   [innerWidth*.5,innerHeight*.82]].map(([x,y])=>{
        const e=document.elementFromPoint(x,y);
        const c=e ? getComputedStyle(e) : null;
        return {x,y,tag:e?.tagName,cls:e?.className?.toString().slice(0,125),
          text:e?.textContent?.trim().slice(0,90),background:c?.backgroundColor,
          color:c?.color,visibility:c?.visibility,opacity:c?.opacity};
      });
      const img=document.querySelector('main img[src*=camara-sitaq-julia-zanatta]');
      const rect=img?.getBoundingClientRect();
      return {scrollY,viewport:innerHeight,imgRect:rect&&
        {x:rect.x,y:rect.y,w:rect.width,h:rect.height},
        nodes};
    }""")
    print("DOM NO SCROLL",etapa,json.dumps(vals,ensure_ascii=False),flush=True)
    return vals

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
                if route=="/na-voz-delas":
                    before_png=page.screenshot(path=str(OUT/"na-voz-antes-rolagem-200.png"),animations="disabled")
                    print("DEBUG SITAQ screenshot antes rolagem",len(before_png),
                          "scrollY",page.evaluate("scrollY"))
                    inspetor_visibilidade(page,"antes")
                    capturar_tela_x11("na-voz-antes",window)
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
                        # Capturar a janela (não o elemento isolado): a chamada
                        # locator.screenshot produziu quadro branco no Chrome X11.
                        # O teste passa somente se houver pintura real.
                        page.wait_for_timeout(500)
                        shot=page.screenshot(path=str(OUT/"sitaq-contexto-200-nativo.png"),animations="disabled")
                        if len(shot)<12000:
                            issues.append("captura visual SITAQ parece vazia: "+str(len(shot))+" bytes")
                        print("DEBUG SITAQ screenshot durante rolagem",len(shot),
                              "scrollY",page.evaluate("scrollY"),
                              "docHeight",page.evaluate("document.documentElement.scrollHeight"))
                        inspetor_visibilidade(page,"no-sitaq")
                        capturar_tela_x11("sitaq-durante",window)
                        page.evaluate("window.scrollTo(0,0)")
                        page.wait_for_timeout(600)
                        after_png=page.screenshot(path=str(OUT/"na-voz-depois-topo-200.png"),animations="disabled")
                        print("DEBUG SITAQ screenshot depois topo",len(after_png),
                              "scrollY",page.evaluate("scrollY"))
                        capturar_tela_x11("na-voz-depois-topo",window)
                        if len(after_png)<12000:issues.append("página permanece vazia após voltar ao topo")
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
                screenshot=page.screenshot(path=str(OUT/(slug+"-200-nativo.png")),animations="disabled")
                if len(screenshot)<10000:
                    issues.append("captura de página aparentemente vazia: "+str(len(screenshot))+" bytes")
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
