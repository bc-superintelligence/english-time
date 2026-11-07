import { FIN_PROMOS, NEGOCIO, PLANES, PREGUNTAS, SITIO, TELEFONO, WHATSAPP } from './contenido';

/* Palabras clave principales: guían títulos, descripciones y datos estructurados. */
export const SEO = {
  titulo: 'Clases de inglés personalizadas online 1 a 1 | English Time',
  descripcion: 'Aprende inglés con clases personalizadas 1 a 1 en vivo por Zoom. Tu horario, tu nivel y conversación desde el primer día, desde cualquier ciudad de Colombia.',
  palabrasClave: [
    'clases de inglés', 'clases de inglés online', 'clases de inglés personalizadas', 'aprender inglés',
    'clases de inglés 1 a 1', 'profesor de inglés', 'inglés por Zoom', 'clases de inglés Colombia',
    'inglés conversacional', 'inglés para viajar', 'inglés para el trabajo', 'inglés desde cero',
    'curso de inglés online', 'clases particulares de inglés',
  ],
};

const precio = (texto: string) => Number(texto.replace(/[^\d]/g, ''));
const id = (fragmento: string) => `${SITIO}/#${fragmento}`;

/** Grafo JSON-LD con la academia, el sitio, la página, los cursos, las promociones y las preguntas frecuentes. */
export function datosEstructurados() {
  const organizacion = {
    '@type': ['EducationalOrganization', 'OnlineBusiness'],
    '@id': id('organizacion'),
    name: NEGOCIO.nombre,
    slogan: NEGOCIO.lema,
    description: NEGOCIO.descripcion,
    url: `${SITIO}/`,
    logo: { '@type': 'ImageObject', url: `${SITIO}/assets/logo-oscuro.png`, width: 867, height: 624 },
    image: `${SITIO}/opengraph-image.png`,
    telephone: TELEFONO,
    areaServed: { '@type': 'Country', name: 'Colombia' },
    availableLanguage: ['es', 'en'],
    knowsAbout: ['Inglés', 'Inglés conversacional', 'Inglés para viajar', 'Inglés para el trabajo', 'Inglés desde cero'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: TELEFONO,
      url: `https://wa.me/${WHATSAPP}`,
      availableLanguage: ['Spanish', 'English'],
      areaServed: 'CO',
    },
    makesOffer: [
      { nombre: 'Bootcamp Navideño de inglés para viajar', texto: '7 días de inglés para viajar con clases en vivo de 45 minutos en diciembre.', valor: '$49.000' },
      { nombre: 'Paga un mes, estudia dos', texto: 'Pack de 8 clases al mes: pagas un mes y el segundo es gratis. Solo 5 cupos.', valor: '$480.000' },
      { nombre: 'Plan 90: tres meses de clases con 15% de descuento', texto: 'Tres meses de clases 1 a 1 en un solo pago, desde $1.220.000.', valor: '$1.220.000' },
      { nombre: 'Congela tu precio 2026', texto: 'Inscríbete antes del 28 de noviembre y estudia todo 2027 con la tarifa de 2026.', valor: '$480.000' },
    ].map((o) => ({
      '@type': 'Offer',
      name: o.nombre,
      description: o.texto,
      price: precio(o.valor),
      priceCurrency: 'COP',
      validThrough: FIN_PROMOS,
      availability: 'https://schema.org/LimitedAvailability',
      url: `${SITIO}/#promociones`,
      seller: { '@id': id('organizacion') },
    })),
  };

  const sitio = {
    '@type': 'WebSite',
    '@id': id('sitio'),
    url: `${SITIO}/`,
    name: NEGOCIO.nombre,
    description: SEO.descripcion,
    inLanguage: 'es-CO',
    publisher: { '@id': id('organizacion') },
  };

  const pagina = {
    '@type': 'WebPage',
    '@id': id('pagina'),
    url: `${SITIO}/`,
    name: SEO.titulo,
    description: SEO.descripcion,
    inLanguage: 'es-CO',
    isPartOf: { '@id': id('sitio') },
    about: { '@id': id('organizacion') },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITIO}/opengraph-image.png`, width: 1200, height: 630 },
    mainEntity: { '@id': id('curso') },
  };

  const proveedor = { '@id': id('organizacion') };
  const curso = {
    '@type': 'Course',
    '@id': id('curso'),
    name: 'Clases de inglés personalizadas 1 a 1 por Zoom',
    description: 'Clases de inglés online 1 a 1 con profesor, en vivo por Zoom. Empiezas en tu nivel, desde cero hasta avanzado, escoges tu horario y hablas desde la primera clase.',
    provider: proveedor,
    inLanguage: 'es',
    teaches: 'Inglés',
    educationalLevel: 'Desde principiante hasta avanzado',
    availableLanguage: ['es', 'en'],
    url: `${SITIO}/#planes`,
    offers: PLANES.map((p) => ({
      '@type': 'Offer',
      category: 'Paid',
      name: `Plan mensual: ${p.veces}`,
      description: `${p.clases}, ${p.porClase}.`,
      price: precio(p.precio),
      priceCurrency: 'COP',
      url: `${SITIO}/#planes`,
    })),
    hasCourseInstance: PLANES.map((p) => ({
      '@type': 'CourseInstance',
      name: `Clases de inglés 1 a 1: ${p.veces}`,
      courseMode: 'Online',
      location: { '@type': 'VirtualLocation', url: `${SITIO}/` },
      courseSchedule: { '@type': 'Schedule', repeatFrequency: 'Weekly', repeatCount: 4 },
      instructor: { '@type': 'Person', name: 'Luis' },
    })),
  };

  const bootcamp = {
    '@type': 'Course',
    '@id': id('bootcamp'),
    name: 'Bootcamp Navideño: inglés para viajar en 7 días',
    description: '7 días de inglés para viajar: aeropuerto, hotel y entrevista. Clases en vivo de 45 minutos por Zoom en diciembre.',
    provider: proveedor,
    teaches: 'Inglés para viajar',
    url: `${SITIO}/#promociones`,
    offers: { '@type': 'Offer', category: 'Paid', price: 49000, priceCurrency: 'COP', validThrough: FIN_PROMOS },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      location: { '@type': 'VirtualLocation', url: `${SITIO}/` },
      courseSchedule: { '@type': 'Schedule', duration: 'PT45M', repeatFrequency: 'Daily', repeatCount: 7 },
    },
  };

  const preguntas = {
    '@type': 'FAQPage',
    '@id': id('preguntas'),
    mainEntity: PREGUNTAS.map((q) => ({
      '@type': 'Question',
      name: q.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: q.respuesta },
    })),
  };

  return { '@context': 'https://schema.org', '@graph': [organizacion, sitio, pagina, curso, bootcamp, preguntas] };
}

/** JSON listo para <script type="application/ld+json">, sin "<" que pueda cerrar la etiqueta. */
export function jsonLd(datos: unknown) {
  return JSON.stringify(datos).replace(/</g, '\\u003c');
}
