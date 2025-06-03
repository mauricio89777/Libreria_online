import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../components/navbar'
import { describe, it, expect, vi } from 'vitest'
import { useRouter } from 'next/navigation'

// Mock de next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

// Mock de los contextos
vi.mock('../context/cart-context', () => ({
  useCart: () => ({
    cart: []
  })
}))

vi.mock('../context/auth-context', () => ({
  useAuth: () => ({
    user: null,
    logout: vi.fn()
  })
}))

describe('Navbar Component - Search Functionality', () => {
  const mockPush = vi.fn()
  const mockRefresh = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh
    })
  })

  it('renderiza el campo de búsqueda en la barra de navegación', () => {
    render(<Navbar />)
    
    expect(screen.getByPlaceholderText('Buscar libros...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument()
  })

  it('actualiza el valor del campo de búsqueda', () => {
    render(<Navbar />)
    const searchInput = screen.getByPlaceholderText('Buscar libros...')
    
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })
    
    expect(searchInput).toHaveValue('Harry Potter')
  })

  it('redirige a la página de catálogo con el término de búsqueda', () => {
    render(<Navbar />)
    const searchInput = screen.getByPlaceholderText('Buscar libros...')
    const searchForm = searchInput.closest('form')
    
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })
    fireEvent.submit(searchForm!)
    
    expect(mockPush).toHaveBeenCalledWith('/catalogo?q=Harry%20Potter')
  })

  it('no redirige con término de búsqueda vacío', () => {
    render(<Navbar />)
    const searchInput = screen.getByPlaceholderText('Buscar libros...')
    const searchForm = searchInput.closest('form')
    
    fireEvent.change(searchInput, { target: { value: '   ' } })
    fireEvent.submit(searchForm!)
    
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('mantiene el valor del campo de búsqueda después de enviar', () => {
    render(<Navbar />)
    const searchInput = screen.getByPlaceholderText('Buscar libros...')
    const searchForm = searchInput.closest('form')
    
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })
    fireEvent.submit(searchForm!)
    
    expect(searchInput).toHaveValue('Harry Potter')
  })
}) 