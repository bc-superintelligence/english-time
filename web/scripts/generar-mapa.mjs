// Regenera el mapa de puntos (public/assets/mapa-mundo.svg y mapa-paises.svg) y las rutas (lib/mapa.ts).
// Para agregar un país: súmalo a DESTINOS (con su id ISO numérico y la ciudad) y corre, desde web/:
//   npm i --no-save d3-geo@3 topojson-client@3 world-atlas@2 && node scripts/generar-mapa.mjs
// Recuerda agregarlo también a PAISES en lib/contenido.tsx.
import { geoNaturalEarth1, geoContains } from 'd3-geo';
import { feature } from 'topojson-client';
import { readFileSync, writeFileSync } from 'node:fs';

import { createRequire } from 'node:module';
const salidaSvg = 'public/assets/mapa-mundo.svg', salidaPaises = 'public/assets/mapa-paises.svg', salidaTs = 'lib/mapa.ts';
const mundo = JSON.parse(readFileSync(createRequire(import.meta.url).resolve('world-atlas/countries-50m.json'), 'utf8'));
const paises = feature(mundo, mundo.objects.countries).features;
const tierra = paises.filter((p) => p.id !== '010'); // sin Antártida

const ANCHO = 1000;
const proy = geoNaturalEarth1().rotate([-10, 0]).fitWidth(ANCHO, { type: 'Sphere' });
const yNorte = proy([10, 78])[1], ySur = proy([10, -56])[1];
const ALTO = Math.round(ySur - yNorte);
const P = (lon, lat) => { const [x, y] = proy([lon, lat]); return [x, y - yNorte]; };

const PASO = 6.4;
const r1 = (n) => Math.round(n * 10) / 10;
const puntos = []; // [x, y, pais]
for (let fila = 0, y = PASO / 2; y < ALTO; fila++, y += PASO * 0.866) {
  for (let x = (fila % 2 ? PASO : PASO / 2); x < ANCHO; x += PASO) {
    const ll = proy.invert([x, y + yNorte]);
    if (!ll || Number.isNaN(ll[0])) continue;
    const p = tierra.find((f) => geoContains(f, ll));
    if (p) puntos.push([r1(x), r1(y), p.id]);
  }
}
// Un path con un segmento de largo cero por punto: un solo elemento SVG para todo el mapa.
const trazo = (lista) => {
  let d = '', fy = null, px = 0;
  for (const [x, y] of lista) {
    if (y !== fy) { d += `M${x} ${y}h0`; fy = y; px = x; }
    else { d += `m${r1(x - px)} 0h0`; px = x; }
  }
  return d;
};

const ORIGEN = { pais: 'Colombia', id: '170', zona: 'America/Bogota', ll: [-74.07, 4.71] };
const DESTINOS = [
  { pais: 'Panamá', id: '591', zona: 'America/Panama', ll: [-79.52, 8.98], et: [-10, -8, 'end'] },
  { pais: 'Estados Unidos', id: '840', zona: 'America/New_York', ll: [-80.19, 25.76], et: [-12, 4, 'end'] },
  { pais: 'Canadá', id: '124', zona: 'America/Toronto', ll: [-79.38, 43.65], et: [-12, -8, 'end'] },
  { pais: 'Chile', id: '152', zona: 'America/Santiago', ll: [-70.67, -33.45], et: [-12, 5, 'end'] },
  { pais: 'España', id: '724', zona: 'Europe/Madrid', ll: [-3.70, 40.42], et: [-12, 12, 'end'] },
  { pais: 'Países Bajos', id: '528', zona: 'Europe/Amsterdam', ll: [4.90, 52.37], et: [-10, -10, 'end'] },
  { pais: 'Polonia', id: '616', zona: 'Europe/Warsaw', ll: [21.01, 52.23], et: [12, -10, 'start'] },
  { pais: 'Japón', id: '392', zona: 'Asia/Tokyo', ll: [139.69, 35.69], et: [-12, 16, 'end'] },
  { pais: 'Australia', id: '036', zona: 'Australia/Sydney', ll: [151.21, -33.87], et: [-12, 16, 'end'] },
];

const [ox, oy] = P(...ORIGEN.ll);
const ruta = ([bx, by]) => {
  const dx = bx - ox, dy = by - oy, dist = Math.hypot(dx, dy);
  let nx = dy / dist, ny = -dx / dist;
  if (ny > 0 || (Math.abs(ny) < 0.2 && nx > 0)) { nx = -nx; ny = -ny; }
  const k = dist < 80 ? 0.45 : dist < 300 ? 0.3 : 0.24;
  const cx = (ox + bx) / 2 + nx * dist * k, cy = (oy + by) / 2 + ny * dist * k;
  return `M${r1(ox)} ${r1(oy)}Q${r1(cx)} ${r1(cy)} ${r1(bx)} ${r1(by)}`;
};

const base = trazo(puntos.filter((p) => p[2] !== ORIGEN.id && !DESTINOS.some((d) => d.id === p[2])));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ANCHO} ${ALTO}"><path d="${base}" fill="none" stroke="#3A5287" stroke-width="3.1" stroke-linecap="round"/></svg>`;
writeFileSync(salidaSvg, svg);

// Los puntos de Colombia y de cada destino van en su propio SVG; la página los usa con <use href="…#id">,
// así el HTML no carga miles de coordenadas (Next las repetiría en el payload de React).
const idDe = (iso) => `p${iso}`;
const paisesSvg = `<svg xmlns="http://www.w3.org/2000/svg"><defs>${[ORIGEN, ...DESTINOS].map((d) => `<path id="${idDe(d.id)}" d="${trazo(puntos.filter((p) => p[2] === d.id))}"/>`).join('')}</defs></svg>`;
writeFileSync(salidaPaises, paisesSvg);

const datos = {
  ancho: ANCHO, alto: ALTO,
  origen: { pais: ORIGEN.pais, zona: ORIGEN.zona, x: r1(ox), y: r1(oy), puntos: idDe(ORIGEN.id) },
  destinos: DESTINOS.map((d) => {
    const [x, y] = P(...d.ll);
    return { pais: d.pais, zona: d.zona, x: r1(x), y: r1(y), ruta: ruta([x, y]), puntos: idDe(d.id), etiqueta: { dx: d.et[0], dy: d.et[1], ancla: d.et[2] } };
  }),
};
const ts = `/* Generado por scripts/generar-mapa.mjs con d3-geo y world-atlas (Natural Earth 1:50m, proyección Natural Earth).
   Coordenadas en el viewBox del mapa. El fondo de puntos está en public/assets/mapa-mundo.svg y los puntos
   de cada país en public/assets/mapa-paises.svg (el campo "puntos" es el id de su <path>). */

export type Destino = { pais: string; zona: string; x: number; y: number; ruta: string; puntos: string; etiqueta: { dx: number; dy: number; ancla: 'start' | 'end' } };

export const MAPA = ${JSON.stringify(datos, null, 2)} as const satisfies { ancho: number; alto: number; origen: { pais: string; zona: string; x: number; y: number; puntos: string }; destinos: readonly Destino[] };
`;
writeFileSync(salidaTs, ts);
console.log('puntos', puntos.length, 'alto', ALTO, 'mapa', svg.length, 'bytes; países', paisesSvg.length, 'bytes');
