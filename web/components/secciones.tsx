/* eslint-disable @next/next/no-img-element -- los logos y la mascota ya están optimizados; se usan <img> para que el HTML quede igual a la landing original. */
import type { CSSProperties, ReactNode } from 'react';
import { Cuenta, Icono, Medidor, Revelar, retraso } from './base';
import {
  CINTA, ESCENAS, GARANTIA, MENSAJES, OBJETIVOS, PAISES, PASOS, PLANES, PREGUNTAS, PROMOS, TELEFONO, TELEFONO_VISIBLE, VERSUS, wa,
} from '@/lib/contenido';
import type { IconoObjetivo } from '@/lib/contenido';

const externo = { target: '_blank', rel: 'noopener' } as const;

/* ---------- barra fija de WhatsApp ---------- */
export function BarraFija() {
  return (
    <div className="fija" id="fija" aria-hidden="true" inert>
      <div className="wrap fija-in">
        <img src="/assets/logo-claro.webp" alt="" width={260} height={188} />
        <p className="fija-cuenta"><span className="pill">Black Friday</span><span><span className="solo-escritorio">Las promociones terminan en</span><span className="solo-movil">Promos de Black Friday</span></span><b data-cuenta-corta="">22 días</b></p>
        <a className="btn btn-rojo btn-brillo" href={wa(MENSAJES.barraFija)} {...externo}><Icono id="wa" /><span>Escribirle a Luis<span className="solo-escritorio"> por WhatsApp</span></span></a>
      </div>
    </div>
  );
}

/* ---------- héroe ---------- */
function Cinta() {
  const items = [...CINTA, ...CINTA];
  return (
    <a className="cinta" href="#promociones" aria-label="Ver las cuatro promociones de Black Friday">
      <span className="cinta-pista" aria-hidden="true">
        {items.map((item, i) => (
          <span className="ci" key={i}>{item.texto}{item.destacado && <b>{item.destacado}</b>}<svg><use href="#reloj-logo" /></svg></span>
        ))}
      </span>
    </a>
  );
}

export function Heroe() {
  return (
    <header className="hero">
      <div className="wrap barra">
        <img src="/assets/logo-claro.webp" alt="English Time: easy, fast, fun!" width={260} height={188} fetchPriority="high" />
        <a className="btn btn-borde" href={wa(MENSAJES.general)} {...externo}>Escribir por WhatsApp</a>
      </div>

      <div className="wrap hero-grid">
        <div className="texto-hero">
          <div className="campana aparece" style={retraso('.1s')}><span className="pill">Black Friday</span><span>Promociones hasta el 28 de noviembre</span></div>
          <Revelar as="h1" style={retraso('.25s')} tema="Clases de inglés personalizadas 1 a 1 por Zoom">Imagina un día hablando inglés.</Revelar>
          <p className="lead aparece" style={retraso('.75s')}>Sin traductor, sin pena y sin quedarte callado. Baja y vívelo hora por hora: así cambia tu vida cuando por fin hablas inglés.</p>
          <div className="acciones aparece" style={retraso('.95s')}>
            <a className="btn btn-rojo btn-brillo" href={wa(MENSAJES.general)} {...externo}><Icono id="wa" />Escribirle a Luis por WhatsApp</a>
            <Cuenta />
          </div>
        </div>
        <Medidor />
      </div>

      <div className="wrap">
        <a className="bajar aparece" style={retraso('1.2s')} href="#dia">
          <svg viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".5" /><path d="M11 14.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Tu día empieza a las 7:00 a.m.
        </a>
      </div>

      <Cinta />
    </header>
  );
}

/* ---------- un día en inglés ---------- */
const MARCAS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

function Reloj() {
  return (
    <svg className="reloj" viewBox="0 0 400 400">
      <circle cx="200" cy="200" r="184" fill="none" stroke="currentColor" strokeWidth="3" opacity=".2" />
      <g stroke="currentColor" strokeLinecap="round">
        {MARCAS.map((g) => {
          const fuerte = g % 90 === 0;
          return (
            <line key={g} x1="200" y1="36" x2="200" y2={fuerte ? 62 : 52} strokeWidth={fuerte ? 9 : 6}
              opacity={fuerte ? undefined : '.55'} transform={g ? `rotate(${g} 200 200)` : undefined} />
          );
        })}
      </g>
      <path d="M42.4 109 A182 182 0 0 1 357.6 109" fill="none" stroke="#D4111F" strokeWidth="14" strokeLinecap="round" />
      <line className="mano mano-h" x1="200" y1="200" x2="200" y2="108" stroke="currentColor" strokeWidth="20" strokeLinecap="round" style={{ transform: 'rotate(210deg)' }} />
      <line className="mano mano-m" x1="200" y1="200" x2="200" y2="66" stroke="#D4111F" strokeWidth="13" strokeLinecap="round" style={{ transform: 'rotate(0deg)' }} />
      <circle cx="200" cy="200" r="15" fill="currentColor" />
    </svg>
  );
}

export function Dia() {
  return (
    <section className="dia" id="dia" data-momento="manana" aria-labelledby="t-dia">
      <h2 id="t-dia" className="oculto">Beneficios de hablar inglés: un día en tu vida, hora por hora</h2>
      <div className="dia-mini" aria-hidden="true">
        <svg className="reloj-mini" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="22" opacity=".25" />
          <path d="M42.4 109 A182 182 0 0 1 357.6 109" fill="none" stroke="#D4111F" strokeWidth="26" strokeLinecap="round" />
          <line className="mano mano-h" x1="200" y1="200" x2="200" y2="100" stroke="currentColor" strokeWidth="34" strokeLinecap="round" style={{ transform: 'rotate(210deg)' }} />
          <line className="mano mano-m" x1="200" y1="200" x2="200" y2="62" stroke="#D4111F" strokeWidth="24" strokeLinecap="round" style={{ transform: 'rotate(0deg)' }} />
          <circle cx="200" cy="200" r="24" fill="currentColor" />
        </svg>
        <span className="mini-hora">7:00 a.m.</span>
        <span className="mini-pasos">{[0, 1, 2, 3, 4, 5].map((i) => <i key={i} className={i === 0 ? 'on' : undefined} />)}</span>
      </div>
      <div className="wrap dia-grid">
        <div className="dia-reloj" aria-hidden="true"><Reloj /></div>

        <ol className="escenas">
          {ESCENAS.map((e) => (
            <li className="escena" data-min={e.min} data-momento={e.momento} key={e.min}>
              <p className="hora-grande">{e.hora}<small>{e.sufijo}</small></p>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
              <p className="gana">{e.gana}</p>
            </li>
          ))}
          <li className="escena ahora" data-min="" data-momento="ahora">
            <p className="previa" id="previa-ahora">Y ahora mismo son las</p>
            <p className="hora-grande" id="hora-ahora">tu hora</p>
            <h3>Es hora de hablar inglés.</h3>
            <p>Ese día que acabas de leer no es un sueño. Es un horario, y el tuyo lo escoges tú.</p>
            <a className="btn btn-rojo btn-brillo" href={wa(MENSAJES.horario)} {...externo}><Icono id="wa" />Escoger mi horario con Luis</a>
          </li>
        </ol>
      </div>
    </section>
  );
}

/* ---------- por qué no ha funcionado ---------- */
export function Clases() {
  return (
    <section className="seccion blanco" id="clases" aria-labelledby="t-clases">
      <div className="wrap">
        <div className="metodo-cab">
          <div className="encabezado">
            <Revelar id="t-clases">Si ya lo intentaste y no funcionó, no es tu culpa.</Revelar>
            <p className="aparece" style={retraso('.3s')}>A casi todos nos enseñaron inglés para pasar exámenes, no para hablarlo. En English Time las clases de inglés son personalizadas y 1 a 1: cada una está hecha para que hables.</p>
          </div>
          <img className="mascota" src="/assets/mascota.webp" srcSet="/assets/mascota-220.webp 220w, /assets/mascota.webp 296w" sizes="(max-width: 700px) 110px, (max-width: 900px) 130px, 200px" width={296} height={605} loading="lazy" alt="La mascota de English Time, un reloj despertador con la camiseta de la academia." />
        </div>

        <div className="versus" role="table" aria-label="Lo de siempre frente a English Time">
          <div className="versus-fila versus-cab" role="row"><span role="columnheader">Lo de siempre</span><span role="columnheader">En English Time</span></div>
          {VERSUS.map((v) => (
            <div className="versus-fila" role="row" key={v.antes}>
              <p className="antes" role="cell"><Icono id="no" /><span>{v.antes}</span></p>
              <p className="despues" role="cell"><Icono id="si" />{v.despues}</p>
            </div>
          ))}
        </div>

        <h3 className="pasos-titulo">Empezar es así de simple</h3>
        <ol className="pasos">
          {PASOS.map((p) => <li key={p.titulo}><b>{p.titulo}</b><span>{p.texto}</span></li>)}
        </ol>
      </div>
    </section>
  );
}

/* ---------- clases según el objetivo ---------- */
const TRAZOS: Record<IconoObjetivo, ReactNode> = {
  trabajo: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18M11 12.5v2h2v-2" /></>,
  ciudadania: <><path d="M5 21V3.5" /><path d="M5 4h13l-2.5 4.25L18 12.5H5" /><path d="M3 21h5" /></>,
  examen: <><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21H12" /><path d="M14 3l5 5h-5z" /><path d="M8 11h6M8 14.5h3.5" /><circle cx="17" cy="16" r="2.8" /><path d="M15.6 18.5 15 22l2-1.1 2 1.1-.6-3.5" /></>,
  viajar: <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />,
  conversar: <><path d="M20.5 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.4-4.6A7.5 7.5 0 1 1 20.5 11.5z" /><path d="M9 11.5h.01M13 11.5h.01M17 11.5h.01" strokeWidth="2.6" /></>,
  cero: <><path d="M12 21v-8.5" /><path d="M12 12.5C12 8.4 9 5.5 4 5.5c0 4.1 3 7 8 7z" /><path d="M12 14.5c0-3.3 2.5-6 7-6 0 3.4-2.5 6-7 6z" /></>,
};

export function Objetivos() {
  return (
    <section className="seccion objetivos" id="objetivos" aria-labelledby="t-objetivos">
      <div className="wrap">
        <div className="encabezado">
          <Revelar id="t-objetivos">Clases de inglés personalizadas para lo que tú necesitas.</Revelar>
          <p className="aparece" style={retraso('.3s')}>Cuéntale a Luis para qué quieres el inglés y tus clases 1 a 1 se enfocan en eso, a tu ritmo y en tu horario.</p>
        </div>
        <ul className="objetivos-lista">
          {OBJETIVOS.map((o, i) => (
            <li className="objetivo" style={i % 3 ? { transitionDelay: `${(i % 3) * 0.12}s` } : undefined} key={o.titulo}>
              <span className="objetivo-icono" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{TRAZOS[o.icono]}</svg>
              </span>
              <h3>{o.titulo}</h3>
              <p>{o.texto}</p>
              <a className="enlace-wa" href={wa(o.mensaje)} {...externo}><Icono id="wa" />{o.boton}</a>
            </li>
          ))}
        </ul>
        <p className="ciudades aparece">Clases de inglés online desde cualquier país: {PAISES.join(', ')} o donde estés. Solo necesitas internet, y el horario se acuerda según tu zona horaria.</p>
      </div>
    </section>
  );
}

/* ---------- promociones: mazo de tarjetas ---------- */
export function Promociones() {
  return (
    <section className="seccion" id="promociones" aria-labelledby="t-promos">
      <div className="wrap">
        <div className="encabezado">
          <Revelar id="t-promos">Empieza antes del 28 de noviembre y paga menos.</Revelar>
          <p className="aparece" style={retraso('.3s')}>Cuatro promociones de Black Friday, cada una para un momento distinto. Pasa las tarjetas, escoge la tuya y escríbele a Luis con un toque: el mensaje ya va escrito.</p>
        </div>

        <div className="deck" id="deck">
          <div className="deck-tabs" role="tablist" aria-label="Promociones de Black Friday">
            {PROMOS.map((p, i) => (
              <button className="deck-tab" role="tab" id={`tab-${i}`} aria-controls={`panel-${i}`} aria-selected={i === 0} tabIndex={i === 0 ? undefined : -1} key={p.pieza}>
                <span className="progreso"><i /></span><b>{p.tab}</b><span className="tab-precio">{p.tabDetalle}</span>
              </button>
            ))}
          </div>

          <div className="deck-cuerpo">
            <div className="deck-zona">
              <div className="deck-mesa">
                {PROMOS.map((p, i) => (
                  <figure className="carta" data-o={i} style={{ '--fondo': p.fondo } as CSSProperties} key={p.pieza}>
                    <iframe src={`/piezas/piezas.html?p=${p.pieza}`} title={p.tituloPieza} loading="lazy" scrolling="no" tabIndex={-1} aria-hidden="true" />
                  </figure>
                ))}
              </div>
              <div className="deck-controles">
                <button className="deck-flecha" data-dir="-1" aria-label="Promoción anterior"><Icono id="izq" /></button>
                <span className="deck-num" aria-hidden="true">1 / 4</span>
                <button className="deck-flecha" data-dir="1" aria-label="Siguiente promoción"><Icono id="der" /></button>
                <span className="deck-pista">Desliza las tarjetas</span>
              </div>
            </div>

            <div className="deck-paneles">
              {PROMOS.map((p, i) => (
                <div className={i === 0 ? 'deck-panel activo' : 'deck-panel'} role="tabpanel" id={`panel-${i}`} aria-labelledby={`tab-${i}`}
                  aria-hidden={i === 0 ? undefined : true} inert={i === 0 ? undefined : true} key={p.pieza}>
                  <span className="chip">{p.chip}</span>
                  <h3>{p.titulo}</h3>
                  <p className="precio">{p.precio}<small>{p.precioNota}</small></p>
                  <p className="texto">{p.texto}</p>
                  <a className="btn btn-rojo btn-brillo" href={wa(p.mensaje)} {...externo}><Icono id="wa" />{p.boton}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="regalo aparece">
          <div>
            <h3>¿Es para regalar?</h3>
            <p>El Bootcamp y cualquier plan se pueden regalar esta Navidad.</p>
          </div>
          <a className="btn btn-noche" href={wa(MENSAJES.regalo)} {...externo}><Icono id="wa" />Regalar clases</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- garantía: las clases personalizadas se reprograman ---------- */
function Garantia() {
  return (
    <div className="garantia aparece">
      <svg className="garantia-reloj" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="38" fill="none" stroke="currentColor" strokeWidth="5" />
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity=".6">
          <path d="M60 28v6M92 60h-6M60 92v-6M28 60h6" />
        </g>
        <path className="garantia-flecha" d="M60 9 A51 51 0 1 0 111 60" fill="none" stroke="#FF4D5A" strokeWidth="6" strokeLinecap="round" pathLength="100" />
        <path d="M104 66.5 111 57.5 118 66.5" fill="none" stroke="#FF4D5A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="garantia-punta" />
        <g className="garantia-manos" stroke="currentColor" strokeLinecap="round">
          <line className="mano-hora" x1="60" y1="60" x2="60" y2="42" strokeWidth="6" />
          <line className="mano-minuto" x1="60" y1="60" x2="76" y2="60" strokeWidth="4.5" />
        </g>
        <circle cx="60" cy="60" r="5" fill="currentColor" />
      </svg>
      <div>
        <h3>{GARANTIA.titulo}</h3>
        <p>{GARANTIA.texto}</p>
        <p className="garantia-nota">{GARANTIA.nota}</p>
      </div>
    </div>
  );
}

/* ---------- planes mensuales ---------- */
export function Planes() {
  return (
    <section className="seccion blanco" id="planes" aria-labelledby="t-planes">
      <div className="wrap">
        <div className="encabezado">
          <Revelar id="t-planes">Planes mensuales de clases de inglés</Revelar>
          <p className="aparece" style={retraso('.2s')}>Clases 1 a 1 cada mes, a precio normal. Escoges cuántas veces por semana.</p>
        </div>
        <div className="planes">
          {PLANES.map((p, i) => (
            <div className="plan" style={i ? { transitionDelay: `.${i}s` } : undefined} key={p.veces}>
              <div><h3>{p.veces}</h3><p className="detalle">{p.clases}{p.etiqueta && <span className="etiqueta">{p.etiqueta}</span>}</p></div>
              <div className="precio"><b>{p.precio}</b><span>{p.porClase}</span></div>
              <a className="btn btn-noche btn-chico" href={wa(p.mensaje)} {...externo}><Icono id="wa" />Elegir</a>
            </div>
          ))}
        </div>
        <Garantia />
        <p className="nota">Precios en pesos colombianos. Pagas por Nequi, Daviplata, Davivienda o Bold; si estás fuera de Colombia, Luis te indica cómo pagar desde tu país.</p>
      </div>
    </section>
  );
}

/* ---------- preguntas frecuentes ---------- */
export function Preguntas() {
  return (
    <section className="seccion" id="preguntas" aria-labelledby="t-preguntas">
      <div className="wrap">
        <Revelar id="t-preguntas">Preguntas frecuentes</Revelar>
        <div className="preguntas">
          {PREGUNTAS.map((q) => (
            <details key={q.pregunta}>
              <summary>{q.pregunta}</summary>
              <p>{q.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- cierre y pie ---------- */
export function Cierre() {
  return (
    <section className="seccion cierre" id="cierre" aria-labelledby="t-cierre">
      <Medidor decorativo />
      <div className="wrap">
        <Revelar id="t-cierre">Dentro de un año vas a desear haber empezado hoy.</Revelar>
        <p className="aparece" style={retraso('.4s')}>Escríbele a Luis y empieza esta semana. Te responde él mismo, por WhatsApp.</p>
        <Cuenta className="aparece" style={retraso('.55s')} />
        <a className="btn btn-rojo btn-brillo aparece" style={retraso('.7s')} href={wa(MENSAJES.general)} {...externo}><Icono id="wa" />Escribirle a Luis por WhatsApp</a>
        <p className="numero">O guarda el número: <a href={`tel:${TELEFONO}`}>{TELEFONO_VISIBLE}</a></p>
      </div>
    </section>
  );
}

export function PiePagina() {
  return (
    <footer>
      <div className="wrap">
        <img src="/assets/logo-blanco.webp" alt="English Time" width={200} height={144} loading="lazy" />
        <span>© 2026 English Time. Clases de inglés personalizadas 1 a 1 por Zoom, desde cualquier país.</span>
      </div>
    </footer>
  );
}
