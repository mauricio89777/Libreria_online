import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extiende Vitest con los matchers de jest-dom
expect.extend(matchers)

// Limpia después de cada prueba
afterEach(() => {
  cleanup()
})

// Configuración global para las pruebas
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})) 