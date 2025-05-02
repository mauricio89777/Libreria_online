'use client';

import React, { useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  promoteUser,
} from '@/services/usuarioService';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UsuarioClient() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', id: '' });
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? '' : '';

  const fetchUsuarios = async () => {
    try {
      const res = await getUsers(token);
      setUsuarios(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateUser(form.id, { name: form.name, email: form.email }, token);
      } else {
        await createUser(form, token);
      }
      setForm({ name: '', email: '', password: '', id: '' });
      fetchUsuarios();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user: User) => {
    setForm({ name: user.name, email: user.email, password: '', id: user.id });
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      await deleteUser(id, token);
      fetchUsuarios();
    }
  };

  const handlePromote = async (id: string) => {
    await promoteUser(id, token);
    fetchUsuarios();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>

      <form onSubmit={handleSubmit} className="space-x-2 mb-4">
        <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
        {!form.id && (
          <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        )}
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          {form.id ? 'Actualizar' : 'Crear'}
        </button>
      </form>

      <table className="table-auto w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nombre</th>
            <th className="p-2">Correo</th>
            <th className="p-2">Rol</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(u)} className="text-blue-600">Editar</button>
                <button onClick={() => handleDelete(u.id)} className="text-red-600">Eliminar</button>
                {u.role !== 'admin' && (
                  <button onClick={() => handlePromote(u.id)} className="text-green-600">Promover</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
