#!/bin/zsh
# Exporta las 5 publicidades de public/piezas/piezas.html:
#   - PNG 1080x1350 para WhatsApp e Instagram en ../publicidades
#   - JPG liviano en public/assets/piezas (la portada.jpg es la imagen que muestra WhatsApp al compartir el enlace)
DIR="${0:A:h}/.."
OUT="$DIR/../publicidades"; WEB="$DIR/public/assets/piezas"
mkdir -p "$OUT" "$WEB"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for p in portada bootcamp dosporuno plan90 congela; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1080,1350 --virtual-time-budget=4000 --allow-file-access-from-files \
    --screenshot="$OUT/english-time-$p.png" "file://$DIR/public/piezas/piezas.html?p=$p" >/dev/null 2>&1
  sips -s format jpeg -s formatOptions 90 -Z 1080 "$OUT/english-time-$p.png" --out "$WEB/$p.jpg" >/dev/null
  echo "$p listo"
done
