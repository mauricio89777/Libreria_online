"use client";
/*hay que evitar hacer muchas peticiones a google books, hay que hacer una sola y guardarla en el estado */
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";
import { useCart } from "@/app/context/cart-context";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";

export default function CarritoPage() {
  const [showPaypal, setShowPaypal] = useState(false);
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [googleImages, setGoogleImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchGoogleImages = async () => {
      const newGoogleImages: Record<string, string> = {};
      
      for (const item of cart) {
        if (!item.book.image?.startsWith("http")) {
          try {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(item.book.title)}&maxResults=1`
            );
            const data = await response.json();
            
            if (data.items && data.items[0]?.volumeInfo?.imageLinks?.thumbnail) {
              const imageUrl = data.items[0].volumeInfo.imageLinks.thumbnail;
              const secureImageUrl = imageUrl.replace('http://', 'https://').replace('&edge=curl', '');
              newGoogleImages[item.book.id.toString()] = secureImageUrl;
            }
          } catch (error) {
            console.error("Error al buscar imagen en Google Books:", error);
          }
        }
      }
      
      setGoogleImages(newGoogleImages);
    };

    fetchGoogleImages();
  }, [cart]);

  const getImagePath = (book: any) => {
    if (book.image?.startsWith("http")) {
      return book.image;
    }
    if (googleImages[book.id.toString()]) {
      return googleImages[book.id.toString()];
    }
    return book.image ? `/images/${book.image}` : "/images/placeholder.webp";
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

 const handleCheckout = async () => {
  if (!user) {
    router.push("/login?redirect=/carrito");
    return;
  }
  setShowPaypal(true);

};

  if (cart.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-16 md:px-6">
        <h1 className="text-2xl font-bold md:text-3xl">
          Tu carrito está vacío
        </h1>
        <p className="mt-2 text-muted-foreground">
          Parece que aún no has añadido ningún libro a tu carrito.
        </p>
        <Button asChild className="mt-6">
          <Link href="/catalogo">Explorar Catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">Tu Carrito</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg border">
            <div className="p-4 md:p-6">
              <div className="grid gap-4">
                {cart.map((item) => (
                  <div
                    key={item.book.id}
                    className="grid gap-4 md:grid-cols-[100px_1fr_auto]"
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-md">
                      <Image
                        src={getImagePath(item.book)}
                        alt={item.book.title}
                        width={100}
                        height={133}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="grid gap-1">
                      <h3 className="font-semibold">{item.book.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.book.author_id}
                      </p>
                      <p className="font-medium">
                        ${item.book.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-white text-gray-900 hover:bg-gray-100"
                          onClick={() =>
                            updateQuantity(
                              String(item.book.id),
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Disminuir cantidad</span>
                        </Button>
                        <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-white text-gray-900 hover:bg-gray-100"
                          onClick={() =>
                            updateQuantity(String(item.book.id), item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Aumentar cantidad</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start justify-between md:flex-col md:items-end">
                      <p className="font-medium md:hidden">
                        ${(item.book.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(String(item.book.id))}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                      <p className="hidden font-medium md:block">
                        ${(item.book.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-lg border">
            <div className="p-4 md:p-6">
              <h2 className="mb-4 text-lg font-semibold">Resumen del Pedido</h2>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Envío</span>
                  <span>
                    {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="grid gap-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Código de descuento"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-white text-gray-900"
                    />
                    <Button variant="outline" className="bg-white text-gray-900 hover:bg-gray-100">
                      Aplicar
                    </Button>
                  </div>
                  {!showPaypal ? (
                  <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    onClick={handleCheckout}
                  >
                    Finalizar Compra
                  </Button>
                ) : (
                  <PayPalScriptProvider options={{ clientId: "AanFFp_lAreUIyHx8x5Xyc5FCv_hLe_wtHdzz0LWqYwQq2uLk78sIoXB_B0nT2gapJ2uaAA1jh-o0YTH" }}>
                    <PayPalButtons
                      createOrder={async () => {
                        const res = await fetch("http://localhost:5000/api/paypal/create-order", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ total, usuario_id: user!.id, carrito: cart }),
                        });
                        const data = await res.json();
                        return data.id;
                      }}
                      onApprove={async (data) => {
                          console.log("Order ID recibido en onApprove:", data.orderID);

                          const carritoBackend = cart.map((item) => ({
                            libro_id: item.book.id,
                            cantidad: item.quantity,
                            precio_unitario: item.book.price,
                          }));

                        console.log("Carrito enviado al backned", carritoBackend);

                        const res = await fetch("http://localhost:5000/api/paypal/capture-order", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ 
                            orderID: data.orderID,
                            usuario_id: user!.id,
                            carrito: carritoBackend, 
                          }),
                        });
                        await res.json();
                        clearCart();
                        router.push("/");
                      }}
                      onError={(err) => {
                        console.error(err);
                        alert("Error con PayPal");
                      }}
                    />
                  </PayPalScriptProvider>
                   )}  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
