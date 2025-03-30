"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User, AuthResponse } from "@/app/types/user";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  logout: () => void;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cargar usuario al iniciar
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser) as User;
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Error al cargar usuario:", err);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Persistir usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Admin hardcodeado (solo para desarrollo)
        if (email === "admin@libreria.com" && password === "AdminSecure123!") {
          const adminUser: User = {
            id: "admin-001",
            name: "Administrador",
            email: "admin@libreria.com",
            role: "admin",
            token: "fake-admin-token",
          };
          setUser(adminUser);
          return { success: true, isAdmin: true, user: adminUser };
        }

        // Validación básica usuario normal
        if (password.length >= 6 && email.includes("@")) {
          const normalUser: User = {
            id: `user-${Date.now()}`,
            name: email.split("@")[0],
            email,
            role: "user",
            token: "fake-user-token",
          };
          setUser(normalUser);
          return { success: true, isAdmin: false, user: normalUser };
        }

        throw new Error("Credenciales inválidas");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error de autenticación";
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<AuthResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        // Validaciones
        if (!name || !email || !password) {
          throw new Error("Todos los campos son requeridos");
        }

        if (password.length < 6) {
          throw new Error("La contraseña debe tener al menos 6 caracteres");
        }

        if (!email.includes("@")) {
          throw new Error("Email inválido");
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          role: "user",
          token: "fake-register-token",
        };

        setUser(newUser);
        return { success: true, user: newUser };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error en registro";
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user"); // Limpiar localStorage
    // Opcional: limpiar carrito u otros estados
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
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
