#!/usr/bin/env python3
"""Render independente: Chrome headless sem Xvfb. Geometria de reflow equivalente a 200%.
Não é zoom nativo de navegador nem teste com NVDA/VoiceOver.
"""
from playwright.sync_api import sync_playwright
from PIL import Image, ImageStat
from pathlib import Path
import subprocess, time, io, json

OUT=Path("relatorio-navegador-independente")
OUT.mkdir(exist_ok=True)
routes=["/","/eleitas","/pioneiras/pagu","/pioneiras/lelia-gonzalez",
        "/dados","/metodo","/dinheiro","/quem-controla","/partidos","/na-voz-delas"]
rows=[]
srv=subprocess.Popen(["python3","-m","http.server","4174","--directory","dist/client"],
                     stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
time.sleep(2)
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(channel="chrome",headless=True)
  context=browser.new_context(viewport={"width":632,"height":720},device_scale_factor=2)
  for route in routes:
   page=context.new_page()
   errs=[]
   page.on("pageerror", lambda e: errs.append(str(e)))
   response=page.goto("http://127.0.0.1:4174"+route,wait_until="domcontentloaded",timeout=30000)
   page.wait_for_timeout(300)
   geometry=page.evaluate("""() => ({
      width:document.documentElement.scrollWidth,
      viewport:document.documentElement.clientWidth,
      height:document.documentElement.scrollHeight,
      h1:[...document.querySelectorAll('h1')].map(n=>n.textContent.trim()),
      dpr:window.devicePixelRatio
   })""")
   pictures=[]
   for y,label in [(0,"topo"),(1535,"rolagem")]:
    page.evaluate("(n)=>window.scrollTo(0,n)", y)
    page.wait_for_timeout(300)
    filename=route.strip("/").replace("/","_") or "home"
    data=page.screenshot(path=str(OUT/f"{filename}-{label}.png"))
    img=Image.open(io.BytesIO(data)).convert("RGB")
    cropped=img.crop((int(img.width*.25),int(img.height*.25),
                     int(img.width*.75),int(img.height*.75)))
    stats=ImageStat.Stat(cropped)
    blank=max(stats.stddev)<1 and min(stats.mean)>240
    pictures.append({"label":label,"scrollY":page.evaluate("window.scrollY"),
                     "blank_center":blank,"center_stddev":stats.stddev})
   prohibited=page.evaluate("""()=>[...document.images]
      .map(i=>i.getAttribute('src')).filter(s=>s &&
      /pagu-patricia|lelia-gonzalez-cezar|tse-candidatos-2026-portal/.test(s))""")
   row={"route":route,"http":response.status,"geometry":geometry,
        "screenshots":pictures,"prohibited_images":prohibited,"js_errors":errs}
   rows.append(row)
   page.close()
  browser.close()
finally:
 srv.terminate()
(OUT/"laudo.json").write_text(json.dumps({"commit_fonte":"791245cdd71a65e47ba489807eca6d489077965d",
 "metodo":"Chrome headless sem Xvfb, viewport CSS de 632px / DPR 2; NÃO testa zoom nativo, leitor de tela nem ambiente doméstico.",
 "rotas":rows},ensure_ascii=False,indent=2))
problems=[]
for r in rows:
 if r["http"]!=200: problems.append((r["route"],"HTTP"))
 if r["geometry"]["width"]>r["geometry"]["viewport"]+2: problems.append((r["route"],"transbordamento"))
 if not r["geometry"]["h1"]:problems.append((r["route"],"H1"))
 if any(s["blank_center"] for s in r["screenshots"]):problems.append((r["route"],"tela branca"))
 if r["prohibited_images"]:problems.append((r["route"],"imagem restrita"))
 if r["js_errors"]:problems.append((r["route"],"erro JS"))
print(json.dumps({"rotas":len(rows),"problemas":problems},ensure_ascii=False))
if problems:raise SystemExit(1)
