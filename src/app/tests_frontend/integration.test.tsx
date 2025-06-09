import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider } from '../context/auth-context'
import { CartProvider } from '../context/cart-context'
import BookDetailPage from '../libro/[id]/page'
import { useParams } from 'next/navigation'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock de los hooks
vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
  notFound: vi.fn()
}))

// Mock de fetch
global.fetch = vi.fn()

// Mock de Image de Next.js
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}))

// Wrapper con todos los providers necesarios
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  )
}

describe('Pruebas de Integración', () => {
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

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useParams as jest.Mock).mockReturnValue({ id: '1' })
  })

  it('integra la búsqueda de libros con Google Books API', async () => {
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
        json: () => Promise.resolve(mockBook)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(googleBooksResponse)
      })

    render(<BookDetailPage />, { wrapper: AllProviders })

    await waitFor(() => {
      const image = screen.getByAltText('Test Book')
      expect(image).toHaveAttribute('src', expect.stringContaining('https://example.com/book.jpg'))
    })
  })

  it('integra la autenticación con el carrito de compras', async () => {
    // Mock de la respuesta de autenticación
    const mockAuthResponse = {
      token: 'fake-token',
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com'
      }
    }

    // Mock de la respuesta del libro y Google Books
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockBook)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ items: [] }) // Mock vacío para Google Books
      })

    render(<BookDetailPage />, { wrapper: AllProviders })

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument()
    })

    // Agregar al carrito
    const addToCartButton = screen.getByRole('button', { name: /añadir al carrito/i })
    fireEvent.click(addToCartButton)

    // Verificar que el libro se agregó al carrito
    await waitFor(() => {
      expect(screen.getByText('Añadir al Carrito')).toBeInTheDocument()
    })
  })

  it('integra el manejo de errores de red con la UI', async () => {
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Error de red'))

    render(<BookDetailPage />, { wrapper: AllProviders })

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument()
    })

    // Restaurar console.error
    consoleSpy.mockRestore()
  })

  it('integra la validación de datos con el manejo de errores', async () => {
    const invalidBook = {
      id: '1',
      // Faltan campos requeridos
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(invalidBook)
    })

    render(<BookDetailPage />, { wrapper: AllProviders })

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument()
    })
  })

  it('integra el manejo de stock con la UI', async () => {
    const bookWithoutStock = {
      ...mockBook,
      stock: 0
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(bookWithoutStock)
    })

    render(<BookDetailPage />, { wrapper: AllProviders })

    await waitFor(() => {
      // Buscar el botón de "Agotado" por su rol y nombre
      const addToCartButton = screen.getByRole('button', { name: /agotado/i })
      expect(addToCartButton).toBeDisabled()
      
      // Verificar el texto de disponibilidad en los detalles
      const stockText = screen.getByText('Agotado', { selector: 'li span:last-child' })
      expect(stockText).toBeInTheDocument()
    })
  })

  it('integra la navegación con el estado de la aplicación', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBook)
    })

    render(<BookDetailPage />, { wrapper: AllProviders })

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument()
    })

    // Verificar que el botón de volver al catálogo está presente
    const backButton = screen.getByText('Volver al catálogo')
    expect(backButton).toBeInTheDocument()
  })
}) 