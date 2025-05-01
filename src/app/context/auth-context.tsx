// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
//   ReactNode,
// } from "react";
// import { useRouter } from "next/navigation";
// import { User, AuthResponse } from "@/app/types/user";

// type AuthContextType = {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
//   login: (email: string, password: string) => Promise<AuthResponse>;
//   register: (
//     name: string,
//     email: string,
//     password: string
//   ) => Promise<AuthResponse>;
//   logout: () => void;
//   clearError: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   // Cargar usuario al iniciar
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const savedUser = localStorage.getItem("user");
//         if (savedUser) {
//           const parsedUser = JSON.parse(savedUser) as User;
//           setUser(parsedUser);
//         }
//       } catch (err) {
//         console.error("Error al cargar usuario:", err);
//         localStorage.removeItem("user");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   // Persistir usuario
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);



//   const login = useCallback(
//     async (email: string, password: string): Promise<AuthResponse> => {
//       setIsLoading(true);
//       setError(null);
  
//       try {
//         const response = await fetch("http://localhost:5000/api/users/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });
  
//         const data = await response.json();
  
//         if (!response.ok) {
//           throw new Error(data.message || "Error de autenticación");
//         }
  
//         const loggedUser: User = {
//           id: data.user.id,
//           name: data.user.name,
//           email: data.user.email,
//           role: data.user.role,
//           token: data.token, // Aquí guardas el token 100% real no fake 
//         };
  
//         setUser(loggedUser);
//         return { success: true, isAdmin: loggedUser.role === "admin", user: loggedUser };
//       } catch (err) {
//         const message = err instanceof Error ? err.message : "Error de autenticación";
//         setError(message);
//         return { success: false, error: message };
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     []
//   );
  
 
//   const register = useCallback(
//     async (name: string, email: string, password: string): Promise<AuthResponse> => {
//       setIsLoading(true);
//       setError(null);
  
//       try {
//         const response = await fetch('http://localhost:5000/api/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ name, email, password }),
//         });
  
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Error de registro');
//         }
  
//         const data = await response.json();
  
//         const newUser: User = {
//           id: data.user.id,
//           name: data.user.name,
//           email: data.user.email,
//           role: data.user.role,
//           token: data.token,
//         };
  
//         setUser(newUser);
//         return { success: true, user: newUser };
//       } catch (err) {
//         const message = err instanceof Error ? err.message : 'Error en registro';
//         setError(message);
//         return { success: false, error: message };
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     []
//   );
  

//   const logout = useCallback(() => {
//     setUser(null);
//     localStorage.removeItem("user"); // Limpiar localStorage
//     // Opcional: limpiar carrito u otros estados
//   }, []);

//   const clearError = useCallback(() => setError(null), []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         error,
//         login,
//         register,
//         logout,
//         clearError,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth debe usarse dentro de un AuthProvider");
//   }
//   return context;
// }
// context/AuthContext.tsx--------------------------------------------------------------------------------------------
// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
//   login: (email: string, password: string) => Promise<AuthResponse>;
//   register: (name: string, email: string, password: string) => Promise<AuthResponse>;
//   logout: () => void;
//   clearError: () => void;
// }

// interface AuthResponse {
//   success: boolean;
//   isAdmin?: boolean;
//   user?: User;
//   error?: string;
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   token: string;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   // Cargar usuario al iniciar
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const savedUser = localStorage.getItem('user');
//         if (savedUser) {
//           const parsedUser = JSON.parse(savedUser) as User;
//           setUser(parsedUser);
//         }
//       } catch (err) {
//         console.error('Error al cargar usuario:', err);
//         localStorage.removeItem('user');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   // Persistir usuario
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//     }
//   }, [user]);

//   const login = async (email: string, password: string): Promise<AuthResponse> => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:5000/api/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Error de autenticación');
//       }

//       const loggedUser: User = {
//         id: data.user.id,
//         name: data.user.name,
//         email: data.user.email,
//         role: data.user.role,
//         token: data.token,
//       };

//       setUser(loggedUser);
//       return { success: true, isAdmin: loggedUser.role === 'admin', user: loggedUser };
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Error de autenticación';
//       setError(message);
//       return { success: false, error: message };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:5000/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Error de registro');
//       }

//       const newUser: User = {
//         id: data.user.id,
//         name: data.user.name,
//         email: data.user.email,
//         role: data.user.role,
//         token: data.token,
//       };

//       setUser(newUser);
//       return { success: true, user: newUser };
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Error en registro';
//       setError(message);
//       return { success: false, error: message };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user'); // Limpiar localStorage
//     router.push('/login'); // Redirigir a la página de login
//   };

//   const clearError = () => setError(null);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         error,
//         login,
//         register,
//         logout,
//         clearError,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
//   return context;
// };
//---------------------------------------------------------------------------------------------------------

// // context/AuthContext.tsx// src/app/context/auth-context.tsx (o donde lo tengas)
// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { User } from "@/app/types/user"; // Asegúrate de que la ruta y el tipo sean correctos

// interface AuthContextType {
//   token: string | null;
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
//   // setToken: (token: string | null) => void; // Normalmente no expones esto, el contexto lo maneja
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setToken] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true); // Iniciar como true mientras carga localStorage
//   const [error, setError] = useState<string | null>(null);

//   // Cargar el token y usuario desde localStorage al montar el proveedor
//   useEffect(() => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       const storedUser = localStorage.getItem('user');

//       if (storedToken) {
//         setToken(storedToken);
//         // Opcional: Validar el token si es necesario (e.g., decodificar, checkear expiración)
//       }

//       if (storedUser) {
//         try {
//           setUser(JSON.parse(storedUser));
//         } catch (e) {
//           console.error("Error parsing user from localStorage", e);
//           // Limpiar si hay un error de parseo
//           localStorage.removeItem('user');
//         }
//       }
//     } catch (e) {
//        console.error("Error accessing localStorage", e);
//        // Handle potential security errors in some environments
//     } finally {
//       setIsLoading(false); // Terminar la carga inicial
//     }
//   }, []); // Se ejecuta solo una vez al montar

//   // Lógica para login
//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // Aquí iría tu lógica de login con la API
//       // ASEGÚRATE de que esta URL sea correcta
//       const response = await fetch('http://localhost:5000/api/auth/login', { // Asumiendo ruta /api/auth/login
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // Si el backend envía un mensaje de error, úsalo
//         throw new Error(data.message || `Error en el login: ${response.status}`);
//       }

//       // Si el login es exitoso, guardamos el token y el usuario
//       setToken(data.token);
//       setUser(data.user);

//       // Guardar en localStorage
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));

//     } catch (err) {
//       console.error('Error en el login:', err);
//       setError(err instanceof Error ? err.message : 'Error desconocido en el login');
//       // En caso de error, limpiar token y usuario si existían (aunque no deberían si falla el login)
//       setToken(null);
//       setUser(null);
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Lógica para logout
//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   };

//   const isAuthenticated = !!token; // Si hay token, el usuario está autenticado

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         user,
//         isAuthenticated,
//         isLoading, // Exponer isLoading
//         error, // Exponer error
//         // setToken, // No se expone directamente para mantener el control dentro del contexto
//         login,
//         logout,
//       }}
//     >
//        {/* Opcional: Mostrar un spinner o mensaje mientras isLoading es true */}
//        {/* {isLoading ? <div>Cargando autenticación...</div> : children} */}
//        {children} {/* Renderiza los hijos una vez que la carga inicial termina */}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) { // Mejor check para undefined
//     throw new Error('useAuth debe usarse dentro de AuthProvider');
//   }
//   return context;
// };


// src/app/context/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Importamos los tipos que definiste
import { User, AuthResponse, LoginFormData } from "@/app/types/user";

// Asegúrate de que AuthContextType refleje que login devuelve Promise<AuthResponse>
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

  // Lógica para login - AHORA DEVUELVE Promise<AuthResponse>
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null); // Limpiar error del contexto al inicio del login

    try {
      // Asegúrate de que esta URL sea correcta para tu backend
      const response = await fetch('http://localhost:5000/api/users/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // El backend respondió con un código de error (ej: 400, 401, 403, 404)
        const errorMessage = data.message || `Error de autenticación: ${response.status}`;
        setError(errorMessage); // Setear error en el contexto
         setIsLoading(false);
        // Devolver un objeto de fallo controlado, sin lanzar excepción aquí
        return { success: false, error: errorMessage };
      }

      // Login exitoso
      setToken(data.token); // setear token en el contexto
      setUser(data.user); // setear user en el contexto

      localStorage.setItem('token', data.token); // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(data.user)); // Guardar en localStorage

      setIsLoading(false);
      // Devolver un objeto de éxito que coincida con AuthResponse
      return {
          success: true,
          user: data.user, // Incluir el usuario si lo retorna el backend
          isAdmin: data.user?.role === 'admin', // Calcular isAdmin desde el rol del usuario
          error: undefined // Asegurar que no hay error
      };

    } catch (err: any) {
      // Error de red, error de parseo JSON, u otra excepción inesperada
      console.error('Error en el login (fetch/network):', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido en el login';
      setError(errorMessage); // Setear error en el contexto

      // Limpiar cualquier estado potencial de un intento fallido
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      setIsLoading(false);
      // Devolver un objeto de fallo para este caso también
      return {
          success: false,
          error: errorMessage,
          user: undefined,
          isAdmin: undefined // O false, dependiendo de tu tipo AuthResponse
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
        login, // Ahora login devuelve AuthResponse
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