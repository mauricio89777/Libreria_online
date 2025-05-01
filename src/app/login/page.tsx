'use client'; // Indica que este componente es un Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Para redireccionar en Client Components
import { useAuth } from '@/app/context/auth-context'; // Tu hook de autenticación
// Importa tus componentes UI con estilos Tailwind (asegura que las rutas son correctas)
// -> Asegúrate de que estos componentes (`Button`, `Input`) existen en tu proyecto
// -> Y que Tailwind CSS está configurado correctamente
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Link from "next/link"; // Para enlaces internos de Next.js

export default function LoginPage() {
  const [email, setEmail] = useState(''); // Estado para el campo de email
  const [password, setPassword] = useState(''); // Estado para el campo de password

  // Obtiene el estado de autenticación y la función de login del contexto
  // Obtiene 'login' (la función), 'isLoading', 'error', 'isAuthenticated', 'user' (el objeto de usuario)
  const { login, isLoading, error, isAuthenticated, user } = useAuth();
  const router = useRouter(); // Hook de Next.js para manejar la navegación

  // useEffect para manejar la redirección automática:
  // - Se ejecuta cuando cambian 'isAuthenticated', 'isLoading', o 'user'.
  useEffect(() => {
    // Solo intenta redirigir si la carga inicial del contexto de autenticación ha terminado
    // Y si el usuario está actualmente autenticado
    if (!isLoading && isAuthenticated) {
      // Verifica el rol del usuario usando la propiedad 'role' del objeto 'user'
      // que obtienes del contexto. Este es el objeto de tipo User.
      if (user?.role === 'admin') {
        // Redirige a la ruta del dashboard de administrador
        router.push('/perfil'); // Cambia a la ruta real si es diferente
      } else {
        // Redirige a la ruta del dashboard de usuario estándar
        router.push('/perfil'); // Cambia a la ruta real si es diferente
      }
    }
    // Las dependencias del efecto: se re-ejecuta si estos valores cambian.
  }, [isAuthenticated, isLoading, user, router]); // Dependencias del efecto

  // Handler para el envío del formulario de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario

    // Llama a la función login del contexto.
    // Como modificamos AuthContext, esta función ahora devuelve un Promise<AuthResponse>.
    // Esto coincide con la expectativa de tu código original '{ success, isAdmin } = await login(...)'.
    const { success, isAdmin } = await login(email, password);

    // Opcional: Si el login fue exitoso según el valor retornado ('success' del AuthResponse).
    // La redirección principal se maneja en el useEffect, pero este bloque puede dar
    // una respuesta ligeramente más rápida justo después de que la promesa login se resuelve.
    // Si confías completamente en el useEffect, podrías eliminar este bloque.
    // Mantenemos el bloque porque estaba en tu código original.
     if (success) {
       // Aquí usas 'isAdmin' que vino en la respuesta inmediata de la función login
       // (calculada por el AuthContext desde el rol del usuario retornado por el backend).
       router.push(isAdmin ? "/admin/dashboard" : "/dashboard"); // Usa isAdmin de la respuesta inmediata
     }

    // Si 'success' fue false, el estado 'error' en el contexto se habrá actualizado dentro de 'login',
    // y el error se mostrará en el JSX automáticamente.
  };


  // Renderizado del componente con los estilos y componentes de tu código original
  return (
    // Contenedor principal con clases de diseño Tailwind (container, flexbox, altura mínima, padding horizontal)
    <div className="container flex min-h-[80vh] items-center justify-center px-4">
      {/* Contenedor del formulario con ancho máximo y espaciado vertical (space-y-6) */}
      <div className="w-full max-w-md space-y-6">
        {/* Título del formulario con estilos de fuente y tamaño */}
        <h1 className="text-3xl font-bold text-center">Iniciar Sesión</h1> {/* Añadí text-center */}

        {/* Muestra el error que proviene del contexto 'error' si existe, con estilos para errores */}
        {error && (
          <div className="rounded-md bg-red-100 p-3 text-red-700">{error}</div>
        )}

        {/* Condicional para mostrar diferentes contenidos según el estado de carga y autenticación */}
        {isLoading ? (
          // Muestra un mensaje de carga si AuthContext está cargando el estado inicial
          <p className="text-center">Cargando estado de autenticación...</p>
        ) : isAuthenticated ? (
          // Muestra un mensaje si el usuario ya está autenticado (el useEffect lo redirigirá pronto)
          <p className="text-center">Ya estás autenticado. Redirigiendo...</p>
        ) : (
          // Mostrar el formulario solo si NO está cargando y NO está autenticado
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de email usando tu componente Input y sus clases Tailwind */}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Campo requerido para validación HTML5
            />
            {/* Campo de contraseña usando tu componente Input y sus clases Tailwind */}
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Campo requerido
              minLength={6} // Mantén tu validación de longitud mínima si es necesaria
            />
            {/* Botón de envío usando tu componente Button y sus clases Tailwind */}
            {/* Deshabilita el botón mientras la operación de login está en curso (isLoading del contexto) */}
            <Button
              type="submit"
              className="w-full" // Botón de ancho completo
              disabled={isLoading} // Deshabilita durante la carga
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"} {/* Texto del botón según el estado de carga */}
            </Button>
          </form>
        )} {/* Cierre del condicional principal */}

        {/* Enlace a la página de registro con estilos Tailwind */}
        <div className="text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/registrarse" className="text-primary hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}