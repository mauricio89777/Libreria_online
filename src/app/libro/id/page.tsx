"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, Star } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { useCart } from "@/app/context/cart-context";
import type { Book } from "@/app/types/book";
// Datos de ejemplo para los libros
const books: Book[] = [
  {
    id: "1",
    title: "El Gran Gatsby",
    author: "F. Scott Fitzgerald",
    price: 15.99,
    rating: 4.5,
    image: "/images/El_gran_gatsby.webp",
    description:
      "Una historia sobre el sueño americano y su decadencia durante los años 20. El Gran Gatsby es una novela escrita por el autor estadounidense F. Scott Fitzgerald que sigue a un grupo de personajes que viven en la ciudad ficticia de West Egg en Long Island, en el verano de 1922. La historia aborda principalmente la joven y misteriosa millonario Jay Gatsby y su quimérica pasión y obsesión por la hermosa y casada Daisy Buchanan.",
    category: "Ficción",
    stock: 15,
  },
  {
    id: "2",
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    price: 18.5,
    rating: 5,
    image: "/placeholder.svg?height=400&width=300&text=cien_anno_soledad",
    description:
      "La historia de la familia Buendía a lo largo de siete generaciones en Macondo. Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982. Es considerada una obra maestra de la literatura hispanoamericana y universal, así como una de las obras más traducidas y leídas en español.",
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
    description:
      "Una distopía que retrata un futuro totalitario y vigilado. 1984 es una novela política de ficción distópica, escrita por George Orwell entre 1947 y 1948 y publicada el 8 de junio de 1949. La novela popularizó los conceptos del omnipresente y vigilante Gran Hermano, de la notoria habitación 101, de la ubicua policía del pensamiento y de la neolengua, adaptación del inglés en la que se reduce y se transforma el léxico con fines represivos.",
    category: "Ficción",
    stock: 8,
  },
];

export default function BookDetailPage() {
  const params = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const book = books.find((b) => b.id === params.id);

  if (!book) {
    notFound();
  }

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(book, quantity);
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <Link
        href="/catalogo"
        className="inline-flex items-center mb-6 text-sm font-medium"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Volver al catálogo
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex justify-center">
          <div className="aspect-[3/4] max-w-[400px] overflow-hidden rounded-lg">
            <Image
              src={book.image || "/placeholder.svg"}
              alt={book.title}
              width={400}
              height={533}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-lg text-muted-foreground">{book.author}</p>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(book.rating)
                    ? "fill-primary text-primary"
                    : i < book.rating
                    ? "fill-primary/50 text-primary"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              ({book.rating})
            </span>
          </div>

          <p className="text-2xl font-bold">${book.price.toFixed(2)}</p>

          <Separator />

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Cantidad</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Disminuir cantidad</span>
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncreaseQuantity}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Aumentar cantidad</span>
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleAddToCart}>
              Añadir al Carrito
            </Button>
          </div>

          <Separator />

          <div>
            <h2 className="mb-2 text-lg font-semibold">Descripción</h2>
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">Detalles</h2>
            <ul className="grid gap-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Categoría</span>
                <span>{book.category}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Disponibilidad</span>
                <span>
                  {book.stock > 0 ? `${book.stock} en stock` : "Agotado"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
