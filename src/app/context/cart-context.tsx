"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Book } from "@/app/types/book";

type CartItem = {
  book: Book;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Función auxiliar para validar un libro
const isValidBook = (book: any): book is Book => {
  console.log("Validando libro:", book);
  
  // Validación básica de estructura
  if (!book || typeof book !== 'object') {
    console.warn("El libro no es un objeto válido");
    return false;
  }

  // Validación de campos requeridos
  const requiredFields = {
    id: (val: any) => typeof val === 'string' || typeof val === 'number',
    title: (val: any) => typeof val === 'string',
    price: (val: any) => typeof val === 'number',
    stock: (val: any) => typeof val === 'number'
  };

  for (const [field, validator] of Object.entries(requiredFields)) {
    if (!validator(book[field])) {
      console.warn(`Campo requerido inválido: ${field}`, book[field]);
      return false;
    }
  }

  // Validación de campos opcionales
  const optionalFields = {
    description: (val: any) => typeof val === 'string' || val === null,
    author_id: (val: any) => typeof val === 'number' || val === null,
    category_id: (val: any) => typeof val === 'number' || val === null,
    rating: (val: any) => typeof val === 'number',
    image: (val: any) => typeof val === 'string' || val === null
  };

  for (const [field, validator] of Object.entries(optionalFields)) {
    if (book[field] !== undefined && !validator(book[field])) {
      console.warn(`Campo opcional inválido: ${field}`, book[field]);
      return false;
    }
  }

  return true;
};

// Función auxiliar para validar un item del carrito
const isValidCartItem = (item: any): item is CartItem => {
  console.log("Validando item del carrito:", item);
  
  if (!item || typeof item !== 'object') {
    console.warn("El item no es un objeto válido");
    return false;
  }

  if (!isValidBook(item.book)) {
    console.warn("El libro del item no es válido");
    return false;
  }

  if (typeof item.quantity !== 'number' || item.quantity <= 0) {
    console.warn("La cantidad del item no es válida:", item.quantity);
    return false;
  }

  return true;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        console.log("Cargando carrito desde localStorage:", savedCart);
        const parsedCart = JSON.parse(savedCart);
        
        if (Array.isArray(parsedCart) && parsedCart.every(isValidCartItem)) {
          setCart(parsedCart);
        } else {
          console.warn("Formato de carrito inválido en localStorage, iniciando carrito vacío");
          localStorage.removeItem("cart");
          setCart([]);
        }
      }
    } catch (error) {
      console.warn("Error al cargar el carrito:", error);
      localStorage.removeItem("cart");
      setCart([]);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.warn("Error al guardar el carrito:", error);
    }
  }, [cart]);

  const addToCart = (book: Book, quantity = 1) => {
    console.log("Intentando agregar al carrito:", { book, quantity });
    
    // Asegurarnos de que el ID sea string
    const bookWithStringId = {
      ...book,
      id: String(book.id)
    };

    if (!isValidBook(bookWithStringId)) {
      console.error("Intento de agregar un libro inválido al carrito:", bookWithStringId);
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.book.id === bookWithStringId.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.book.id === bookWithStringId.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { book: bookWithStringId, quantity }];
      }
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.book.id !== String(bookId)));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.book.id === String(bookId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}
