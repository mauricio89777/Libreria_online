"use client"; // Necesario para usar hooks y eventos

import { useState } from "react";

// Tipado para los libros (opcional pero recomendado)
interface Libro {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  imagen?: string;
}

export default function Buscador() {
  const [query, setQuery] = useState("");
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarLibros = async () => {
    if (!query.trim()) {
      setError("Ingresa un término de búsqueda");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/libros?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setLibros(data);
    } catch (error) {
      console.error("Error:", error);
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Barra de búsqueda */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar libros..."
          className="flex-1 p-2 border rounded shadow-sm"
          onKeyDown={(e) => e.key === "Enter" && buscarLibros()}
        />
        <button
          onClick={buscarLibros}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Resultados */}
      {libros.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {libros.map((libro) => (
            <div
              key={libro.id}
              className="border rounded-lg p-4 hover:shadow-md"
            >
              {libro.imagen && (
                <img
                  src={libro.imagen}
                  alt={libro.title}
                  className="w-full h-48 object-contain mb-2"
                />
              )}
              <h3 className="font-bold text-lg">{libro.title}</h3>
              {libro.authors && (
                <p className="text-gray-600">{libro.authors.join(", ")}</p>
              )}
              <p className="text-sm mt-2 line-clamp-3">
                {libro.description || "Sin descripción disponible"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {loading ? "Cargando..." : error || "Ingresa un término de búsqueda"}
        </p>
      )}
    </div>
  );
}
