import axios from 'axios';
import { Book } from '@/app/types/book'; 
import { BookFormData } from '@/app/types/typeform'; // debria improtarlo??

const API_URL = 'http://localhost:5000/api/books'; 


type BookApiPayload = {
   title: string;
   description: string | null;
   author_id: number | null; 
   category_id: number | null; 
   price: number;
   rating: number;
   image: string | null;
   stock: number;
};


type CreateBookResponse = {
    id: Book; 
    message: string;
};

type UpdateBookResponse = {
    message: string; 
};


export const getLibros = async (token: string) => {
  return await axios.get<Book[]>(`${API_URL}`, { 
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createLibro = async (bookData: BookApiPayload, token: string) => { 
  return await axios.post<CreateBookResponse>(`${API_URL}`, bookData, { 
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateLibro = async (id: number | string, updatedData: Partial<BookApiPayload>, token: string) => { 
  return await axios.put<UpdateBookResponse>(`${API_URL}/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Función: Eliminar un libro por ID
export const deleteLibro = async (id: number | string, token: string) => {
  return await axios.delete<any>(`${API_URL}/${id}`, { 
    headers: { Authorization: `Bearer ${token}` },
  });
};
