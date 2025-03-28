"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/administrador");
    }
  }, [isAuthenticated, router]); // Se ejecuta cuando `isAuthenticated` cambia

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const validUser = "admin";
    const validPass = "1234";

    if (username === validUser && password === validPass) {
      setError("");
      setIsAuthenticated(true);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Iniciar Sesión
        </h2>
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded mb-2 text-gray-700"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded mb-2 text-gray-700"
          />

          <Link
            href="/recuperar-password"
            className="text-xs text-gray-500 hover:underline self-end"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
