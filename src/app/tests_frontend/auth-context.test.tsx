import { render, act, renderHook } from '@testing-library/react'
import { AuthProvider, useAuth } from '../context/auth-context'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ReactNode } from 'react'

// Mock de fetch
global.fetch = vi.fn()

// Mock de localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    })
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Wrapper para los tests
const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
  })

  it('inicializa con valores por defecto', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    // Esperamos a que el useEffect termine
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    
    expect(result.current.token).toBeNull()
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('login exitoso actualiza el estado correctamente', async () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    }

    const mockResponse = {
      token: 'fake-token',
      user: mockUser
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('test@example.com', 'password123')
    })

    expect(result.current.token).toBe('fake-token')
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.error).toBeNull()
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'fake-token')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser))
  })

  it('login fallido maneja el error correctamente', async () => {
    const errorMessage = 'Credenciales inválidas'
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: errorMessage })
    })

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('test@example.com', 'wrong-password')
    })

    expect(result.current.token).toBeNull()
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.error).toBe(errorMessage)
  })

  it('register exitoso realiza login automático', async () => {
    const mockUser = {
      id: '1',
      name: 'New User',
      email: 'new@example.com',
      role: 'user'
    }

    const mockResponse = {
      token: 'fake-token',
      user: mockUser
    }

    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: 'Usuario registrado exitosamente' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.register('New User', 'new@example.com', 'password123')
    })

    expect(result.current.token).toBe('fake-token')
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it('logout limpia el estado y localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => {
      result.current.logout()
    })

    expect(result.current.token).toBeNull()
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token')
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
  })

  it('carga el estado inicial desde localStorage', () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    }

    localStorageMock.setItem('token', 'stored-token')
    localStorageMock.setItem('user', JSON.stringify(mockUser))

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.token).toBe('stored-token')
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('maneja errores de red en login', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Error de red'))

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('test@example.com', 'password123')
    })

    expect(result.current.token).toBeNull()
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.error).toBe('Error de red')
  })
}) 