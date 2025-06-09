"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, Star } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { useCart } from "@/app/context/cart-context";
import type { Book } from "@/app/types/book";

export default function BookDetailPage() {
  const params = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [googleBookImage, setGoogleBookImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!params.id) {
          throw new Error("ID del libro no proporcionado");
        }

        const res = await fetch(`http://localhost:5000/api/books/${params.id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            notFound();
          }
          throw new Error(`Error al cargar el libro: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Datos del libro recibidos:", data);

        // Validación más detallada de los datos
        const validationErrors = [];
        
        if (!data) validationErrors.push("No se recibieron datos");
        if (!data.id) validationErrors.push("ID no proporcionado");
        if (!data.title) validationErrors.push("Título no proporcionado");
        
        if (data.price === undefined || data.price === null) {
          validationErrors.push("Precio no proporcionado");
        } else if (isNaN(Number(data.price))) {
          validationErrors.push("Precio no es un número válido");
        }
        
        if (typeof data.stock !== 'number') validationErrors.push("Stock inválido");

        if (validationErrors.length > 0) {
          console.error("Errores de validación:", validationErrors);
          throw new Error(`Datos del libro inválidos: ${validationErrors.join(", ")}`);
        }

        // Buscar la imagen en Google Books
        try {
          const googleRes = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(data.title)}&maxResults=1`
          );
          const googleData = await googleRes.json();
          
          if (googleData.items && googleData.items[0]?.volumeInfo?.imageLinks?.thumbnail) {
            const imageUrl = googleData.items[0].volumeInfo.imageLinks.thumbnail;
            // Reemplazar http por https y ajustar el tamaño
            const secureImageUrl = imageUrl.replace('http://', 'https://').replace('&edge=curl', '');
            setGoogleBookImage(secureImageUrl);
            console.log("Imagen de Google Books encontrada:", secureImageUrl);
          }
        } catch (googleError) {
          console.error("Error al buscar imagen en Google Books:", googleError);
        }

        // Asegurarnos de que el ID sea string y otros campos tengan el formato correcto
        const formattedBook: Book = {
          id: String(data.id),
          title: String(data.title),
          description: data.description || null,
          author_id: data.author_id || null,
          category_id: data.category_id || null,
          price: Number(data.price),
          rating: Number(data.rating) || 0,
          image: data.image || null,
          stock: Number(data.stock) || 0
        };

        console.log("Libro formateado:", formattedBook);
        setBook(formattedBook);
      } catch (error) {
        console.error("Error al cargar el libro:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params.id]);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!book) {
      console.error("No se puede agregar al carrito: libro no cargado");
      return;
    }

    console.log("Intentando agregar libro al carrito:", {
      book,
      quantity,
      bookId: book.id,
      bookIdType: typeof book.id
    });

    addToCart(book, quantity);
  };

  const imagePath = googleBookImage || 
    (book?.image?.startsWith("http") ? book.image : 
    (book?.image ? `/images/${book.image}` : "/images/cien_anno_soledad.webp"));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Cargando libro...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Libro no encontrado.</p>
      </div>
    );
  }

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
              src={imagePath}
              alt={book.title}
              width={400}
              height={533}
              className="h-full w-full object-cover"
              onError={() => {
                console.error("Error al cargar la imagen:", imagePath);
                setImageError(true);
              }}
              onLoad={() => {
                console.log("Imagen cargada exitosamente:", imagePath);
                setImageError(false);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-lg text-muted-foreground">{book.author_id}</p>

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

          <p className="text-2xl font-bold">
            ${Number(book.price).toFixed(2)}
          </p>

          <Separator />

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Cantidad</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
                //test cambio a minus
                aria-label="minus"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncreaseQuantity}
                aria-label="plus"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              onClick={handleAddToCart}
              disabled={!book || book.stock <= 0}
            >
              {book.stock <= 0 ? "Agotado" : "Añadir al Carrito"}
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
                <span>{book.category_id}</span>
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
