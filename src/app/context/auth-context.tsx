"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "@/app/types/user";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      }
    }
  }, []);

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (email: string, password: string) => {
    // Simulación de autenticación
    if (email === "admin@ejemplo.com" && password === "admin") {
      setUser({
        id: "admin1",
        name: "Administrador",
        email: "admin@ejemplo.com",
        role: "admin",
      });
    } else {
      setUser({
        id: "user1",
        name: "Usuario",
        email: email,
        role: "user",
      });
    }
  };

  const register = (name: string, email: string, password: string) => {
    // Simulación de registro
    setUser({
      id: Date.now().toString(),
      name,
      email,
      role: "user",
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
