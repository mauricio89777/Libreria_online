"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  //aqui esta el problema esta harcoreado el amidn

  // useEffect(() => {
  //   if (!isLoading) {
  //     // Verificación estricta del admin
  //     const isAdmin =
  //       user?.role === "admin" && user?.email === "admin@libreria.com";

  //     if (!isAdmin) {
  //       router.push("/login?redirect=/admin");
  //     }
  //   }
  // }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null; // O puedes mostrar un mensaje de "No autorizado"
  }

  const goToCrudUsuarios = () => {
    router.push("/administrador/crud_usuarios");
  };
   const goToCrudLibros = () => {
     router.push("/administrador/crud_libros");
   };

   const goToCrudCategoria = () => {
     router.push("/administrador/crud_categorias");
   };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={goToCrudUsuarios}
          className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Gestionar Usuarios
        </button>
         <button
          onClick={goToCrudLibros}
          className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Gestionar libros
        </button> 
        <button
          onClick={goToCrudCategoria}
          className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Gestionar categorias
        </button>
        {/* Puedes agregar más botones si quieres, como para productos o pedidos */}
      </div>
    </div>
  );
}
