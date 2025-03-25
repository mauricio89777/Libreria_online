"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Datos de prueba
    const validUser = "admin";
    const validPass = "1234";

    if (username === validUser && password === validPass) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        {isAuthenticated ? (
          <div>
            <h2 className="text-xl font-bold text-center">
              ¡Bienvenido, {username}!
            </h2>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">
              Iniciar Sesión
            </h2>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <form onSubmit={handleLogin} className="flex flex-col">
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded mb-2"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded mb-2"
              />
              <Link
                href="/recuperar-password"
                className="text-xs text-muted-foreground hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
              <br />

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Iniciar Sesión
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
