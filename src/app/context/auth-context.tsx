'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Importamos los tipos que definiste
import { User, AuthResponse, LoginFormData } from "@/app/types/user";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // login ahora devuelve AuthResponse
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user from localStorage", e);
          localStorage.removeItem('user');
        }
      }
    } catch (e) {
       console.error("Error accessing localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      
      const response = await fetch('http://localhost:5000/api/users/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || `Error de autenticación: ${response.status}`;
        setError(errorMessage); 
         setIsLoading(false);
        return { success: false, error: errorMessage };
      }

      // Login exitoso
      setToken(data.token); 
      setUser(data.user); 
      
      localStorage.setItem('token', data.token); // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(data.user)); // Guardar en localStorage

      setIsLoading(false);
      return {
          success: true,
          user: data.user,
          isAdmin: data.user?.role === 'admin', 
          error: undefined 
      };

    } catch (err: any) {
      console.error('Error en el login (fetch/network):', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido en el login';
      setError(errorMessage); 

      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      setIsLoading(false);
     
      return {
          success: false,
          error: errorMessage,
          user: undefined,
          isAdmin: undefined
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isLoading,
        error,
        login, 
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};