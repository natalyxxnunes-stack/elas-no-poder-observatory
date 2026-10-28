"""
Gera os materiais de Downloads a partir dos HTML desta pasta.

Uso (na raiz do repositório):
    python3 scripts/materiais/gerar.py

Saída em public/materiais/. Fontes locais em scripts/materiais/fonts.
"""
import pathlib
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent.parent / "public" / "materiais"
OUT.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    for name in ("cartilha-cota", "oficina-funil"):
        pg.goto((HERE / f"{name}.html").as_uri(), wait_until="networkidle")
        pg.evaluate("document.fonts.ready")
        pg.pdf(path=str(OUT / f"{name}.pdf"), format="A4", print_background=True, prefer_css_page_size=True)
    for fmt, size in (("sq", (1080, 1080)), ("vt", (1080, 1920))):
        pg.set_viewport_size({"width": size[0], "height": size[1]})
        pg.goto((HERE / "infografico-universos.html").as_uri() + f"?formato={fmt}", wait_until="networkidle")
        pg.evaluate("document.fonts.ready")
        pg.locator(".art").screenshot(path=str(OUT / f"infografico-universos-{'quadrado' if fmt == 'sq' else 'vertical'}.png"))
    b.close()
print("ok")
