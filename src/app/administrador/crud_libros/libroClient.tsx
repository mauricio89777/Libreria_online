'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  getLibros,
  createLibro,
  updateLibro,
  deleteLibro,
  // Importa otras funciones si las necesitas
  // getLibrosByCategory,
  // getLibrosByAuthor
} from '@/services/libroService'; // Ajusta la ruta si es necesario

// Define la interfaz Libro aquí o impórtala desde services/libroServices.ts
// import { Libro } from '@/services/libroServices';
interface Libro {
  id?: number | string;
  title: string;
  description?: string;
  authorId: number | string;
  categoryId: number | string;
  // ... otros campos
}


const LibroClient = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  // Define un estado para el formulario, incluyendo todos los campos del libro
  const [form, setForm] = useState<Omit<Libro, 'id'> & { id: number | string | null }>({
    id: null,
    title: '',
    description: '',
    authorId: '',
    categoryId: '',
    // ... inicializa otros campos
  });
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''; // Obtén el token

  // Función para cargar los libros
  const fetchLibros = async () => {
    try {
      const res = await getLibros(token);
      setLibros(res.data); // Axios pone la respuesta del servidor en .data
    } catch (err) {
      console.error('Error al obtener libros:', err);
      // Manejar errores, por ejemplo, mostrar un mensaje al usuario
    }
  };

  // Cargar libros al montar el componente
  useEffect(() => {
    fetchLibros();
  }, [token]); // Dependencia del token si cambia

  // Manejar cambios en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
     // Convertir a número si el campo lo requiere (ej: authorId, categoryId)
    setForm({
      ...form,
      [name]: name === 'authorId' || name === 'categoryId' ? parseInt(value, 10) : value,
      // ... maneja otros tipos si es necesario
    });
  };

  // Manejar el envío del formulario (Crear o Actualizar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bookDataToSend = { // Prepara los datos a enviar (sin el ID para creación)
         title: form.title,
         description: form.description,
         authorId: form.authorId,
         categoryId: form.categoryId,
         // ... otros campos del formulario
      };

      if (form.id) {
        // Actualizar
        await updateLibro(form.id, bookDataToSend, token); // Envía solo los datos actualizados
        console.log('Libro actualizado');
      } else {
        // Crear
        await createLibro(bookDataToSend, token); // Envía los datos del nuevo libro
        console.log('Libro creado');
      }
      // Limpiar el formulario
      setForm({ id: null, title: '', description: '', authorId: '', categoryId: '' /* ...reset otros campos */ });
      // Volver a cargar la lista de libros
      fetchLibros();
    } catch (err) {
      console.error('Error al guardar libro:', err);
      // Manejar errores, por ejemplo, mostrar un mensaje de error del backend
       if (axios.isAxiosError(err) && err.response) {
         console.error('Detalles del error:', err.response.data);
         alert(`Error: ${err.response.data.message || 'Algo salió mal'}`);
       } else {
          alert('Error desconocido al guardar el libro');
       }
    }
  };

  // Manejar la edición de un libro
  const handleEdit = (libro: Libro) => {
    // Cargar los datos del libro seleccionado en el formulario
    setForm({
      id: libro.id || null, // Usar el ID del libro
      title: libro.title,
      description: libro.description || '',
      authorId: libro.authorId,
      categoryId: libro.categoryId,
      // ... cargar otros campos
    });
  };

  // Manejar la eliminación de un libro
  const handleDelete = async (id: number | string) => {
    if (confirm('¿Seguro que deseas eliminar este libro?')) {
      try {
        await deleteLibro(id, token);
        console.log('Libro eliminado');
        // Volver a cargar la lista de libros
        fetchLibros();
      } catch (err) {
        console.error('Error al eliminar libro:', err);
         if (axios.isAxiosError(err) && err.response) {
           console.error('Detalles del error:', err.response.data);
           alert(`Error: ${err.response.data.message || 'Algo salió mal al eliminar'}`);
         } else {
            alert('Error desconocido al eliminar el libro');
         }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestión de Libros</h2>

      {/* Formulario para crear/editar libro */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="title" // Asegúrate de que el 'name' coincida con los campos del estado y la API
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
         <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={form.description || ''} // Usar '' si es opcional
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {/* Ejemplo para authorId y categoryId - Podrías usar un select para elegir autores/categorías existentes */}
         <input
          type="number" // O text si manejas IDs como strings
          name="authorId"
          placeholder="ID del Autor"
          value={form.authorId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number" // O text si manejas IDs como strings
          name="categoryId"
          placeholder="ID de la Categoría"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Agrega inputs para otros campos del libro */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {form.id ? 'Actualizar Libro' : 'Crear Libro'}
        </button>
        {form.id && (
           <button
            type="button"
            onClick={() => setForm({ id: null, title: '', description: '', authorId: '', categoryId: '' /* ...reset otros campos */ })}
             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 ml-2"
          >
            Cancelar Edición
          </button>
        )}
      </form>

      {/* Tabla para mostrar los libros */}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Título</th>
             <th className="border px-4 py-2 text-left">Descripción</th>
             <th className="border px-4 py-2 text-left">Autor ID</th>
             <th className="border px-4 py-2 text-left">Categoría ID</th>
            {/* Agrega encabezados para otros campos */}
            <th className="border px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id} className="border-t">
              <td className="border px-4 py-2">{libro.id}</td>
              <td className="border px-4 py-2">{libro.title}</td>
              <td className="border px-4 py-2">{libro.description}</td>
              <td className="border px-4 py-2">{libro.authorId}</td>
              <td className="border px-4 py-2">{libro.categoryId}</td>
              {/* Muestra otros campos */}
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(libro)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                {/* Asegúrate de que libro.id no sea undefined antes de pasarlo */}
                {libro.id && (
                  <button
                    onClick={() => handleDelete(libro.id!)}
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
       {libros.length === 0 && <p className="text-center py-4">No hay libros disponibles.</p>}
    </div>
  );
};

export default LibroClient;