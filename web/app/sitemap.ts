import type { MetadataRoute } from 'next';
import { SITIO } from '@/lib/contenido';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITIO}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${SITIO}/opengraph-image.png`, `${SITIO}/assets/logo-oscuro.png`],
    },
  ];
}
