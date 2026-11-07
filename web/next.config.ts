import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100 % estático: next build genera la carpeta out/ que se publica en GitHub Pages.
  output: 'export',
  experimental: {
    // El CSS viaja dentro del HTML: la primera pantalla se pinta sin esperar otra descarga.
    inlineCss: true,
  },
};

export default nextConfig;
