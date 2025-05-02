'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useAuth } from '@/app/context/auth-context'; 
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Link from "next/link"; 

export default function LoginPage() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const { login, isLoading, error, isAuthenticated, user } = useAuth();
  const router = useRouter(); 

  
  useEffect(() => {
    
    if (!isLoading && isAuthenticated) {
     
      if (user?.role === 'admin') {
        
        router.push('/perfil'); 
      } else {
       
        router.push('/perfil'); 
      }
    }
  }, [isAuthenticated, isLoading, user, router]); 

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

   
    const { success, isAdmin } = await login(email, password);

   
     if (success) {
      
       router.push(isAdmin ? "/admin/dashboard" : "/dashboard"); 
     }

  
  };


  return (
    <div className="container flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">Iniciar Sesión</h1> {/* Añadí text-center */}

        {error && (
          <div className="rounded-md bg-red-100 p-3 text-red-700">{error}</div>
        )}

        {isLoading ? (
          <p className="text-center">Cargando estado de autenticación...</p>
        ) : isAuthenticated ? (
          <p className="text-center">Ya estás autenticado. Redirigiendo...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              minLength={6} 
            />
           
            <Button
              type="submit"
              className="w-full" 
              disabled={isLoading} 
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"} 
            </Button>
          </form>
        )} 
        <div className="text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/registrarse" className="text-primary hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}