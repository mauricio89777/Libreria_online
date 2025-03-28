"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "./ui/input";

import { useCart } from "../context/cart-context";
import { useAuth } from "../context/auth-context";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    /* sticky se fija en la parte superior sticky top-0 */
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-gray-900">
              Librería Online
            </span>
          </Link>
        </div>

        {/* Navegación hidden md:flex es para moviles */}

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-blue-500"
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className="text-sm font-medium text-gray-700 hover:text-blue-500"
          >
            Catálogo
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-medium text-gray-700 hover:text-blue-500"
          >
            Contacto
          </Link>
        </nav>

        {/* Búsqueda y carrito */}
        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex relative items-center border rounded-md overflow-hidden"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="px-3 py-1 text-sm border-none outline-none text-gray-700"
            />
            <button type="submit" className="p-2 bg-gray-200 hover:bg-gray-300">
              <Search className="h-4 w-4 text-gray-600" />
              <span className="sr-only">Buscar</span>
            </button>
          </form>
          <Link href="/carrito" className="relative p-2">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-500" />
            </Button>
          </Link>
          {user ? (
            <div className="relative">
              <Button variant="outline" size="icon" asChild>
                <Link href={user.role === "admin" ? "/admin" : "/perfil"}>
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {/* <Link href="/carrito" className="relative p-2">
            <button variant="outline" size="icon">
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-500" />
            </button>
          </Link> */}
        </div>
      </div>
    </header>
  );
}
