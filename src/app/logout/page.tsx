"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      router.push("/login");
    };
    performLogout();
  }, [logout, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-600">Cerrando sesión...</p>
    </div>
  );
}
