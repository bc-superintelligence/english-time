# English Time: landing en Next.js

Es la misma landing de `../landing/index.html` pasada a Next.js 16. El diseño, los textos, las animaciones y los enlaces de WhatsApp son idénticos: se comparó elemento por elemento y píxel a píxel.

## Comandos

```bash
npm run dev      # desarrollo en http://localhost:3000
npm run build    # compilación de producción (la página sale estática)
npm start        # sirve la compilación
npm run piezas   # regenera las 5 publicidades (PNG en ../publicidades y JPG en public/assets/piezas)
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Textos, precios, promociones, planes, preguntas y mensajes de WhatsApp | `lib/contenido.tsx` |
| Diseño de las 5 publicidades (también son las tarjetas del carrusel) | `public/piezas/piezas.html` |
| Secciones de la página | `components/secciones.tsx` |
| Animaciones, cuenta regresiva, carrusel y barra fija | `components/Interacciones.tsx` |
| Estilos (copiados tal cual de la landing) | `app/globals.css` |
| Título, descripción e imagen para compartir | `app/layout.tsx` |

Si cambia un precio, cámbialo en `lib/contenido.tsx` y en `public/piezas/piezas.html`, y corre `npm run piezas`.

## Publicar

El sitio se publica solo en GitHub Pages con cada cambio que llega a `main` (`../.github/workflows/publicar.yml`). `npm run build` genera la carpeta `out/` con todo estático.
El dominio `englishtime.com.co` apunta a GitHub Pages desde Namecheap.

## SEO

- Metadatos, Open Graph y Twitter en `app/layout.tsx`. Las palabras clave están en `lib/seo.ts`.
- Datos estructurados (academia, cursos con precios, promociones y preguntas frecuentes) en `lib/seo.ts`. Se insertan en la página como JSON-LD.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` y `llms.txt` se generan desde `app/` con el mismo contenido de la página.
- Imagen para compartir: `app/opengraph-image.png` (1200×630).
- Para Google Search Console, define `NEXT_PUBLIC_GOOGLE_VERIFICATION` con el código que te da Google, o verifica el dominio por DNS en Namecheap.
