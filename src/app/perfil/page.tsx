"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";

export default function PerfilPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Verificación cuando el estado no está cargando
    if (!isLoading) {
      // Si no hay usuario, redirigir al login
      if (!user) {
        router.push("/login");
        return;
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {user && <h1>¡Hola, {user.role === "admin" ? "Admin" : "Usuario"}!</h1>}
    </div>
  );
}
