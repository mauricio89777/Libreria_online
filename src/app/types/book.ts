export type Book = {
  id: string | number; 
  title: string;
  description: string | null; 
  author_id: number | null; 
  category_id: number | null; 
  price: number; // Precio en formato numérico
  rating: number;
  image: string | null; // Ruta de la imagen (relativa o absoluta)
  stock: number;
};