"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Search, ShoppingCart, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "./ui/input";
import { useCart } from "../context/cart-context";
import { useAuth } from "../context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems =
    cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-800 shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo deberia de usar next/images para la ruta de la imagen?? */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Inicio"
          >
            {/* <BookOpen className="h-6 w-6 text-white" /> */}
            <img src="/logo_libreria.svg" width={60} height={30} alt="logo" />
          </Link>
        </div>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-white hover:text-blue-200 transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className="text-sm font-medium text-white hover:text-blue-200 transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-medium text-white hover:text-blue-200 transition-colors"
          >
            Contacto
          </Link>
          <Link
            href="/buscador"
            className="text-sm font-medium text-white hover:text-blue-200 transition-colors"
          >
            Buscar
          </Link>
        </nav>

        {/* Búsqueda y acciones */}
        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center"
            role="search"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar libros..."
              className="w-48 lg:w-64"
              aria-label="Buscar libros"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="ml-2 text-white hover:bg-blue-700"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>

          <Link
            href="/carrito"
            className="relative"
            aria-label="Carrito de compras"
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-700"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-blue-700"
                  data-testid="user-menu-button"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white shadow-lg" align="end" forceMount>
                <div className="p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-900">{user?.name}</p>
                    <p className="text-xs leading-none text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-gray-200 my-1" />
                <DropdownMenuItem asChild className="text-gray-900 hover:bg-gray-100 cursor-pointer">
                  <Link href="/perfil" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                  </Link>
                </DropdownMenuItem>
                {user?.role === "admin" && (
                  <DropdownMenuItem asChild className="text-gray-900 hover:bg-gray-100 cursor-pointer">
                    <Link href="/administrador" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Panel Admin</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <div className="h-px bg-gray-200 my-1" />
                <DropdownMenuItem 
                  className="text-red-600 hover:bg-red-50 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-700"
              asChild
            >
              <Link href="/login" aria-label="Iniciar sesión">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
