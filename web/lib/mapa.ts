/* Generado por scripts/generar-mapa.mjs con d3-geo y world-atlas (Natural Earth 1:50m, proyección Natural Earth).
   Coordenadas en el viewBox del mapa. El fondo de puntos está en public/assets/mapa-mundo.svg y los puntos
   de cada país en public/assets/mapa-paises.svg (el campo "puntos" es el id de su <path>). */

export type Destino = { pais: string; zona: string; x: number; y: number; ruta: string; puntos: string; etiqueta: { dx: number; dy: number; ancla: 'start' | 'end' } };

export const MAPA = {
  "ancho": 1000,
  "alto": 419,
  "origen": {
    "pais": "Colombia",
    "zona": "America/Bogota",
    "x": 266.7,
    "y": 224.6,
    "puntos": "p170"
  },
  "destinos": [
    {
      "pais": "Panamá",
      "zona": "America/Panama",
      "x": 252.3,
      "y": 210.9,
      "ruta": "M266.7 224.6Q265.7 211.2 252.3 210.9",
      "puntos": "p591",
      "etiqueta": {
        "dx": -10,
        "dy": -8,
        "ancla": "end"
      }
    },
    {
      "pais": "Estados Unidos",
      "zona": "America/New_York",
      "x": 257.3,
      "y": 156.7,
      "ruta": "M266.7 224.6Q292.5 186.4 257.3 156.7",
      "puntos": "p840",
      "etiqueta": {
        "dx": -12,
        "dy": 4,
        "ancla": "end"
      }
    },
    {
      "pais": "Canadá",
      "zona": "America/Toronto",
      "x": 274.8,
      "y": 99.1,
      "ruta": "M266.7 224.6Q233.1 159.4 274.8 99.1",
      "puntos": "p124",
      "etiqueta": {
        "dx": -12,
        "dy": -8,
        "ancla": "end"
      }
    },
    {
      "pais": "Chile",
      "zona": "America/Santiago",
      "x": 287.9,
      "y": 347.6,
      "ruta": "M266.7 224.6Q240.4 292.5 287.9 347.6",
      "puntos": "p152",
      "etiqueta": {
        "dx": -12,
        "dy": 5,
        "ancla": "end"
      }
    },
    {
      "pais": "España",
      "zona": "Europe/Madrid",
      "x": 465,
      "y": 109.4,
      "ruta": "M266.7 224.6Q331.3 107.5 465 109.4",
      "puntos": "p724",
      "etiqueta": {
        "dx": -12,
        "dy": 12,
        "ancla": "end"
      }
    },
    {
      "pais": "Países Bajos",
      "zona": "Europe/Amsterdam",
      "x": 487.8,
      "y": 71.7,
      "ruta": "M266.7 224.6Q331.4 81.8 487.8 71.7",
      "puntos": "p528",
      "etiqueta": {
        "dx": -10,
        "dy": -10,
        "ancla": "end"
      }
    },
    {
      "pais": "Polonia",
      "zona": "Europe/Warsaw",
      "x": 526.4,
      "y": 72.2,
      "ruta": "M266.7 224.6Q360 86 526.4 72.2",
      "puntos": "p616",
      "etiqueta": {
        "dx": 12,
        "dy": -10,
        "ancla": "start"
      }
    },
    {
      "pais": "Japón",
      "zona": "Asia/Tokyo",
      "x": 838.2,
      "y": 124.6,
      "ruta": "M266.7 224.6Q528.5 37.4 838.2 124.6",
      "puntos": "p392",
      "etiqueta": {
        "dx": -12,
        "dy": 16,
        "ancla": "end"
      }
    },
    {
      "pais": "Australia",
      "zona": "Australia/Sydney",
      "x": 870.7,
      "y": 349,
      "ruta": "M266.7 224.6Q598.6 141.8 870.7 349",
      "puntos": "p036",
      "etiqueta": {
        "dx": -12,
        "dy": 16,
        "ancla": "end"
      }
    }
  ]
} as const satisfies { ancho: number; alto: number; origen: { pais: string; zona: string; x: number; y: number; puntos: string }; destinos: readonly Destino[] };
