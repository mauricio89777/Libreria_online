"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "admin") {
        router.replace("/login");
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
    return null; // o muestra algo como: <div>No autorizado</div>
  }

  return (
    <div>
      <header className="bg-blue-900 text-white p-4">
        <h1 className="text-xl font-semibold">Panel de Administración</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
