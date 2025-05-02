export type BookFormData = {
    id: number | string | null; 
    title: string;
    description: string | null;
    authorId: number | null; // 
    categoryId: number | null; 
    price: number;
    rating: number;
    image: string | null;
    stock: number;
 };