'use client';
import dynamic from 'next/dynamic';

// Cargar componente con client-side rendering
const CategoriaClient = dynamic(() => import('./categoriaClient'), { ssr: false });

export default function Page() {
  return (
    <div className="p-6">
      <CategoriaClient />
    </div>
  );
}
