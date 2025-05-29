import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from '../app/components/ui/checkbox'

describe('Checkbox', () => {
  it('debería renderizar correctamente con una etiqueta', () => {
    render(<Checkbox label="Acepto los términos" />)
    expect(screen.getByRole('checkbox', { name: 'Acepto los términos' })).toBeInTheDocument()
  })

  it('debería manejar el cambio de estado', () => {
    const handleChange = vi.fn()
    render(<Checkbox label="Test Checkbox" onChange={handleChange} />)
    
    const checkbox = screen.getByRole('checkbox', { name: 'Test Checkbox' })
    fireEvent.click(checkbox)
    
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(checkbox).toBeChecked()
  })

  it('debería respetar el estado deshabilitado', () => {
    render(<Checkbox label="Checkbox Deshabilitado" disabled />)
    const checkbox = screen.getByRole('checkbox', { name: 'Checkbox Deshabilitado' })
    
    expect(checkbox).toBeDisabled()
    expect(checkbox).toHaveClass('disabled:cursor-not-allowed')
  })

  it('debería aplicar clases personalizadas al contenedor', () => {
    render(
      <Checkbox 
        label="Checkbox con clase personalizada" 
        containerClass="custom-class" 
      />
    )
    
    const container = screen.getByRole('checkbox', { name: 'Checkbox con clase personalizada' }).parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('debería aparecer marcado con defaultChecked', () => {
    render(<Checkbox label="Checkbox Checked" defaultChecked />)
    const checkbox = screen.getByRole('checkbox', { name: 'Checkbox Checked' })
    
    expect(checkbox).toBeChecked()
  })

  
}) 