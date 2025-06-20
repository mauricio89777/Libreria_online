import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BookDetailPage from '../libro/[id]/page'
import { useCart } from '../context/cart-context'
import { useParams, notFound } from 'next/navigation'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock de los hooks
vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
  notFound: vi.fn()
}))

vi.mock('../context/cart-context', () => ({
  useCart: vi.fn()
}))

// Mock de fetch
global.fetch = vi.fn()

// Mock de Image de Next.js
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}))

describe('BookDetailPage', () => {
  const mockBook = {
    id: '1',
    title: 'Test Book',
    description: 'Test Description',
    author_id: 'Test Author',
    category_id: '1',
    price: 19.99,
    rating: 4.5,
    image: 'test-image.jpg',
    stock: 10
  }

  const mockAddToCart = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useParams as jest.Mock).mockReturnValue({ id: '1' })
    ;(useCart as jest.Mock).mockReturnValue({ addToCart: mockAddToCart })
  })

  it('muestra el estado de carga inicial', () => {
    render(<BookDetailPage />)
    expect(screen.getByText('Cargando libro...')).toBeInTheDocument()
  })

  it('carga y muestra los detalles del libro correctamente', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBook)
    })

    render(<BookDetailPage />)

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument()
      expect(screen.getByText('Test Author')).toBeInTheDocument()
    })
  })

  it('maneja errores de carga correctamente', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Error de red'))

    render(<BookDetailPage />)

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument()
    })
  })

  it('maneja libros no encontrados', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404
    })

    render(<BookDetailPage />)

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled()
    })
  })

  it('permite ajustar la cantidad y agregar al carrito', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBook)
    })

    render(<BookDetailPage />)

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument()
    })

    // Aumentar cantidad
    const increaseButton = screen.getByRole('button', { name: /plus/i })
    const quantityDisplay = screen.getByText('1', { selector: 'span.w-8' })
    fireEvent.click(increaseButton)
    expect(screen.getByText('2', { selector: 'span.w-8' })).toBeInTheDocument()

    // Disminuir cantidad
    const decreaseButton = screen.getByRole('button', { name: /minus/i })
    fireEvent.click(decreaseButton)
    expect(screen.getByText('1', { selector: 'span.w-8' })).toBeInTheDocument()

    // Agregar al carrito
    const addToCartButton = screen.getByRole('button', { name: /añadir al carrito/i })
    fireEvent.click(addToCartButton)

    expect(mockAddToCart).toHaveBeenCalledWith(mockBook, 1)
  })

  it('busca y muestra imagen de Google Books cuando no hay imagen local', async () => {
    const bookWithoutImage = { ...mockBook, image: null }
    const googleBooksResponse = {
      items: [{
        volumeInfo: {
          imageLinks: {
            thumbnail: 'http://example.com/book.jpg'
          }
        }
      }]
    }

    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(bookWithoutImage)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(googleBooksResponse)
      })

    render(<BookDetailPage />)

    await waitFor(() => {
      const image = screen.getByAltText('Test Book')
      expect(image).toHaveAttribute('src', expect.stringContaining('https://example.com/book.jpg'))
    })
  })

  it('muestra imagen por defecto cuando no hay imágenes disponibles', async () => {
    const bookWithoutImage = { ...mockBook, image: null }
    const googleBooksResponse = { items: [] }

    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(bookWithoutImage)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(googleBooksResponse)
      })

    render(<BookDetailPage />)

    await waitFor(() => {
      const image = screen.getByAltText('Test Book')
      expect(image).toHaveAttribute('src', expect.stringContaining('/images/cien_anno_soledad.webp'))
    })
  })
}) 