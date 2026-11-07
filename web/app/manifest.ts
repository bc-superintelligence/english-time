import type { MetadataRoute } from 'next';
import { NEGOCIO } from '@/lib/contenido';
import { SEO } from '@/lib/seo';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${NEGOCIO.nombre}: clases de inglés personalizadas`,
    short_name: NEGOCIO.nombre,
    description: SEO.descripcion,
    lang: 'es-CO',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0B1D45',
    theme_color: '#0B1D45',
    categories: ['education'],
    icons: [
      { src: '/iconos/icono-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/iconos/icono-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/iconos/icono-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
