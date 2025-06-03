"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { useCart } from "@/app/context/cart-context";
import type { Book } from "@/app/types/book";

// Datos de ejemplo para los libros más vendidos
const bestsellerBooks: Book[] = [
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
];

export default function BookCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);

  const visibleBooks = 4;
  const maxIndex = bestsellerBooks.length - visibleBooks;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount =
        currentIndex *
        (carouselRef.current.scrollWidth / bestsellerBooks.length);
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:-left-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background md:h-10 md:w-10"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Anterior</span>
        </Button>
      </div>
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-hidden scroll-smooth pb-4"
      >
        {bestsellerBooks.map((book) => (
          <Card key={book.id} className="min-w-[250px] max-w-[250px] flex-none">
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
                      data-testid={"star"}
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
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-blue-300" onClick={() => addToCart(book)}>
                Añadir al Carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:-right-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background md:h-10 md:w-10"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Siguiente</span>
        </Button>
      </div>
    </div>
  );
}
