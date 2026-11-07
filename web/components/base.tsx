import type { CSSProperties, ElementType, ReactNode } from 'react';
import { Fragment } from 'react';

/** Retraso de la animación de entrada (variable CSS --d). */
export function retraso(d: string): CSSProperties {
  return { '--d': d } as CSSProperties;
}

/** Ícono del sprite SVG (#wa, #no, #si, #izq, #der, #reloj-logo). */
export function Icono({ id }: { id: string }) {
  return <svg aria-hidden="true"><use href={`#${id}`} /></svg>;
}

/** Sprite con todos los íconos de la página. */
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="wa" viewBox="0 0 24 24">
        <path d="M12 2.2a9.8 9.8 0 0 0-8.5 14.7L2.2 21.8l5-1.3A9.8 9.8 0 1 0 12 2.2z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8.7 7.2c.25-.55.5-.56.74-.57h.63c.21 0 .5.05.73.55l.95 2.2c.08.2.1.43-.05.63l-.7.86c-.16.19-.2.4-.07.62.5.86 1.18 1.66 1.98 2.3.64.5 1.33.86 2.03 1.15.24.1.47.03.62-.14l.86-1.04c.18-.22.42-.27.68-.17l2.05 1c.25.12.4.27.4.52 0 .55-.24 1.45-.96 1.95-.7.5-1.85.75-3.56.04-2.03-.84-3.66-2.43-4.66-4.07-.7-1.15-1.17-2.42-1.1-3.43.05-.9.4-1.6.83-2.2z" fill="currentColor" />
      </symbol>
      <symbol id="no" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".55" />
        <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </symbol>
      <symbol id="si" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11.5" fill="#D4111F" />
        <path d="M7.2 12.4l3.2 3.1 6.4-6.8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="reloj-logo" viewBox="0 0 64 64">
        <path d="M8 38a24 24 0 0 1 48 0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M32 40 23 27" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M32 40 45 23" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        <circle cx="32" cy="40" r="4.5" fill="currentColor" />
      </symbol>
      <symbol id="izq" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="der" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></symbol>
    </svg>
  );
}

/** El reloj del logo: arco, ondas y dos manecillas (héroe y cierre). */
export function Medidor({ decorativo = false }: { decorativo?: boolean }) {
  const accesible = decorativo ? { 'aria-hidden': true as const } : { role: 'img', 'aria-label': 'Reloj de English Time' };
  return (
    <svg className="medidor" viewBox="0 0 600 600" {...accesible}>
      <g fill="none" strokeLinecap="round">
        <path d="M55.7 231.1 A260 260 0 0 1 544.3 231.1" stroke="#D4111F" strokeWidth="16" />
        <g className="ondas">
          <path d="M337.3 108.3 A215 215 0 0 1 486.2 212.5" stroke="#D4111F" strokeWidth="9" strokeOpacity=".6" />
          <path d="M332.1 137.8 A185 185 0 0 1 460.2 227.5" stroke="#D4111F" strokeWidth="9" strokeOpacity=".5" />
          <path d="M326.9 167.4 A155 155 0 0 1 434.2 242.5" stroke="#D4111F" strokeWidth="9" strokeOpacity=".4" />
          <path d="M321.7 196.9 A125 125 0 0 1 408.3 257.5" stroke="#D4111F" strokeWidth="9" strokeOpacity=".3" />
          <path d="M316.5 226.4 A95 95 0 0 1 382.3 272.5" stroke="#D4111F" strokeWidth="9" strokeOpacity=".22" />
        </g>
        <path className="aguja aguja-a" d="M300 320 L214 197" stroke="currentColor" strokeWidth="26" />
        <path className="aguja aguja-b" d="M300 320 L441 152" stroke="#D4111F" strokeWidth="26" />
      </g>
      <circle cx="300" cy="320" r="24" fill="currentColor" />
    </svg>
  );
}

/** Titular cuyas palabras suben una por una al aparecer (clase .revelar). */
export function Revelar({ as: Etiqueta = 'h2', id, style, tema, children }: { as?: ElementType; id?: string; style?: CSSProperties; tema?: string; children: string }) {
  const texto = children.trim().replace(/\s+/g, ' ');
  return (
    <Etiqueta id={id} className="revelar" style={style} aria-label={tema ? `${tema}. ${texto}` : texto}>
      {tema && <span className="h1-tema" aria-hidden="true">{tema}</span>}
      {texto.split(' ').map((palabra, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true"><span style={{ '--i': i } as CSSProperties}>{palabra}</span></span>{' '}
        </Fragment>
      ))}
    </Etiqueta>
  );
}

/** Cuenta regresiva en cajas; los números los pone Interacciones cada segundo. */
export function Cuenta({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={`cuenta${className ? ' ' + className : ''}`} style={style} data-cuenta="">
      <p className="cuenta-tit">Las promociones terminan en</p>
      <div className="cajas" role="timer" aria-label="Tiempo que falta para el cierre de las promociones">
        <span className="caja"><b data-u="d">--</b><small>días</small></span>
        <span className="caja"><b data-u="h">--</b><small>horas</small></span>
        <span className="caja"><b data-u="m">--</b><small>min</small></span>
        <span className="caja"><b data-u="s">--</b><small>seg</small></span>
      </div>
    </div>
  );
}

export type ConHijos = { children?: ReactNode };
