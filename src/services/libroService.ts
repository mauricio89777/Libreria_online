import axios from 'axios';
import { Book } from '@/app/types/book'; // Importa el TIPO Book (estructura API GET)
import { BookFormData } from '@/app/types/typeform'; // Importa el TIPO BookFormData (estructura formulario)

const API_URL = 'http://localhost:5000/api/books'; // ¡Verifica que sea correcto!

type BookApiPayload = {
   title: string;
   description: string | null;
   author_id: number | null; // <-- NOMBRE DE CAMPO QUE ESPERA EL BACKEND
   category_id: number | null; // <-- NOMBRE DE CAMPO QUE ESPERA EL BACKEND
   price: number;
   rating: number;
   image: string | null;
   stock: number;
};


type CreateBookResponse = {
    id: Book; // Tu backend devuelve el libro completo dentro de un campo 'id'
    message: string;
};

type UpdateBookResponse = {
    message: string; // para que pasa
};


// Función: Obtener todos los libros
// **Asegúrate de que axios.get esté anotado con <Book[]>**
export const getLibros = async (token: string) => {
  return await axios.get<Book[]>(`${API_URL}`, { // <--- ¡Aquí debe ser Book[]!
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Función: Crear nuevo libro
// **Asegúrate de que reciba BookApiPayload y axios.post esté anotado con <CreateBookResponse>**
export const createLibro = async (bookData: BookApiPayload, token: string) => { // <--- ¡Aquí debe ser BookApiPayload!
  return await axios.post<CreateBookResponse>(`${API_URL}`, bookData, { // <--- ¡Aquí debe ser CreateBookResponse!
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Función: Actualizar un libro por ID
// **Asegúrate de que reciba Partial<BookApiPayload> y axios.put esté anotado con <UpdateBookResponse>**
export const updateLibro = async (id: number | string, updatedData: Partial<BookApiPayload>, token: string) => { // <--- ¡Aquí debe ser Partial<BookApiPayload>!
  return await axios.put<UpdateBookResponse>(`${API_URL}/${id}`, updatedData, { // <--- ¡Aquí debe ser UpdateBookResponse!
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Función: Eliminar un libro por ID
export const deleteLibro = async (id: number | string, token: string) => {
  // No se espera un cuerpo específico, el tipo de respuesta puede ser 'any' o 'void' si no devuelve JSON
  return await axios.delete<any>(`${API_URL}/${id}`, { // <any> o <void> si no hay JSON de respuesta
    headers: { Authorization: `Bearer ${token}` },
  });
};
