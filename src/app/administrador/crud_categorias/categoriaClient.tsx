import React, { useEffect, useState } from 'react';
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from '@/services/categoriaService';

interface Categoria {
  id: string ;
  name: string;  // Cambié 'nombre' a 'name'
}

const CategoriaClient = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<{ nombre: string; id: string | null }>({ nombre: '', id: null });
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const fetchCategorias = async () => {
    try {
      const res = await getCategorias(token);
      setCategorias(res.data);
    } catch (err) {
      console.error('Error al obtener categorías:', err);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateCategoria(form.id, { name: form.nombre }, token);  // Usamos 'name' aquí
      } else {
        await createCategoria({ name: form.nombre }, token);  // Usamos 'name' aquí
      }
      setForm({ nombre: '', id: null });
      fetchCategorias();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setForm({ nombre: categoria.name, id: categoria.id });  // Usamos 'name' aquí
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      await deleteCategoria(id, token);
      fetchCategorias();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestión de Categorías</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de categoría"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {form.id ? 'Actualizar' : 'Crear'}
        </button>
      </form>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {/* ¡AGREGA ESTE ENCABEZADO PARA EL ID! */}
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Nombre</th>
            <th className="border px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id} className="border-t">
              {/* ¡AGREGA ESTA CELDA PARA MOSTRAR EL ID! */}
              <td className="border px-4 py-2">{cat.id}</td>
              <td className="border px-4 py-2">{cat.name}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                {/* Asegúrate de que cat.id exista antes de pasarla para eliminar */}
                {cat.id && (
                   <button
                     onClick={() => handleDelete(cat.id!)}
                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                   >
                     Eliminar
                   </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};
//hice cambios aqui en relacion a id
export default CategoriaClient;
