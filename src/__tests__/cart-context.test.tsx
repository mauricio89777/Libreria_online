import React from 'react';
import { render, act } from '@testing-library/react';
import { CartProvider, useCart } from '../app/context/cart-context';
import type { Book } from '../app/types/book';

function TestComponent({ book, quantity }: { book: Book, quantity?: number }) {
  const { cart, addToCart } = useCart();
  React.useEffect(() => {
    addToCart(book, quantity);
  }, []);
  return (
    <div>
      <span data-testid="cart-length">{cart.length}</span>
      <span data-testid="cart-quantity">{cart[0]?.quantity}</span>
      <span data-testid="cart-title">{cart[0]?.book.title}</span>
    </div>
  );
}

describe('CartContext', () => {
  it('addToCart actualiza el estado correctamente', async () => {
    const mockBook: Book = {
      id: '1',
      title: 'Libro de prueba',
      description: 'Descripción',
      author_id: 1,
      category_id: 1,
      price: 10,
      rating: 5,
      image: null,
      stock: 5,
    };

    let getByTestId: (id: string) => HTMLElement = () => { throw new Error('not initialized'); };
    await act(async () => {
      ({ getByTestId } = render(
        <CartProvider>
          <TestComponent book={mockBook} quantity={2} />
        </CartProvider>
      ));
    });
    expect(getByTestId('cart-length').textContent).toBe('1');
    expect(getByTestId('cart-quantity').textContent).toBe('2');
    expect(getByTestId('cart-title').textContent).toBe('Libro de prueba');
  });
}); 