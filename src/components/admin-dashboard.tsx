"use client";

import { useState } from "react";
import {
  PlusCircle,
  Pencil,
  Trash2,
  Users,
  BookOpen,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import type { Book } from "@/app/types/book";
import type { User } from "@/app/types/user";

// Datos de ejemplo para libros
const initialBooks: Book[] = [
  {
    id: "1",
    title: "El Gran Gatsby",
    author: "F. Scott Fitzgerald",
    price: 15.99,
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=300&text=El+Gran+Gatsby",
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
    image: "/placeholder.svg?height=400&width=300&text=Cien+Años+de+Soledad",
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
    image: "/placeholder.svg?height=400&width=300&text=1984",
    description: "Una distopía que retrata un futuro totalitario y vigilado.",
    category: "Ficción",
    stock: 8,
  },
];

// Datos de ejemplo para usuarios
const initialUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    role: "user",
  },
  {
    id: "2",
    name: "María López",
    email: "maria@ejemplo.com",
    role: "user",
  },
  {
    id: "3",
    name: "Admin",
    email: "admin@ejemplo.com",
    role: "admin",
  },
];

// Datos de ejemplo para pedidos
const initialOrders = [
  {
    id: "1",
    user: "Juan Pérez",
    date: "2023-05-15",
    total: 34.49,
    status: "Entregado",
  },
  {
    id: "2",
    user: "María López",
    date: "2023-05-18",
    total: 52.25,
    status: "En proceso",
  },
  {
    id: "3",
    user: "Carlos Rodríguez",
    date: "2023-05-20",
    total: 18.99,
    status: "Pendiente",
  },
];

export default function AdminDashboard() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [bookFormData, setBookFormData] = useState<Partial<Book>>({
    title: "",
    author: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    image: "/placeholder.svg?height=400&width=300&text=Nuevo+Libro",
    rating: 0,
  });

  const handleAddBook = () => {
    setIsAddingBook(true);
    setBookFormData({
      title: "",
      author: "",
      price: 0,
      description: "",
      category: "",
      stock: 0,
      image: "/placeholder.svg?height=400&width=300&text=Nuevo+Libro",
      rating: 0,
    });
  };

  const handleEditBook = (book: Book) => {
    setIsAddingBook(false);
    setSelectedBook(book);
    setBookFormData({ ...book });
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este libro?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleSaveBook = () => {
    if (isAddingBook) {
      // Agregar nuevo libro
      const newBook: Book = {
        id: Date.now().toString(),
        title: bookFormData.title || "Sin título",
        author: bookFormData.author || "Desconocido",
        price: bookFormData.price || 0,
        rating: bookFormData.rating || 0,
        image:
          bookFormData.image ||
          "/placeholder.svg?height=400&width=300&text=Nuevo+Libro",
        description: bookFormData.description || "",
        category: bookFormData.category || "Sin categoría",
        stock: bookFormData.stock || 0,
      };
      setBooks([...books, newBook]);
    } else if (selectedBook) {
      // Actualizar libro existente
      setBooks(
        books.map((book) =>
          book.id === selectedBook.id ? { ...book, ...bookFormData } : book
        )
      );
    }
    setSelectedBook(null);
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="mb-8 text-3xl font-bold">Panel de Administración</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Libros
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde el último mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuarios Registrados
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              +5 desde el último mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos Recientes
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">
              +3 desde la semana pasada
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="books">
        <TabsList className="mb-4">
          <TabsTrigger value="books">Libros</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Gestión de Libros</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleAddBook}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Añadir Libro
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {isAddingBook ? "Añadir Nuevo Libro" : "Editar Libro"}
                  </DialogTitle>
                  <DialogDescription>
                    Completa el formulario para{" "}
                    {isAddingBook
                      ? "añadir un nuevo libro"
                      : "actualizar el libro"}
                    .
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Título
                    </Label>
                    <Input
                      id="title"
                      value={bookFormData.title || ""}
                      onChange={(e) =>
                        setBookFormData({
                          ...bookFormData,
                          title: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">
                      Autor
                    </Label>
                    <Input
                      id="author"
                      value={bookFormData.author || ""}
                      onChange={(e) =>
                        setBookFormData({
                          ...bookFormData,
                          author: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Precio
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={bookFormData.price || ""}
                      onChange={(e) =>
                        setBookFormData({
                          ...bookFormData,
                          price: Number.parseFloat(e.target.value),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Categoría
                    </Label>
                    <Select
                      value={bookFormData.category}
                      onValueChange={(value) =>
                        setBookFormData({ ...bookFormData, category: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ficción">Ficción</SelectItem>
                        <SelectItem value="No Ficción">No Ficción</SelectItem>
                        <SelectItem value="Clásicos">Clásicos</SelectItem>
                        <SelectItem value="Fantasía">Fantasía</SelectItem>
                        <SelectItem value="Infantil">Infantil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                      Stock
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={bookFormData.stock || ""}
                      onChange={(e) =>
                        setBookFormData({
                          ...bookFormData,
                          stock: Number.parseInt(e.target.value),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Imagen URL
                    </Label>
                    <Input
                      id="image"
                      value={bookFormData.image || ""}
                      onChange={(e) =>
                        setBookFormData({
                          ...bookFormData,
                          image: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descripción
                    </Label>
                    <Textarea
                      id="description"
                      value={bookFormData.description || ""}
                      onChange={(e) =>
                        setBookFormData({
                          ...bookFormData,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSaveBook}>
                    Guardar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Título
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Autor
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Precio
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Categoría
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Stock
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {books.map((book) => (
                    <tr
                      key={book.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">{book.title}</td>
                      <td className="p-4 align-middle">{book.author}</td>
                      <td className="p-4 align-middle">
                        ${book.price.toFixed(2)}
                      </td>
                      <td className="p-4 align-middle">{book.category}</td>
                      <td className="p-4 align-middle">{book.stock}</td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditBook(book)}
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Editar</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Editar Libro</DialogTitle>
                                <DialogDescription>
                                  Actualiza la información del libro.
                                </DialogDescription>
                              </DialogHeader>
                              {/* El contenido del diálogo es el mismo que para añadir */}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteBook(book.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Nombre
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Email
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Rol
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">{user.name}</td>
                      <td className="p-4 align-middle">{user.email}</td>
                      <td className="p-4 align-middle">
                        {user.role === "admin" ? "Administrador" : "Usuario"}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <h2 className="text-xl font-bold mb-4">Gestión de Pedidos</h2>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      ID
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Usuario
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Fecha
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Total
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Estado
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">{order.id}</td>
                      <td className="p-4 align-middle">{order.user}</td>
                      <td className="p-4 align-middle">{order.date}</td>
                      <td className="p-4 align-middle">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="p-4 align-middle">{order.status}</td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
