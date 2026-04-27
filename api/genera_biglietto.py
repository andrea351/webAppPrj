import sys
import json
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


def genera_pdf(dati, output_path):
    titolo    = dati.get('titolo', 'Film')
    orario    = dati.get('orario', '--:--')
    sala      = dati.get('sala', 'Sala 1')
    posti     = dati.get('posti', [])
    totale    = dati.get('totale', '0.00')
    data_str  = dati.get('data', '')
    locandina = dati.get('locandina_path', '')
    codice    = dati.get('codice', 'CM-000000')

    W, H = A4  # 595 x 842 pt

    c = canvas.Canvas(output_path, pagesize=A4)

    # ── SFONDO SCURO ──────────────────────────────────────────────
    c.setFillColor(colors.HexColor('#0d0508'))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # ── FASCIA HEADER bordeaux ────────────────────────────────────
    header_h = 110
    c.setFillColor(colors.HexColor('#3a000d'))
    c.rect(0, H - header_h, W, header_h, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#5e0015'))
    c.rect(W * 0.25, H - header_h, W * 0.5, header_h, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#800020'))
    c.rect(W * 0.4, H - header_h, W * 0.2, header_h, fill=1, stroke=0)

    c.setStrokeColor(colors.HexColor('#ff4d6d'))
    c.setLineWidth(0.8)
    c.line(0, H - header_h, W, H - header_h)

    c.setFillColor(colors.white)
    c.setFont('Helvetica-Bold', 26)
    c.drawCentredString(W / 2, H - 52, 'CINEMA MOOD')
    c.setFont('Helvetica', 10)
    c.setFillColor(colors.HexColor('#faeef1'))
    c.drawCentredString(W / 2, H - 73, 'IL TUO BIGLIETTO')

    c.setStrokeColor(colors.HexColor('#800020'))
    c.setLineWidth(0.5)
    c.line(40, H - header_h - 12, W - 40, H - header_h - 12)

    # ── LOCANDINA ─────────────────────────────────────────────────
    loc_x, loc_y = 40, H - header_h - 200
    loc_w, loc_h = 110, 160

    if locandina and os.path.isfile(locandina):
        try:
            img = ImageReader(locandina)
            c.drawImage(img, loc_x, loc_y, width=loc_w, height=loc_h,
                        preserveAspectRatio=True, mask='auto')
        except Exception:
            _placeholder(c, loc_x, loc_y, loc_w, loc_h, titolo)
    else:
        _placeholder(c, loc_x, loc_y, loc_w, loc_h, titolo)

    # ── INFO FILM ─────────────────────────────────────────────────
    info_x   = loc_x + loc_w + 28
    info_top = H - header_h - 36

    titolo_display = titolo if len(titolo) <= 24 else titolo[:23] + '\u2026'
    c.setFillColor(colors.HexColor('#bb2248'))
    c.setFont('Helvetica-Bold', 19)
    c.drawString(info_x, info_top, titolo_display.upper())

    c.setStrokeColor(colors.HexColor('#800020'))
    c.setLineWidth(0.5)
    c.line(info_x, info_top - 9, W - 40, info_top - 9)

    def riga(label, valore, y):
        c.setFont('Helvetica-Bold', 8)
        c.setFillColor(colors.HexColor('#7a4050'))
        c.drawString(info_x, y, label.upper())
        c.setFont('Helvetica', 12)
        c.setFillColor(colors.HexColor('#faeef1'))
        c.drawString(info_x + 75, y, str(valore))

    riga('Data',   data_str, info_top - 30)
    riga('Orario', orario,   info_top - 52)
    riga('Sala',   sala,     info_top - 74)

    c.setFont('Helvetica-Bold', 8)
    c.setFillColor(colors.HexColor('#7a4050'))
    c.drawString(info_x, info_top - 96, 'POSTI')
    posti_str = '  \u00b7  '.join(posti) if posti else '\u2014'
    c.setFont('Helvetica', 11)
    c.setFillColor(colors.HexColor('#faeef1'))
    if len(posti_str) > 32:
        meta = len(posti) // 2
        c.drawString(info_x + 75, info_top - 96,  '  \u00b7  '.join(posti[:meta]))
        c.drawString(info_x + 75, info_top - 112, '  \u00b7  '.join(posti[meta:]))
    else:
        c.drawString(info_x + 75, info_top - 96, posti_str)

    # ── BOX TOTALE ────────────────────────────────────────────────
    tot_y = loc_y - 28
    c.setFillColor(colors.HexColor('#1a0810'))
    c.roundRect(40, tot_y - 8, W - 80, 44, 6, fill=1, stroke=0)
    c.setStrokeColor(colors.HexColor('#800020'))
    c.setLineWidth(0.8)
    c.roundRect(40, tot_y - 8, W - 80, 44, 6, fill=0, stroke=1)

    c.setFont('Helvetica-Bold', 10)
    c.setFillColor(colors.HexColor('#7a4050'))
    c.drawString(55, tot_y + 22, 'TOTALE PAGATO')
    c.setFont('Helvetica-Bold', 20)
    c.setFillColor(colors.HexColor('#ff4d6d'))
    c.drawString(55, tot_y + 4, f'EUR {totale}')
    c.setFont('Helvetica', 9)
    c.setFillColor(colors.HexColor('#7a4050'))
    n = len(posti)
    c.drawRightString(W - 55, tot_y + 12,
                      f'{n} posto{"" if n == 1 else "/i"}  x  EUR 8.50')

    # ── LINEA PERFORATA ───────────────────────────────────────────
    perf_y = tot_y - 38
    c.setStrokeColor(colors.HexColor('#3a000d'))
    c.setLineWidth(1)
    c.setDash(4, 5)
    c.line(40, perf_y, W - 40, perf_y)
    c.setDash()
    c.setFont('Helvetica', 8)
    c.setFillColor(colors.HexColor('#3a000d'))
    c.drawCentredString(W / 2, perf_y - 11, '\u2702  TAGLIA QUI  \u2702')

    # ── TALLONCINO ────────────────────────────────────────────────
    tall_top = perf_y - 26
    c.setFillColor(colors.HexColor('#0a0205'))
    c.rect(0, 0, W, tall_top + 2, fill=1, stroke=0)
    c.setStrokeColor(colors.HexColor('#3a000d'))
    c.setLineWidth(0.5)
    c.line(40, tall_top, W - 40, tall_top)

    qr = 76
    qr_x = W - 40 - qr
    qr_y = tall_top - qr - 10
    c.setFillColor(colors.white)
    c.rect(qr_x, qr_y, qr, qr, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#0d0508'))
    c.setFont('Helvetica', 7)
    c.drawCentredString(qr_x + qr / 2, qr_y + qr / 2 + 5,  'QR CODE')
    c.drawCentredString(qr_x + qr / 2, qr_y + qr / 2 - 6, 'mostra in cassa')

    c.setFont('Helvetica-Bold', 15)
    c.setFillColor(colors.HexColor('#bb2248'))
    c.drawString(40, tall_top - 28, codice)

    c.setFont('Helvetica', 9)
    c.setFillColor(colors.HexColor('#7a4050'))
    c.drawString(40, tall_top - 46, titolo_display.upper())
    c.drawString(40, tall_top - 62, f'{data_str}  |  {orario}  |  {sala}')
    c.drawString(40, tall_top - 78, '  \u00b7  '.join(posti) if posti else '')

    c.setFont('Helvetica', 7)
    c.setFillColor(colors.HexColor('#3a000d'))
    c.drawCentredString(W / 2, 18,
        "Biglietto valido solo per la data e l'orario indicati. Non rimborsabile.")

    c.save()


def _placeholder(c, x, y, w, h, titolo):
    c.setFillColor(colors.HexColor('#1a0810'))
    c.rect(x, y, w, h, fill=1, stroke=0)
    c.setStrokeColor(colors.HexColor('#800020'))
    c.setLineWidth(1)
    c.rect(x, y, w, h, fill=0, stroke=1)
    c.setFillColor(colors.HexColor('#3a000d'))
    c.setFont('Helvetica', 8)
    label = titolo[:14] if len(titolo) > 14 else titolo
    c.drawCentredString(x + w / 2, y + h / 2, label)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Uso: python3 genera_biglietto.py \'<json>\' <output.pdf>', file=sys.stderr)
        sys.exit(1)
    try:
        with open(sys.argv[1], 'r', encoding='utf-8') as f:
            dati = json.load(f)
    except json.JSONDecodeError as e:
        print(f'JSON non valido: {e}', file=sys.stderr)
        sys.exit(1)
    genera_pdf(dati, sys.argv[2])
    print('OK')