//import { useAuth } from "@/app/context/auth-context";
// import { BooksTab } from "@/app/components/admin/books-tab";
// import { UsersTab } from "@/app/components/admin/users-tab";
// import { OrdersTab } from "@/app/components/admin/orders-tab";
// import { AdminCards } from "@/app/components/admin/admin-cards";
import { Tabs, TabsList, TabsContent } from "@/app/components/ui/tabs";
("use client");

import { useAuth } from "@/app/context/auth-context";
import { Button } from "@/app/components/ui/button";
import AdminCards from "./admin/admin-cards/page";

export default function AdminDashboard() {
  const { user } = useAuth(); // <-- Obtenemos el user del contexto

  // Verificación de usuario admin
  if (!user || user.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Acceso no autorizado
          </h2>
          <p className="text-blue-600 mb-6">
            No tienes permisos para acceder al panel de administración.
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header con estilo azul */}
        <header className="bg-blue-600 text-white p-6 rounded-lg mb-6 shadow-md">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-blue-100">
            Bienvenido, {user.name} ({user.email})
          </p>
        </header>

        {/* Contenido de prueba con estilos azulados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Libros</h2>
            <p className="text-blue-600">Gestiona tu catálogo</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Usuarios
            </h2>
            <p className="text-blue-600">Administra los usuarios</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Pedidos
            </h2>
            <p className="text-blue-600">Revisa los pedidos</p>
          </div>
        </div>

        {/* Mensaje de prueba */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-300">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">funciona!</h2>
          <div className="space-y-4">
            <p className="text-blue-800">
              Este es un mensaje de prueba con estilos azulados.
            </p>
            <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-500">
              <p className="text-blue-700">
                Usuario autenticado como:{" "}
                <span className="font-semibold">{user.role}</span>
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
