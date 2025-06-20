import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Buscador from '../buscador/page'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock de fetch
global.fetch = vi.fn()

describe('Buscador Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza el campo de búsqueda y el botón', () => {
    render(<Buscador />)
    
    expect(screen.getByPlaceholderText('Buscar libros...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument()
  })

  it('actualiza el valor del campo de búsqueda', () => {
    render(<Buscador />)
    const searchInput = screen.getByPlaceholderText('Buscar libros...')
    
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })
    
    expect(searchInput).toHaveValue('Harry Potter')
  })

  it('muestra el estado de carga durante la búsqueda', async () => {
    render(<Buscador />)
    const searchInput = screen.getByPlaceholderText('Buscar libros...')
    const searchButton = screen.getByRole('button', { name: 'Buscar' })
    
    // Simular una respuesta exitosa
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve([])
    })
    
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })
    fireEvent.click(searchButton)
    
    expect(screen.getByText('Buscando...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.queryByText('Buscando...')).not.toBeInTheDocument()
    })
  })

  it('muestra los resultados de la búsqueda', async () => {
    const mockResults = [
      {
        id: '1',
        title: 'Harry Potter y la Piedra Filosofal',
        authors: ['J.K. Rowling'],
        description: 'El inicio de las aventuras del joven mago Harry Potter.',
        imagen: 'https://example.com/harry-potter.jpg'
      }
    ]
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResults)
    })
    
    render(<Buscador />)
    const searchInput = screen.getByPlaceholderText('Buscar libros...')
    const searchButton = screen.getByRole('button', { name: 'Buscar' })
    
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })
    fireEvent.click(searchButton)
    
    await waitFor(() => {
      expect(screen.getByText('Harry Potter y la Piedra Filosofal')).toBeInTheDocument()
      expect(screen.getByText('J.K. Rowling')).toBeInTheDocument()
      expect(screen.getByText('El inicio de las aventuras del joven mago Harry Potter.')).toBeInTheDocument()
    })
  })

  it('maneja errores de búsqueda', async () => {
    // Silenciar console.error para esta prueba
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Error de red'))
    
    render(<Buscador />)
    const searchInput = screen.getByPlaceholderText('Buscar libros...')
    const searchButton = screen.getByRole('button', { name: 'Buscar' })
    
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })
    fireEvent.click(searchButton)
    
    await waitFor(() => {
      expect(screen.getByText('Error de red')).toBeInTheDocument()
    })

    // Restaurar console.error
    consoleSpy.mockRestore()
  })

  it('no realiza búsqueda con término vacío', () => {
    render(<Buscador />)
    const searchButton = screen.getByRole('button', { name: 'Buscar' })
    
    fireEvent.click(searchButton)
    
    expect(global.fetch).not.toHaveBeenCalled()
    expect(screen.getByText('Ingresa un término de búsqueda')).toBeInTheDocument()
  })
}) 