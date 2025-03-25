"use client";

import { useState } from "react";
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
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/carrito");
      return;
    }

    // Aquí iría la lógica para procesar el pago
    alert("¡Compra realizada con éxito!");
    clearCart();
    router.push("/");
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
                        src={item.book.image || "/placeholder.svg"}
                        alt={item.book.title}
                        width={100}
                        height={133}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="grid gap-1">
                      <h3 className="font-semibold">{item.book.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.book.author}
                      </p>
                      <p className="font-medium">
                        ${item.book.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(
                              item.book.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Disminuir cantidad</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.book.id, item.quantity + 1)
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
                        onClick={() => removeFromCart(item.book.id)}
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
                    />
                    <Button variant="outline">Aplicar</Button>
                  </div>
                  <Button className="w-full" onClick={handleCheckout}>
                    Finalizar Compra
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
