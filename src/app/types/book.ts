export type Book = {
  id: number | string; 
  title: string;
  description: string | null; 
  author_id: number | null; 
  category_id: number | null; 
  price: number;
  rating: number;
  image: string | null; 
  stock: number;
};