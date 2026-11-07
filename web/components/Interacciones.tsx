'use client';

import { useEffect } from 'react';
import { FIN_PROMOS } from '@/lib/contenido';

/* Toda la vida de la página: entradas al hacer scroll, cuenta regresiva, el día que cambia de color,
   la barra fija de WhatsApp y el mazo de promociones. Es la misma lógica de la landing original;
   trabaja sobre el HTML que ya pintó el servidor y no renderiza nada. */
export default function Interacciones() {
  useEffect(() => {
    const limpiar: Array<() => void> = [];
    const escuchar = (el: EventTarget, tipo: string, fn: EventListener, opciones?: AddEventListenerOptions) => {
      el.addEventListener(tipo, fn, opciones);
      limpiar.push(() => el.removeEventListener(tipo, fn, opciones));
    };
    const temporizadores: number[] = [];
    const despues = (fn: () => void, ms: number) => { temporizadores.push(window.setTimeout(fn, ms)); };

    const movimiento = document.documentElement.classList.contains('anim');
    const dos = (n: number) => (n < 10 ? '0' : '') + n;
    const todos = <T extends Element = HTMLElement>(sel: string, raiz: ParentNode = document) => Array.from(raiz.querySelectorAll<T>(sel));

    /* 1. Entradas al hacer scroll: cada bloque se marca una sola vez cuando aparece. */
    const deck = document.getElementById('deck') as HTMLElement;
    const revelables = todos('.revelar, .aparece, .escena, .versus-fila, .pasos, .plan, .objetivo, .cierre, .deck');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('visto');
          if (e.target === deck) { deck.classList.add('repartir'); despues(() => deck.classList.remove('repartir'), 1300); }
          io.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      revelables.forEach((el) => io.observe(el));
      limpiar.push(() => io.disconnect());
    } else {
      revelables.forEach((el) => el.classList.add('visto'));
    }

    /* 2. Cuenta regresiva hasta el cierre de las promociones. */
    const fin = new Date(FIN_PROMOS).getTime();
    let intervalo = 0;
    const tic = () => {
      const ms = fin - Date.now();
      if (ms <= 0) {
        todos('[data-cuenta]').forEach((c) => { c.innerHTML = '<p class="cuenta-tit">Las promociones de Black Friday terminaron. Escríbele a Luis para conocer las de diciembre.</p>'; });
        todos('[data-cuenta-corta]').forEach((c) => { c.textContent = 'ya terminaron'; });
        return false;
      }
      const t: Record<string, number> = { d: Math.floor(ms / 864e5), h: Math.floor(ms % 864e5 / 36e5), m: Math.floor(ms % 36e5 / 6e4), s: Math.floor(ms % 6e4 / 1e3) };
      todos('[data-cuenta] [data-u]').forEach((b) => {
        const v = dos(t[b.dataset.u as string]);
        if (b.textContent === v) return;
        b.textContent = v;
        if (movimiento) { b.classList.remove('tic'); void b.offsetWidth; b.classList.add('tic'); }
      });
      todos('[data-cuenta-corta]').forEach((c) => { c.textContent = t.d + 'd ' + dos(t.h) + 'h ' + dos(t.m) + 'm ' + dos(t.s) + 's'; });
      return true;
    };
    if (tic()) intervalo = window.setInterval(() => { if (!tic()) window.clearInterval(intervalo); }, 1000);
    limpiar.push(() => window.clearInterval(intervalo));

    /* 3. Un día en inglés: cada escena cambia el color de la sección y mueve los relojes a su hora. */
    const dia = document.getElementById('dia') as HTMLElement;
    const escenas = todos('.escena', dia);
    const ahora = escenas[escenas.length - 1];
    const miniHora = dia.querySelector('.mini-hora') as HTMLElement;
    const miniPasos = todos('.mini-pasos i', dia);
    let activa: HTMLElement | null = null;
    let minActual = 420, girado = 0;
    const etiqueta = (min: number) => { const h = Math.floor(min / 60) % 24; return (h % 12 || 12) + ':' + dos(min % 60) + ' ' + (h < 12 ? 'a.m.' : 'p.m.'); };
    // Las manecillas giran por el camino más corto (hasta 6 horas hacia adelante o hacia atrás).
    const mover = (min: number) => {
      let d = ((min - minActual) % 720 + 720) % 720;
      if (d > 360) d -= 720;
      girado += d; minActual = min;
      todos<SVGElement>('.mano-h', dia).forEach((x) => { x.style.transform = 'rotate(' + (210 + girado * 0.5) + 'deg)'; });
      todos<SVGElement>('.mano-m', dia).forEach((x) => { x.style.transform = 'rotate(' + (girado * 6) + 'deg)'; });
    };
    const pintarAhora = () => {
      const d = new Date(), h = d.getHours(), m = d.getMinutes(), min = h * 60 + m;
      (document.getElementById('previa-ahora') as HTMLElement).textContent = (h % 12 || 12) === 1 ? 'Y ahora mismo es la' : 'Y ahora mismo son las';
      (document.getElementById('hora-ahora') as HTMLElement).innerHTML = (h % 12 || 12) + ':' + dos(m) + '<small>' + (h < 12 ? 'a.m.' : 'p.m.') + '</small>';
      ahora.dataset.min = String(min);
      if (activa === ahora) { mover(min); miniHora.textContent = etiqueta(min); }
    };
    pintarAhora();
    const relojAhora = window.setInterval(pintarAhora, 30000);
    limpiar.push(() => window.clearInterval(relojAhora));
    const revisarDia = () => {
      const mitad = innerHeight / 2;
      let nueva: HTMLElement | null = null;
      for (const e of escenas) {
        const r = e.getBoundingClientRect();
        if (r.top <= mitad && r.bottom > mitad) { nueva = e; break; }
      }
      if (!nueva) nueva = escenas[0].getBoundingClientRect().top > mitad ? escenas[0] : ahora;
      if (nueva === activa) return;
      activa = nueva;
      const idx = escenas.indexOf(nueva);
      dia.dataset.momento = nueva.dataset.momento;
      mover(Number(nueva.dataset.min));
      miniHora.textContent = etiqueta(Number(nueva.dataset.min));
      miniPasos.forEach((p, i) => p.classList.toggle('on', i <= idx));
    };

    /* 4. Barra fija de WhatsApp: visible entre el botón del héroe y el cierre. */
    const fija = document.getElementById('fija') as HTMLElement;
    const accionesHero = document.querySelector('.hero .acciones') as HTMLElement;
    const cierre = document.getElementById('cierre') as HTMLElement;
    let fijaVisible = false;
    const revisarFija = () => {
      const ver = accionesHero.getBoundingClientRect().bottom < 0 && cierre.getBoundingClientRect().top > innerHeight * 0.55;
      if (ver === fijaVisible) return;
      fijaVisible = ver;
      fija.classList.toggle('visible', ver);
      fija.setAttribute('aria-hidden', String(!ver));
      if (ver) fija.removeAttribute('inert'); else fija.setAttribute('inert', '');
    };

    let pendiente = false, cuadro = 0;
    const alScroll = () => { pendiente = false; revisarDia(); revisarFija(); };
    const pedir = () => { if (!pendiente) { pendiente = true; cuadro = requestAnimationFrame(alScroll); } };
    escuchar(window, 'scroll', pedir, { passive: true });
    escuchar(window, 'resize', pedir);
    escuchar(window, 'load', pedir);
    limpiar.push(() => cancelAnimationFrame(cuadro));
    alScroll();

    /* 5. Mazo de promociones: avanza solo como historias, se puede deslizar, tocar o usar con las flechas. */
    type Carta = HTMLElement & { _t?: number };
    const cartas = todos<Carta>('.carta', deck);
    const tabs = todos('.deck-tab', deck);
    const paneles = todos('.deck-panel', deck);
    const num = deck.querySelector('.deck-num') as HTMLElement;
    const mesa = deck.querySelector('.deck-mesa') as HTMLElement;
    const n = cartas.length;
    let act = 0, auto = movimiento, enVista = false, encima = false;

    const pintarDeck = () => {
      cartas.forEach((c, i) => { c.dataset.o = String((i - act + n) % n); });
      tabs.forEach((t, i) => { t.setAttribute('aria-selected', String(i === act)); t.tabIndex = i === act ? 0 : -1; });
      paneles.forEach((p, i) => {
        const on = i === act;
        p.classList.toggle('activo', on);
        p.setAttribute('aria-hidden', String(!on));
        if (on) p.removeAttribute('inert'); else p.setAttribute('inert', '');
      });
      num.textContent = (act + 1) + ' / ' + n;
    };
    const sinTransicion = (el: HTMLElement, fn: () => void) => { el.style.transition = 'none'; fn(); void el.offsetWidth; el.style.transition = ''; };
    const ir = (destino: number, dir: number) => {
      const nueva = (destino + n) % n;
      if (nueva === act) return;
      const vieja = cartas[act], entra = cartas[nueva];
      if (movimiento && dir > 0) {
        // La carta de adelante sale volando a la izquierda y vuelve al fondo del mazo.
        window.clearTimeout(vieja._t);
        vieja.classList.add('sale');
        vieja._t = window.setTimeout(() => sinTransicion(vieja, () => vieja.classList.remove('sale')), 460);
      } else if (movimiento && dir < 0) {
        // La carta anterior entra desde la izquierda.
        window.clearTimeout(entra._t);
        sinTransicion(entra, () => entra.classList.add('sale'));
        requestAnimationFrame(() => requestAnimationFrame(() => entra.classList.remove('sale')));
      }
      act = nueva;
      pintarDeck();
    };
    limpiar.push(() => cartas.forEach((c) => window.clearTimeout(c._t)));
    const estadoAuto = () => {
      deck.classList.toggle('auto', auto);
      deck.classList.toggle('pausa', !enVista || encima || document.hidden);
    };
    const parar = () => { if (auto) { auto = false; estadoAuto(); } };

    escuchar(deck, 'animationend', ((e: AnimationEvent) => {
      if (auto && e.animationName === 'llenar' && (e.target as Element).closest('.deck-tab') === tabs[act]) ir(act + 1, 1);
    }) as EventListener);
    escuchar(deck, 'mouseenter', () => { encima = true; estadoAuto(); });
    escuchar(deck, 'mouseleave', () => { encima = false; estadoAuto(); });
    escuchar(document, 'visibilitychange', estadoAuto);
    if ('IntersectionObserver' in window) {
      const vista = new IntersectionObserver((es) => { enVista = es[0].isIntersecting; estadoAuto(); }, { threshold: 0.35 });
      vista.observe(deck);
      limpiar.push(() => vista.disconnect());
    }

    tabs.forEach((t, i) => {
      escuchar(t, 'click', () => { parar(); ir(i, i > act ? 1 : -1); });
      escuchar(t, 'keydown', ((e: KeyboardEvent) => {
        const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!k) return;
        e.preventDefault(); parar(); ir(act + k, k); tabs[act].focus();
      }) as EventListener);
    });
    todos('.deck-flecha', deck).forEach((b) => {
      escuchar(b, 'click', () => { parar(); const d = Number(b.dataset.dir); ir(act + d, d); });
    });

    // Arrastrar con el dedo o el mouse; un toque en la carta de adelante abre el WhatsApp de esa promo.
    let x0: number | null = null, dx = 0, arrastra = false, puntero: number | null = null, objetivo: Carta | null = null;
    escuchar(mesa, 'pointerdown', ((e: PointerEvent) => {
      if (e.button) return;
      x0 = e.clientX; dx = 0; arrastra = false; puntero = e.pointerId; objetivo = (e.target as Element).closest('.carta');
    }) as EventListener);
    escuchar(mesa, 'pointermove', ((e: PointerEvent) => {
      if (x0 === null || e.pointerId !== puntero) return;
      dx = e.clientX - x0;
      if (!arrastra && Math.abs(dx) > 8) {
        arrastra = true; parar();
        try { mesa.setPointerCapture(puntero); } catch { /* el puntero ya se soltó */ }
        cartas[act].style.transition = 'none';
      }
      if (arrastra) cartas[act].style.transform = 'translateX(' + dx + 'px) rotate(' + (dx / 18) + 'deg)';
    }) as EventListener);
    const soltar = ((e: PointerEvent) => {
      if (x0 === null) return;
      x0 = null;
      const frente = cartas[act];
      if (!arrastra) {
        if (e.type !== 'pointerup' || !objetivo) return;
        const i = cartas.indexOf(objetivo);
        if (i === act) (paneles[act].querySelector('a.btn') as HTMLAnchorElement).click();
        else { parar(); ir(i, 1); }
        return;
      }
      frente.style.transition = ''; frente.style.transform = '';
      if (dx < -60) ir(act + 1, 1);
      else if (dx > 60) ir(act - 1, -1);
    }) as EventListener;
    escuchar(mesa, 'pointerup', soltar);
    escuchar(mesa, 'pointercancel', soltar);

    pintarDeck();
    estadoAuto();

    return () => {
      temporizadores.forEach((t) => window.clearTimeout(t));
      limpiar.forEach((fn) => fn());
    };
  }, []);

  return null;
}
