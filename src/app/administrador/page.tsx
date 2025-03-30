"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import AdminDashboard from "@/components/admin-dashboard";

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Verificación estricta del admin
      const isAdmin =
        user?.role === "admin" && user?.email === "admin@libreria.com";

      if (!isAdmin) {
        router.push("/login?redirect=/admin");
      }
    }
  }, [user, isLoading, router]);

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

  return (
    <div className="container mx-auto p-4">
      <AdminDashboard />
    </div>
  );
}
