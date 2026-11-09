import { FECHA_TRM, FIN_PROMOS, GARANTIA, MODALIDADES, NEGOCIO, OBJETIVOS, PAISES, PLANES, PREGUNTAS, PROMOS, SITIO, TELEFONO_VISIBLE, WHATSAPP, usd } from '@/lib/contenido';

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
    '- Todas las clases son en vivo por Zoom.',
    ...MODALIDADES.map((m) => `- ${m.titulo}: ${m.texto} Desde ${m.precio} ${m.detalle} (unos ${usd(m.precio)}).`),
    '- Desde cero hasta avanzado; empiezas en tu nivel y hablas desde la primera clase.',
    `- Online desde cualquier país; el horario se acuerda según tu zona horaria. Ya hay estudiantes en Colombia, ${PAISES.join(', ')}.`,
    `- ${GARANTIA.titulo} Si no puedes asistir, tu clase se reprograma (${GARANTIA.nota.toLowerCase().replace(/\.$/, '')}).`,
    '',
    '## Objetivos',
    ...OBJETIVOS.map((o) => `- ${o.titulo}: ${o.texto}`),
    '',
    '## Planes mensuales de clases particulares (pesos colombianos y dólares aproximados)',
    ...PLANES.map((p) => `- ${p.veces}: ${p.clases}, ${p.precio} COP al mes, unos ${usd(p.precio)} (${p.porClase}).`),
    `- Los valores en dólares son aproximados, con la TRM del ${FECHA_TRM}.`,
    '- Medios de pago: Nequi, Daviplata, Davivienda o Bold. Desde otros países, Luis indica cómo pagar.',
    '',
    `## Promociones de Black Friday (hasta el ${fin})`,
    ...PROMOS.map((p) => `- ${p.titulo}: ${p.texto} ${p.precio} COP ${p.precioNota} (unos ${usd(p.precio)}).`),
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
