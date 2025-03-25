"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useCart } from "@/app/context/cart-context";
import { Book } from "@/app/types/book";

// Datos de ejemplo para el catálogo
const catalogBooks: Book[] = [
  {
    id: "1",
    title: "El Gran Gatsby",
    author: "F. Scott Fitzgerald",
    price: 15.99,
    rating: 4.5,
    image: "/images/El_gran_gatsby.webp",
    description:
      "Una historia sobre el sueño americano y su decadencia durante los años 20.",
    category: "Ficción",
    stock: 15,
  },
  {
    id: "2",
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    price: 18.5,
    rating: 5,
    // image: "/placeholder.svg?height=400&width=300&text=Cien+Años+de+Soledad",
    image: "/images/cien_anno_soledad.webp",
    description:
      "La historia de la familia Buendía a lo largo de siete generaciones en Macondo.",
    category: "Ficción",
    stock: 10,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    price: 14.75,
    rating: 4.7,
    image: "/images/1984.webp",
    description: "Una distopía que retrata un futuro totalitario y vigilado.",
    category: "Ficción",
    stock: 8,
  },
  {
    id: "4",
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    price: 20.25,
    rating: 4.8,
    image: "/images/Don-Quijote.jpg",
    description:
      "Las aventuras del ingenioso hidalgo Don Quijote de la Mancha.",
    category: "Clásicos",
    stock: 12,
  },
  {
    id: "5",
    title: "Harry Potter y la Piedra Filosofal",
    author: "J.K. Rowling",
    price: 16.99,
    rating: 4.9,
    image: "/images/Harry_Potter_y_la_Piedra_Filosofal.jpg",
    description: "El inicio de las aventuras del joven mago Harry Potter.",
    category: "Fantasía",
    stock: 20,
  },
  {
    id: "6",
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    price: 12.5,
    rating: 4.6,
    image: "/images/El_principito.webp",
    description:
      "Un clásico de la literatura que explora temas de amistad y amor.",
    category: "Infantil",
    stock: 25,
  },
  {
    id: "7",
    title: "Orgullo y Prejuicio",
    author: "Jane Austen",
    price: 13.99,
    rating: 4.7,
    image: "/images/Orgullo_y_prejuicio.jpg",
    description:
      "Una novela de costumbres sobre las relaciones entre jóvenes de diferente posición social.",
    category: "Clásicos",
    stock: 18,
  },
  {
    id: "8",
    title: "El Hobbit",
    author: "J.R.R. Tolkien",
    price: 17.25,
    rating: 4.8,
    image: "/images/El_hobbit.jpg",
    description:
      "La aventura de Bilbo Bolsón en busca del tesoro custodiado por el dragón Smaug.",
    category: "Fantasía",
    stock: 14,
  },
  {
    id: "9",
    title: "Crimen y Castigo",
    author: "Fiódor Dostoyevski",
    price: 19.99,
    rating: 4.6,
    image: "/images/Crimen_y_castigo.jpg",
    description:
      "La historia de un estudiante que decide asesinar a una vieja prestamista.",
    category: "Clásicos",
    stock: 9,
  },
  {
    id: "10",
    title: "El Alquimista",
    author: "Paulo Coelho",
    price: 14.5,
    rating: 4.3,
    image: "/images/El_alquimista.jpg",
    description:
      "La historia de un pastor andaluz que viaja en busca de un tesoro.",
    category: "Ficción",
    stock: 22,
  },
  {
    id: "11",
    title: "Sapiens: De animales a dioses",
    author: "Yuval Noah Harari",
    price: 22.99,
    rating: 4.9,
    image: "/images/sapiens-de-animales-a-dioses.jpg",
    description:
      "Un recorrido por la historia de la humanidad, desde el surgimiento del Homo sapiens hasta la actualidad.",
    category: "No Ficción",
    stock: 16,
  },
  {
    id: "12",
    title: "Mujercitas",
    author: "Louisa May Alcott",
    price: 13.75,
    rating: 4.5,
    image: "/images/Mujercitas.webp",
    description:
      "La historia de las hermanas March durante la Guerra Civil estadounidense.",
    category: "Clásicos",
    stock: 11,
  },
];

const categories = [
  "Todos",
  "Ficción",
  "No Ficción",
  "Clásicos",
  "Fantasía",
  "Infantil",
];

export default function BookCatalog() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const [filteredBooks, setFilteredBooks] = useState<Book[]>(catalogBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    const query = searchParams.get("q");
    const category = searchParams.get("categoria");

    if (query) {
      setSearchTerm(query);
    }

    if (category && categories.includes(category)) {
      setSelectedCategory(category);
    }

    filterBooks(query || searchTerm, category || selectedCategory, sortBy);
  }, [searchParams]);

  const filterBooks = (search: string, category: string, sort: string) => {
    let result = [...catalogBooks];

    // Filtrar por búsqueda
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por categoría
    if (category && category !== "Todos") {
      result = result.filter((book) => book.category === category);
    }

    // Ordenar
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Por defecto, ordenar por relevancia (no cambia el orden)
        break;
    }

    setFilteredBooks(result);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterBooks(searchTerm, selectedCategory, sortBy);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    filterBooks(searchTerm, value, sortBy);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    filterBooks(searchTerm, selectedCategory, value);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Buscar por título, autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Buscar</Button>
          </div>
        </form>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevancia</SelectItem>
              <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="rating">Mejor Valorados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold">
            No se encontraron resultados
          </h2>
          <p className="text-muted-foreground">
            Intenta con otros términos de búsqueda o categorías
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <Card key={book.id}>
              <CardContent className="p-4">
                <div className="aspect-[3/4] overflow-hidden rounded-md">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <Link href={`/libro/${book.id}`}>
                    <h3 className="font-semibold line-clamp-1 hover:underline">
                      {book.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(book.rating)
                            ? "fill-primary text-primary"
                            : i < book.rating
                            ? "fill-primary/50 text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({book.rating})
                    </span>
                  </div>
                  <p className="mt-2 font-medium">${book.price.toFixed(2)}</p>
                  <p className="mt-1 text-sm line-clamp-2 text-muted-foreground">
                    {book.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => addToCart(book)}>
                  Añadir al Carrito
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
