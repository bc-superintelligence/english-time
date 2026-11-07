import { FIN_PROMOS, GARANTIA, NEGOCIO, OBJETIVOS, PAISES, PLANES, PREGUNTAS, PROMOS, SITIO, TELEFONO_VISIBLE, WHATSAPP } from '@/lib/contenido';

export const dynamic = 'force-static';

/* Resumen en texto plano para buscadores con IA y asistentes (convención llms.txt). Se arma con el mismo contenido de la página. */
export function GET() {
  const fin = new Date(FIN_PROMOS).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Bogota' });
  const texto = [
    `# ${NEGOCIO.nombre}`,
    '',
    `> ${NEGOCIO.descripcion}`,
    '',
    '## Clases',
    '- Clases de inglés personalizadas 1 a 1 con profesor, en vivo por Zoom.',
    '- Desde cero hasta avanzado; empiezas en tu nivel y hablas desde la primera clase.',
    '- Tú escoges el día y la hora; el horario se puede ajustar después.',
    `- Online desde cualquier país (${PAISES.join(', ')} o cualquier otro); el horario se acuerda según tu zona horaria.`,
    `- ${GARANTIA.titulo} Si no puedes asistir, tu clase se reprograma (${GARANTIA.nota.toLowerCase().replace(/\.$/, '')}).`,
    '',
    '## Objetivos',
    ...OBJETIVOS.map((o) => `- ${o.titulo}: ${o.texto}`),
    '',
    '## Planes mensuales (pesos colombianos)',
    ...PLANES.map((p) => `- ${p.veces}: ${p.clases}, ${p.precio} al mes (${p.porClase}).`),
    '- Medios de pago: Nequi, Daviplata, Davivienda o Bold. Desde otros países, Luis indica cómo pagar.',
    '',
    `## Promociones de Black Friday (hasta el ${fin})`,
    ...PROMOS.map((p) => `- ${p.titulo}: ${p.texto} ${p.precio} ${p.precioNota}.`),
    '',
    '## Preguntas frecuentes',
    ...PREGUNTAS.flatMap((q) => [`### ${q.pregunta}`, q.respuesta, '']),
    '## Contacto',
    `- WhatsApp: https://wa.me/${WHATSAPP} (${TELEFONO_VISIBLE})`,
    `- Sitio: ${SITIO}/`,
    '',
  ].join('\n');
  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
