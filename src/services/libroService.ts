import axios from 'axios';

// Define la URL base de tu API para libros.
// ASEGÚRATE DE QUE ESTA URL COINCIDA CON TUS RUTAS EN EL BACKEND
// Por ejemplo, si tus rutas de libros empiezan con '/api/books', debería ser:
const API_URL = 'http://localhost:5000/api/books';

// Opcional pero recomendado: Define una interfaz para la estructura de un libro
// Ajusta los campos según los atributos que tenga tu modelo Book en el backend
interface Libro {
  id?: number | string; // ID es opcional para la creación
  title: string;
  description?: string;
  authorId: number | string; // Asumiendo que tienes un campo para el ID del autor
  categoryId: number | string; // Asumiendo que tienes un campo para el ID de la categoría
  // Agrega otros campos que tu modelo Libro tenga (ej: price, publicationDate, stock, etc.)
  // price?: number;
  // publicationDate?: string; // Considerar tipo Date si aplica
  // stock?: number;
}

// Obtener todos los libros
export const getLibros = async (token: string) => {
  return await axios.get<Libro[]>(`${API_URL}`, { // <Libro[]> indica que se espera un array de Libros
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Crear nuevo libro
// Recibe un objeto con los datos del libro (sin ID)
export const createLibro = async (bookData: Omit<Libro, 'id'>, token: string) => {
  // El backend espera los datos directamente en req.body según tu controlador createBook
  return await axios.post<Libro>(`${API_URL}`, bookData, { // <Libro> indica que se espera un solo objeto Libro en la respuesta (o el formato { id, message })
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Obtener un libro por ID
export const getLibroById = async (id: number | string, token: string) => {
  return await axios.get<Libro>(`${API_URL}/${id}`, { // <Libro> indica que se espera un solo objeto Libro
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Actualizar un libro por ID
// Recibe el ID y un objeto con los datos a actualizar (pueden ser parciales)
export const updateLibro = async (id: number | string, updatedData: Partial<Libro>, token: string) => {
  // El backend espera los datos actualizados en req.body según tu controlador updateBook
  return await axios.put<Libro>(`${API_URL}/${id}`, updatedData, { // Partial<Libro> indica que updatedData puede tener solo algunos campos de Libro
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Eliminar un libro por ID
export const deleteLibro = async (id: number | string, token: string) => {
  return await axios.delete(`${API_URL}/${id}`, { // No se espera un cuerpo de respuesta específico, solo un mensaje
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Obtener libros por categoría
export const getLibrosByCategory = async (categoryId: number | string, token: string) => {
   // ASEGÚRATE DE QUE LA RUTA COINCIDA CON TU BACKEND (ej: /api/books/category/:categoryId)
  return await axios.get<Libro[]>(`${API_URL}/category/${categoryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Obtener libros por autor
export const getLibrosByAuthor = async (authorId: number | string, token: string) => {
  // ASEGÚRATE DE QUE LA RUTA COINCIDA CON TU BACKEND (ej: /api/books/author/:authorId)
  return await axios.get<Libro[]>(`${API_URL}/author/${authorId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};