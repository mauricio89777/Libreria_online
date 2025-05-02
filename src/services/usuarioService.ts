import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const login = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/users/login`, { email, password });
};

export const getUsers = async (token: string) => {
  return await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
//usuario comun
export const createUser = async (data: any, token: string) => {
  return await axios.post(`${API_URL}/register`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = async (id: string, data: any, token: string) => {
  return await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = async (id: string, token: string) => {
  return await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const promoteUser = async (id: string, token: string) => {
  return await axios.patch(`${API_URL}/${id}/promote`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//---------------------------a futuro hacer una barra de busqueda
// Obtener usuario por ID-
export const getUserById = async (id: string, token: string) => {
    return await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
  // Obtener usuario por email
  export const getUserByEmail = async (email: string, token: string) => {
    return await axios.get(`${API_URL}/email/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };