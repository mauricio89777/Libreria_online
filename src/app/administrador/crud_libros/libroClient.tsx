'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  getLibros,
  createLibro,
  updateLibro,
  deleteLibro,
} from '@/services/libroService';
import { Book } from '@/app/types/book';
import { BookFormData } from '@/app/types/typeform';


const LibroClient = () => {
  const [libros, setLibros] = useState<Book[]>([]); 
  const [form, setForm] = useState<BookFormData>({ 
    id: null,
    title: '',
    description: null, 
    authorId: null, 
    categoryId: null, 
    price: 0,
    rating: 0,
    image: null, 
    stock: 0,
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const fetchLibros = async () => {
    try {
      const res = await getLibros(token);
      setLibros(res.data);
    } catch (err) {
      console.error('Error al obtener libros:', err);
      alert('Error al cargar la lista de libros.');
    }
  };

  useEffect(() => {
    fetchLibros();
  }, [token]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev) => {
      let updatedValue: string | number | null = value;

      if (name === 'authorId' || name === 'categoryId' || name === 'price' || name === 'rating' || name === 'stock') {
        
        if (value === '') {
            updatedValue = null; 
        } else {
            updatedValue = name === 'price' || name === 'rating' ? parseFloat(value) : parseInt(value, 10);

            if (typeof updatedValue === 'number' && isNaN(updatedValue)) {
                updatedValue = (name === 'authorId' || name === 'categoryId') ? null : 0;
                console.warn(`Entrada inválida para ${name}: "${value}". Establecido a ${updatedValue}.`);
            }
        }
      }
      if (name === 'description' || name === 'image') {
          updatedValue = value === '' ? null : value; 
      }


      return {
        ...prev,
        [name]: updatedValue, 
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bookDataToSend = { 
        title: form.title,
        description: form.description,
        author_id: form.authorId, 
        category_id: form.categoryId, 
        price: form.price,
        rating: form.rating,
        image: form.image,
        stock: form.stock,
      };

      if (form.id) {
         await updateLibro(form.id, bookDataToSend, token);

      } else {
        const res = await createLibro(bookDataToSend, token);
        console.log('Respuesta creación:', res.data);
         alert(`Libro creado exitosamente (ID: ${res.data.id?.id || 'N/A'})`);

      }
      setForm({
        id: null,
        title: '',
        description: null,
        authorId: null,
        categoryId: null,
        price: 0,
        rating: 0,
        image: null,
        stock: 0,
      });

      fetchLibros(); 
    } catch (err) {
      console.error('Error al guardar libro:', err);
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message || 'Error desconocido al guardar';
        alert(`Error al guardar libro: ${errorMessage}`);
      } else {
        alert('Error desconocido al guardar el libro');
      }
    }
  };


  const handleEdit = (libro: Book) => { 
    setForm({ 
      id: libro.id || null,
      title: libro.title,
      description: libro.description ?? null,
      authorId: libro.author_id ?? null, 
      categoryId: libro.category_id ?? null, 
      price: libro.price,
      rating: libro.rating,
      image: libro.image ?? null,
      stock: libro.stock,
    });
  };

  const handleDelete = async (id: number | string | null) => {
      
    if (id === null || id === undefined) {
        console.error("Intento de eliminar con ID nulo o indefinido.");
        alert("No se puede eliminar: ID de libro inválido.");
        return;
    }

    if (confirm('¿Seguro que deseas eliminar este libro?')) {
      try {
        // deleteLibro espera number | string, nuestro id es number | string | null, así que confirmamos que no es null
        await deleteLibro(id, token);
        console.log('Libro eliminado');
        alert('Libro eliminado exitosamente');
        fetchLibros(); // Volver a cargar la lista
      } catch (err) {
        console.error('Error al eliminar libro:', err);
         if (axios.isAxiosError(err)) {
            const errorMessage = err.response?.data?.message || err.message || 'Error desconocido al eliminar';
            alert(`Error al eliminar libro: ${errorMessage}`);
        } else {
          alert('Error desconocido al eliminar el libro');
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Libros</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
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
          value={form.description ?? ''} // Usamos ?? '' para mostrar vacío si es null
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="authorId" 
          placeholder="ID del Autor"
          value={form.authorId === null ? '' : String(form.authorId)} // Muestra null como vacío
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          // required <-- El backend podría requerirlo, pero si permites null en form, no lo hagas required aquí
        />
        <input
          type="number"
          name="categoryId" 
          placeholder="ID de la Categoría"
           value={form.categoryId === null ? '' : String(form.categoryId)} // Muestra null como vacío
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          // required <-- Igual que authorId
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          //required // El precio suele ser requerido y no null
        />
        <input
          type="number"
          name="rating"
          placeholder="Calificación"
          value={form.rating}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          // required no creo que poner la calificacion se required? 
        />
        <input
          type="text"
          name="image"
          placeholder="URL de la imagen"
          value={form.image ?? ''} 
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required 
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {form.id ? 'Actualizar Libro' : 'Crear Libro'}
        </button>
        {form.id && (
          <button
            type="button"
            onClick={() =>
              setForm({
                id: null,
                title: '',
                description: null,
                authorId: null,
                categoryId: null,
                price: 0,
                rating: 0,
                image: null,
                stock: 0,
              })
            }
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 ml-2"
          >
            Cancelar Edición
          </button>
        )}
      </form>
      <h3 className="text-xl font-bold mb-2">Lista de Libros</h3>
      <div className="overflow-x-auto"> 
      <table className="w-full border border-gray-300 "> 
        {/* bg-white */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Título</th>
            <th className="border px-4 py-2 text-left">Descripción</th>
            <th className="border px-4 py-2 text-left">Autor ID</th>
            <th className="border px-4 py-2 text-left">Categoría ID</th>
            <th className="border px-4 py-2 text-left">Precio</th>
            <th className="border px-4 py-2 text-left">Calificación</th>
            <th className="border px-4 py-2 text-left">Imagen URL</th>
            <th className="border px-4 py-2 text-left">Stock</th>
            <th className="border px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {libros.map((libro) => (
            <tr key={libro.id} className="border-t">
            <td className="border px-4 py-2 text-sm">{libro.id}</td>
            <td className="border px-4 py-2 text-sm">{libro.title}</td>
            <td className="border px-4 py-2 text-sm max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
              {libro.description ?? 'N/A'}
            </td>
            <td className="border px-4 py-2 text-sm">{libro.author_id ?? 'N/A'}</td>
            <td className="border px-4 py-2 text-sm">{libro.category_id ?? 'N/A'}</td>
            <td className="border px-4 py-2 text-sm">{libro.price}</td>
            <td className="border px-4 py-2 text-sm">{libro.rating}</td>
            <td className="border px-4 py-2 text-sm max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
              {libro.image ?? 'N/A'}
            </td>
            <td className="border px-4 py-2 text-sm">{libro.stock}</td>
            <td className="border px-4 py-2 text-sm space-x-1">
              <button
                onClick={() => handleEdit(libro)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs"
              >
                Editar
              </button>
              {libro.id !== null && libro.id !== undefined && (
                <button
                  onClick={() => handleDelete(libro.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                >
                  Eliminar
                </button>
              )}
            </td>
          </tr>
          ))}
           {libros.length === 0 && (
              <tr><td colSpan={10} className="text-center py-4">No hay libros disponibles.</td></tr>
            )}
        </tbody>
      </table>
       </div> 
    </div>
  );
};

export default LibroClient;