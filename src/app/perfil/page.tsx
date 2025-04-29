// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/auth-context";

// export default function PerfilPage() {
//   const { user, isLoading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     // Verificación cuando el estado no está cargando
//     if (!isLoading) {
//       // Si no hay usuario, redirigir al login
//       if (!user) {
//         router.push("/login");
//         return;
//       }
//     }
//   }, [user, isLoading, router]);

//   if (isLoading) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {user && <h1>¡Hola, {user.role === "admin" ? "Admin" : "Usuario"}!</h1>}
//     </div>
//   );
// }




"use client";

import React, { useState } from 'react';

export default function PerfilFormularioEstaticoConBoton() {
  // Estado para manejar los valores de los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    celular: '',
    rut: '',
    correo: '',
  });

  // Manejador genérico para cambios en los inputs
  // Para TypeScript, el tipo sería: (e: React.ChangeEvent<HTMLInputElement>)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejador para el evento de envío del formulario
  // Para TypeScript, el tipo sería: (e: React.FormEvent<HTMLFormElement>)
  const handleSubmit = (e) => {
    // Prevenir el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault();

    // Aquí es donde normalmente enviarías los datos a un servidor o API.
    // Como es estático, solo mostraremos los datos en la consola.
    console.log("Datos del formulario a enviar (simulado):", formData);

    // Opcional: Mostrar una alerta al usuario
    alert("Formulario 'enviado' (revisa la consola del navegador).");

 
  };

  return (
    <div className="container mx-auto p-4">
      {/* Ahora usamos <form> y añadimos onSubmit */}
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 border-b pb-3 text-gray-800">
          Datos personales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
          {/* Campo Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-600 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border-0 border-b border-gray-300 px-1 py-1 focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm bg-transparent"
              placeholder="Ingresa tu nombre"
            />
          </div>

          {/* Campo Apellido */}
          <div className="mb-3">
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-600 mb-1">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="mt-1 block w-full border-0 border-b border-gray-300 px-1 py-1 focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm bg-transparent"
              placeholder="Ingresa tu apellido"
            />
          </div>

          {/* Campo Fecha Nacimiento */}
          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-600 mb-1">
              Fecha-nacimiento
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="mt-1 block w-full border-0 border-b border-gray-300 px-1 py-1 focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm bg-transparent text-gray-700"
            />
          </div>

          {/* Campo Celular */}
          <div className="mb-3">
            <label htmlFor="celular" className="block text-sm font-medium text-gray-600 mb-1">
              Celular
            </label>
            <input
              type="tel"
              id="celular"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              className="mt-1 block w-full border-0 border-b border-gray-300 px-1 py-1 focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm bg-transparent"
              placeholder="Ej: 912345678"
            />
          </div>

          {/* Campo Rut */}
          <div className="mb-3">
            <label htmlFor="rut" className="block text-sm font-medium text-gray-600 mb-1">
              Rut
            </label>
            <input
              type="text"
              id="rut"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              className="mt-1 block w-full border-0 border-b border-gray-300 px-1 py-1 focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm bg-transparent"
              placeholder="Ej: 12345678-9"
            />
          </div>

          {/* Campo Correo Electrónico */}
          <div className="mb-3">
            <label htmlFor="correo" className="block text-sm font-medium text-gray-600 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="mt-1 block w-full border-0 border-b border-gray-300 px-1 py-1 focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm bg-transparent"
              placeholder="tu@correo.com"
            />
          </div>
        </div>

        {/* --- Botón de Enviar --- */}
        <div className="mt-8 text-right"> {/* Espacio antes del botón y alineación a la derecha */}
          <button
            type="submit" // Importante: type="submit" para que active el onSubmit del form
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Enviar
          </button>
        </div>
        {/* --- Fin Botón de Enviar --- */}

      </form>
    </div>
  );
}