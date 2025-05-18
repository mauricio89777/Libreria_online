import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',  // Para testing de React (simula el navegador)
    globals: true,         // Permite usar describe/it/expect sin importar
    setupFiles: './src/test/vitest.setup.ts',  // Configuración adicional (opcional)
    css: true,
    coverage: {
      reporter: ['text','lcov'],
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})