import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import { NEGOCIO, SITIO } from '@/lib/contenido';
import { SEO } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: { default: SEO.titulo, template: `%s | ${NEGOCIO.nombre}` },
  description: SEO.descripcion,
  keywords: SEO.palabrasClave,
  applicationName: NEGOCIO.nombre,
  authors: [{ name: NEGOCIO.nombre, url: SITIO }],
  creator: NEGOCIO.nombre,
  publisher: NEGOCIO.nombre,
  category: 'education',
  alternates: { canonical: '/', languages: { es: '/', 'x-default': '/' } },
  openGraph: {
    type: 'website',
    locale: 'es_LA',
    url: '/',
    siteName: NEGOCIO.nombre,
    title: 'English Time: imagina un día hablando inglés',
    description: 'Clases de inglés en vivo por Zoom, particulares 1 a 1 y grupales, desde cualquier país. Tu horario, tu nivel y tus clases particulares nunca se pierden.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'English Time: clases de inglés por Zoom, 1 a 1 y grupales',
    description: 'Clases de inglés online en vivo por Zoom, particulares y grupales, a tu ritmo y en tu horario.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Al dar de alta el sitio en Google Search Console, pon el código en NEXT_PUBLIC_GOOGLE_VERIFICATION.
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B1D45',
};

// Antes de pintar: activa las animaciones solo si la persona no pidió reducir el movimiento,
// y marca el momento del día de quien visita para mostrar el saludo correcto (días 5–11, tardes 12–18, noches 19–4).
const ACTIVAR_ANIMACIONES = "var d=document.documentElement,h=new Date().getHours();d.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('anim');d.dataset.saludo=h>=5&&h<12?'dia':h>=12&&h<19?'tarde':'noche';";

export default function RootLayout({ children }: { children: ReactNode }) {
  // Las dos fuentes de la primera pantalla se piden de una vez (React las pone en el <head>).
  preload('/assets/fonts/bodoni-moda.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' });
  preload('/assets/fonts/hanken-grotesk.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' });
  return (
    // suppressHydrationWarning: el script de abajo agrega clases a <html> antes de que React hidrate.
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ACTIVAR_ANIMACIONES }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
