import { describe, it, expect } from 'vitest';
import type { Book } from '../app/types/book';

// Simulación de los libros del catálogo
const catalogBooks: Book[] = [
  {
    id: '1',
    title: 'El Gran Gatsby',
    description: 'Una historia sobre el sueño americano y su decadencia durante los años 20.',
    author_id: 1,
    category_id: 1,
    price: 15.99,
    rating: 4.5,
    image: null,
    stock: 15,
  },
  {
    id: '2',
    title: 'Cien Años de Soledad',
    description: 'La historia de la familia Buendía a lo largo de siete generaciones en Macondo.',
    author_id: 2,
    category_id: 1,
    price: 18.5,
    rating: 5,
    image: null,
    stock: 10,
  },
  {
    id: '3',
    title: '1984',
    description: 'Una distopía que retrata un futuro totalitario y vigilado.',
    author_id: 3,
    category_id: 1,
    price: 14.75,
    rating: 4.7,
    image: null,
    stock: 8,
  },
];

// Lógica de búsqueda simplificada
function filterBooks(search: string, books: Book[]): Book[] {
  if (!search) return books;
  const searchLower = search.toLowerCase();
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchLower) ||
      (book.description?.toLowerCase().includes(searchLower) ?? false)
  );
}

describe('Función de búsqueda de libros', () => {
  it('devuelve libros que coinciden con el título', () => {
    const resultado = filterBooks('gatsby', catalogBooks);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].title).toBe('El Gran Gatsby');
  });

  it('devuelve libros que coinciden con la descripción', () => {
    const resultado = filterBooks('sueño americano', catalogBooks);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].title).toBe('El Gran Gatsby');
  });

  it('devuelve todos los libros si la búsqueda está vacía', () => {
    const resultado = filterBooks('', catalogBooks);
    expect(resultado).toHaveLength(3);
  });

  it('devuelve vacío si no hay coincidencias', () => {
    const resultado = filterBooks('noexiste', catalogBooks);
    expect(resultado).toHaveLength(0);
  });
}); 