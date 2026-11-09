import { Sprite } from '@/components/base';
import { BarraFija, Cierre, Clases, Dia, Heroe, Mundo, Objetivos, PiePagina, Planes, Preguntas, Promociones } from '@/components/secciones';
import Interacciones from '@/components/Interacciones';
import { datosEstructurados, jsonLd } from '@/lib/seo';

export default function Inicio() {
  return (
    <>
      {/* Datos estructurados: academia, cursos, precios, promociones y preguntas frecuentes para Google. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(datosEstructurados()) }} />
      <Sprite />
      <BarraFija />
      <Heroe />
      <main>
        <Dia />
        <Clases />
        <Objetivos />
        <Mundo />
        <Promociones />
        <Planes />
        <Preguntas />
        <Cierre />
      </main>
      <PiePagina />
      <Interacciones />
    </>
  );
}
