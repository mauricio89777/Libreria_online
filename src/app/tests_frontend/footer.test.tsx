import { render, screen } from '@testing-library/react'
import Footer from '../components/footer'
import { describe, it, expect } from 'vitest'

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it('renders the company name and description', () => {
    expect(screen.getByText('Librería Online')).toBeInTheDocument()
    expect(
      screen.getByText(/Tu destino para encontrar los mejores libros/i)
    ).toBeInTheDocument()
  })

  it('displays the current year in copyright', () => {
    const currentYear = new Date().getFullYear().toString()
    expect(
      screen.getByText(`© ${currentYear} Librería Online. Todos los derechos reservados.`)
    ).toBeInTheDocument()
  })

  it('renders all quick links correctly', () => {
    const quickLinks = [
      'Más Sobre Nosotros',
      '¿Quieres Trabajar con Nosotros?',
      'Política y Privacidad',
      'Términos y Condiciones'
    ]
    
    quickLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument()
    })
  })

  it('displays contact information', () => {
    const contactInfo = [
      'Calle Librería 123',
      'Santiago, Chile',
      'info@libreria.com',
      '+123 456 7890'
    ]
    
    contactInfo.forEach(info => {
      expect(screen.getByText(info)).toBeInTheDocument()
    })
  })

  it('renders all social media icons', () => {
    const socialMedia = ['Facebook', 'Instagram', 'Twitter', 'Linkedin']
    
    socialMedia.forEach(name => {
      expect(screen.getByLabelText(name)).toBeInTheDocument()
    })
  })

  it('has correct CSS classes for styling', () => {
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-blue-800')
    expect(footer).toHaveClass('text-white')
    
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      if (link.textContent !== '') { // Excluye los iconos
        expect(link).toHaveClass('text-blue-200')
        expect(link).toHaveClass('hover:text-white')
      }
    })
  })
})