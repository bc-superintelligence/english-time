import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

export default function NoEncontrada() {
  return (
    <main className="no-encontrada">
      <div className="wrap">
        <p className="cuenta-tit">Error 404</p>
        <h1>Esta página no existe.</h1>
        <p>Pero tus clases de inglés sí. Vuelve al inicio y mira cómo funcionan.</p>
        <Link className="btn btn-rojo" href="/">Ir al inicio</Link>
      </div>
    </main>
  );
}
