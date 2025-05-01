import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories';

// Obtener todas las categorías
export const getCategorias = async (token: string) => {
  return await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Crear nueva categoría
export const createCategoria = async (data: any, token: string) => {
  return await axios.post(`${API_URL}`, { name: data.name}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Actualizar categoría
export const updateCategoria = async (id: string, data: any, token: string) => {
  return await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Eliminar categoría
export const deleteCategoria = async (id: string, token: string) => {
  return await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
