import type { ReactNode } from 'react';

/* Todo el contenido editable de la landing: textos, precios y mensajes de WhatsApp.
   Si Luis cambia un precio, se cambia aquí (y en public/piezas/piezas.html para las publicidades). */

/** Dirección pública del sitio (dominio en Namecheap apuntando a GitHub Pages). */
export const SITIO = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://englishtime.com.co').replace(/\/$/, '');

export const NEGOCIO = {
  nombre: 'English Time',
  lema: 'easy, fast, fun!',
  descripcion: 'Academia de inglés en línea con clases en vivo por Zoom, particulares 1 a 1 y grupales, para estudiantes en cualquier país. Tú escoges el horario, empiezas en tu nivel, hablas desde el primer día y tus clases particulares nunca se pierden: si no puedes asistir, se reprograman.',
};

export const WHATSAPP = '573016507626';
export const TELEFONO = '+573016507626';
export const TELEFONO_VISIBLE = '+57 301 650 7626';

/* Precios en dólares: aproximados, con la TRM oficial del día (Superintendencia Financiera de Colombia).
   Para actualizarlos basta con cambiar la tasa y la fecha. */
export const TRM = 3237.83;
export const FECHA_TRM = '9 de noviembre de 2026';

/** Precio aproximado en dólares de un valor en pesos: de a 5 dólares desde US$100, de a 1 por debajo. */
export function usd(cop: string | number): string {
  const valor = (typeof cop === 'number' ? cop : Number(cop.replace(/[^\d]/g, ''))) / TRM;
  const redondo = valor >= 100 ? Math.round(valor / 5) * 5 : Math.round(valor);
  return `US$${redondo.toLocaleString('en-US')}`;
}

/** Cierre de las promociones: 28 de noviembre de 2026, 11:59 p. m., hora de Colombia. */
export const FIN_PROMOS = '2026-11-28T23:59:59-05:00';

/** Enlace a WhatsApp de Luis con el mensaje ya escrito (mismo formato que la landing original). */
export function wa(mensaje: string): string {
  const texto = encodeURIComponent(mensaje).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
  return `https://wa.me/${WHATSAPP}?text=${texto}`;
}

export const MENSAJES = {
  general: 'Hola Luis, vi la página de English Time y quiero información sobre las clases.',
  barraFija: 'Hola Luis, vi las promociones de Black Friday de English Time y quiero información.',
  horario: 'Hola Luis, vi la página de English Time y quiero escoger mi horario para empezar.',
  regalo: 'Hola Luis, quiero regalar clases de inglés esta Navidad.',
};

export type Momento = 'manana' | 'mediodia' | 'tarde' | 'atardecer' | 'noche';

export type Escena = {
  /** Minutos desde la medianoche: mueve las manecillas del reloj. */
  min: number;
  momento: Momento;
  hora: string;
  sufijo: 'a.m.' | 'p.m.';
  titulo: ReactNode;
  texto: ReactNode;
  gana: string;
};

export const ESCENAS: Escena[] = [
  {
    min: 420, momento: 'manana', hora: '7:00', sufijo: 'a.m.',
    titulo: 'Te escribe una empresa de Toronto.',
    texto: 'Abres el correo con el primer café. Antes lo habrías pegado en el traductor y habrías respondido con miedo de sonar mal. Hoy lo lees de corrido y contestas en dos minutos.',
    gana: 'Las mejores oportunidades llegan en inglés. Ahora sí te llegan a ti.',
  },
  {
    min: 630, momento: 'mediodia', hora: '10:30', sufijo: 'a.m.',
    titulo: <i lang="en">«So, tell me about yourself.»</i>,
    texto: 'La pregunta que siempre te congelaba en las entrevistas. Hoy respiras, sonríes y hablas tres minutos seguidos de tu experiencia. Al otro lado de la pantalla, alguien anota en su libreta: esta persona sí.',
    gana: 'Con inglés compites por mejores cargos y mejores salarios.',
  },
  {
    min: 900, momento: 'tarde', hora: '3:00', sufijo: 'p.m.',
    titulo: 'Tu cliente está en Nueva York.',
    texto: 'Presentas tu propuesta, respondes sus preguntas y hasta lo haces reír. Cuelgas la videollamada y la factura sale en dólares.',
    gana: 'Puedes trabajar para el mundo sin salir de tu casa.',
  },
  {
    min: 1125, momento: 'atardecer', hora: '6:45', sufijo: 'p.m.',
    titulo: 'Aterrizas en Orlando.',
    texto: <>En inmigración te preguntan <i lang="en">«Purpose of your visit?»</i> y respondes sin titubear. En el hotel pides lo que quieres, como lo quieres. Esta vez nadie tiene que traducir por ti.</>,
    gana: 'Viajas con libertad, sin depender de nadie.',
  },
  {
    min: 1290, momento: 'noche', hora: '9:30', sufijo: 'p.m.',
    titulo: 'Suena esa canción.',
    texto: 'La que llevas años cantando a medias, inventándote la letra. Esta noche entiendes cada palabra y, por fin, sabes lo que estabas cantando.',
    gana: 'Series, libros y música se disfrutan más en su idioma original.',
  },
];

export const VERSUS: { antes: string; despues: string }[] = [
  { antes: 'Salones de 30, donde hablas dos minutos por clase.', despues: 'Clases particulares 1 a 1 o grupales, hechas para que hables.' },
  { antes: 'Si faltas a una clase, la pierdes.', despues: 'Si no puedes asistir, tu clase se reprograma. Nunca la pierdes.' },
  { antes: 'Gramática en el tablero y cero conversación.', despues: 'Hablas desde el primer día, a tu nivel.' },
  { antes: 'Horarios fijos y tráfico para llegar a la academia.', despues: 'En vivo por Zoom, desde tu casa y en el horario que tú escojas.' },
  { antes: 'Apps que te felicitan por la racha, pero nunca te hacen hablar.', despues: 'Una persona real que te escucha, te corrige y te anima.' },
  { antes: 'Pena de equivocarte delante de todos.', despues: 'Solo tú y tu profe. Equivocarte es parte de aprender.' },
];

export const PASOS: { titulo: string; texto: string }[] = [
  { titulo: 'Le escribes a Luis por WhatsApp.', texto: 'Le cuentas para qué quieres el inglés y cuánto tiempo tienes.' },
  { titulo: 'Escoges tu plan y tu horario.', texto: 'Clases particulares o grupales, un plan mensual o una promo de Black Friday.' },
  { titulo: 'Hablas en tu primera clase.', texto: 'Desde el primer día, a tu nivel y sin pena.' },
];

/** Cinta roja que se desplaza bajo el héroe. */
export const CINTA: { texto: string; destacado?: string }[] = [
  { texto: 'Black Friday hasta el 28 de noviembre' },
  { texto: 'Bootcamp Navideño ', destacado: '$49.000' },
  { texto: 'Paga un mes, estudia dos' },
  { texto: 'Plan 90: ', destacado: '15% menos' },
  { texto: 'Congela tu precio ', destacado: '2026' },
  { texto: 'Clases particulares y grupales por Zoom' },
  { texto: 'Tus clases nunca se pierden' },
  { texto: 'Preparación para la ciudadanía americana' },
];

/** Garantía de las clases personalizadas: si no puedes asistir, la clase se reprograma. */
export const GARANTIA = {
  titulo: 'Tus clases nunca se pierden.',
  texto: '¿Te surgió algo y no puedes asistir? Tu clase se reprograma para otro día y otra hora. Cada clase que pagas, la recibes.',
  nota: 'Aplica para clases personalizadas 1 a 1.',
};

export type Promo = {
  /** Id de la pieza en public/piezas/piezas.html */
  pieza: string;
  fondo: string;
  tituloPieza: string;
  tab: string;
  tabDetalle: string;
  chip: string;
  titulo: string;
  precio: string;
  precioNota: string;
  texto: string;
  boton: string;
  mensaje: string;
};

export const PROMOS: Promo[] = [
  {
    pieza: 'bootcamp', fondo: '#D4111F', tituloPieza: 'Publicidad: Bootcamp Navideño',
    tab: 'Bootcamp', tabDetalle: '$49.000',
    chip: 'Cupos limitados', titulo: 'Bootcamp Navideño', precio: '$49.000', precioNota: 'los 7 días',
    texto: '7 días de inglés para viajar: aeropuerto, hotel y entrevista. Clases en vivo de 45 minutos en diciembre.',
    boton: 'Separar mi cupo', mensaje: 'Hola Luis, quiero separar mi cupo en el Bootcamp Navideño de $49.000.',
  },
  {
    pieza: 'dosporuno', fondo: '#F3F6FB', tituloPieza: 'Publicidad: Paga un mes, estudia dos',
    tab: '2×1', tabDetalle: '2 meses por 1',
    chip: 'Solo 5 cupos', titulo: 'Paga un mes, estudia dos', precio: '$480.000', precioNota: 'por dos meses',
    texto: 'Pack de 8 clases al mes, 2 veces por semana. Pagas un mes y el segundo es gratis.',
    boton: 'Pedir uno de los 5 cupos', mensaje: 'Hola Luis, quiero la promo Paga un mes, estudia dos. ¿Todavía hay cupos?',
  },
  {
    pieza: 'plan90', fondo: '#0B1D45', tituloPieza: 'Publicidad: Plan 90',
    tab: 'Plan 90', tabDetalle: '15% menos',
    chip: 'Ahorras hasta $390.000', titulo: 'Plan 90, tres meses con 15% menos', precio: '$1.220.000', precioNota: 'desde, por 3 meses',
    texto: 'Tres meses de clases 1 a 1 en un solo pago: 2, 3 o 4 veces por semana.',
    boton: 'Quiero el Plan 90', mensaje: 'Hola Luis, quiero el Plan 90: tres meses con 15% de descuento.',
  },
  {
    pieza: 'congela', fondo: '#DCE7F7', tituloPieza: 'Publicidad: Congela tu precio',
    tab: 'Congela', tabDetalle: 'Precio 2026',
    chip: 'Primer mes en dos cuotas', titulo: 'Congela tu precio 2026', precio: '$480.000', precioNota: 'al mes, todo 2027',
    texto: 'Inscríbete antes del 28 de noviembre y estudia todo 2027 con la tarifa de 2026. Tu primer mes lo pagas 50% hoy y 50% en enero.',
    boton: 'Congelar mi precio', mensaje: 'Hola Luis, quiero congelar mi precio 2026 para todo 2027.',
  },
];

export const PLANES: { veces: string; clases: string; precio: string; porClase: string; etiqueta?: string; mensaje: string }[] = [
  { veces: '2 veces por semana', clases: '8 clases al mes', precio: '$480.000', porClase: '$60.000 por clase', mensaje: 'Hola Luis, quiero el plan mensual de 2 veces por semana ($480.000).' },
  { veces: '3 veces por semana', clases: '12 clases al mes', precio: '$700.000', porClase: '$58.300 por clase', mensaje: 'Hola Luis, quiero el plan mensual de 3 veces por semana ($700.000).' },
  { veces: '4 veces por semana', clases: '16 clases al mes', precio: '$850.000', porClase: '$53.100 por clase', etiqueta: 'Mejor precio por clase', mensaje: 'Hola Luis, quiero el plan mensual de 4 veces por semana ($850.000).' },
];

export const PREGUNTAS: { pregunta: string; respuesta: string }[] = [
  { pregunta: '¿Hay clases particulares y clases grupales?', respuesta: 'Sí, las dos, siempre en vivo por Zoom. En las clases particulares 1 a 1 estás solo con tu profe y escoges el horario. En las clases grupales estudias con otros estudiantes, en un horario fijo y a un precio más bajo.' },
  { pregunta: '¿Cómo son las clases de inglés personalizadas?', respuesta: 'Son clases 1 a 1 en vivo por Zoom: solo tú y tu profe. Avanzas a tu ritmo, en tu nivel y con conversación desde el primer día.' },
  { pregunta: '¿Las clases de inglés son online o presenciales?', respuesta: 'Son online, en vivo por Zoom. Puedes tomarlas desde cualquier país del mundo con una conexión a internet, y el horario se acuerda según tu zona horaria.' },
  { pregunta: '¿Qué pasa si no puedo asistir a una clase?', respuesta: 'Tu clase no se pierde: se reprograma para otro día y otra hora. Esto aplica para las clases personalizadas 1 a 1.' },
  { pregunta: '¿Cuánto cuestan las clases de inglés?', respuesta: `Los planes mensuales de clases particulares cuestan $480.000 COP (8 clases, unos ${usd(480000)}), $700.000 COP (12 clases, unos ${usd(700000)}) o $850.000 COP (16 clases, unos ${usd(850000)}), así que cada clase sale entre $53.100 y $60.000 COP. Hasta el 28 de noviembre hay promociones de Black Friday.` },
  { pregunta: '¿Me preparan para el examen de ciudadanía americana o para una certificación de inglés?', respuesta: 'Sí. Si vas a presentar el examen de ciudadanía de Estados Unidos o un examen de certificación de inglés, tus clases 1 a 1 se enfocan en ese examen, su formato y lo que te van a preguntar, para que llegues seguro.' },
  { pregunta: '¿Necesito saber algo de inglés para empezar?', respuesta: 'No. Empiezas en tu nivel, desde cero si hace falta, y hablas desde la primera clase.' },
  { pregunta: '¿Cuántas clases de inglés a la semana debo tomar?', respuesta: 'Puedes tomar 2, 3 o 4 clases por semana. Con más clases a la semana avanzas más rápido y el precio por clase baja.' },
  { pregunta: '¿Cómo pago?', respuesta: 'Por Nequi, Daviplata, Davivienda o Bold. Si estás fuera de Colombia, Luis te indica cómo pagar desde tu país. Escríbele por WhatsApp y te envía los datos.' },
  { pregunta: '¿Cuándo empiezo?', respuesta: 'Apenas confirmes tu pago, cuadras con Luis el día y la hora de tus clases.' },
  { pregunta: '¿Hasta cuándo aplican las promociones?', respuesta: 'Hasta el 28 de noviembre de 2026. Las que tienen cupos limitados se cierran antes si se llenan.' },
  { pregunta: '¿Puedo cambiar mi horario después?', respuesta: 'Sí. Tu horario se ajusta a tu rutina; lo acuerdas directamente con tu profe.' },
];

export type IconoObjetivo = 'trabajo' | 'ciudadania' | 'examen' | 'viajar' | 'conversar' | 'cero';

/** Para qué quiere la gente el inglés: cada objetivo lleva su propio mensaje de WhatsApp. */
export const OBJETIVOS: { icono: IconoObjetivo; titulo: string; texto: string; boton: string; mensaje: string }[] = [
  {
    icono: 'trabajo', titulo: 'Inglés para el trabajo',
    texto: 'Entrevistas, reuniones, correos y presentaciones. Practicas las situaciones de tu trabajo hasta que te salgan naturales.',
    boton: 'Quiero inglés para mi trabajo', mensaje: 'Hola Luis, quiero clases de inglés para mi trabajo.',
  },
  {
    icono: 'ciudadania', titulo: 'Examen de ciudadanía americana',
    texto: 'Te preparas para la entrevista en inglés del proceso de naturalización: hablar con el oficial, leer, escribir y responder las preguntas con seguridad.',
    boton: 'Quiero prepararme para la ciudadanía', mensaje: 'Hola Luis, quiero prepararme para el examen de ciudadanía americana.',
  },
  {
    icono: 'examen', titulo: 'Exámenes de certificación',
    texto: 'Practicas el formato, los tiempos y las cuatro habilidades del examen que vas a presentar: hablar, escuchar, leer y escribir.',
    boton: 'Quiero preparar mi examen', mensaje: 'Hola Luis, quiero prepararme para un examen de certificación de inglés.',
  },
  {
    icono: 'viajar', titulo: 'Inglés para viajar',
    texto: 'Aeropuerto, migración, hotel, restaurantes y imprevistos. Para que viajes sin depender de nadie.',
    boton: 'Quiero inglés para viajar', mensaje: 'Hola Luis, quiero clases de inglés para viajar.',
  },
  {
    icono: 'conversar', titulo: 'Inglés conversacional',
    texto: 'Si entiendes pero te bloqueas al hablar: clases para soltarte, ganar fluidez y perderle el miedo a equivocarte.',
    boton: 'Quiero hablar con fluidez', mensaje: 'Hola Luis, quiero clases de inglés conversacional.',
  },
  {
    icono: 'cero', titulo: 'Inglés desde cero',
    texto: 'Nunca lo estudiaste o se te olvidó todo. Empiezas por lo básico, a tu ritmo y hablando desde la primera clase.',
    boton: 'Quiero empezar desde cero', mensaje: 'Hola Luis, quiero empezar a aprender inglés desde cero.',
  },
];

/** Países donde English Time ya tiene estudiantes, además de Colombia (el mapa y sus rutas están en lib/mapa.ts). */
export const PAISES = ['Estados Unidos', 'Canadá', 'Panamá', 'Chile', 'España', 'Países Bajos', 'Polonia', 'Japón', 'Australia'];

/** Las dos formas de tomar clase. Solo las particulares tienen la garantía de reprogramación. */
export const MODALIDADES: { id: 'particulares' | 'grupo'; titulo: string; texto: string; precio: string; detalle: string; boton: string; mensaje?: string }[] = [
  {
    id: 'particulares', titulo: 'Clases particulares 1 a 1',
    texto: 'Solo tú y tu profe. Escoges el horario, avanzas a tu ritmo y, si no puedes asistir, tu clase se reprograma.',
    precio: '$480.000', detalle: 'COP al mes', boton: 'Ver los planes',
  },
  {
    id: 'grupo', titulo: 'Clases grupales',
    texto: 'Estudias en vivo con otros estudiantes, en un horario fijo y a un precio más bajo. Como el Bootcamp Navideño de diciembre.',
    precio: '$49.000', detalle: 'COP el Bootcamp de 7 días', boton: 'Preguntar por las clases grupales',
    mensaje: 'Hola Luis, quiero información sobre las clases grupales de inglés.',
  },
];
