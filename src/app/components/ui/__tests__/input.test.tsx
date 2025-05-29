import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../input';

describe('Input Component', () => {
  it('renderiza correctamente con props básicos', () => {
    render(<Input placeholder="Ingrese texto" type='text' />);
    const input = screen.getByPlaceholderText('Ingrese texto');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('aplica className personalizado', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('maneja el evento onChange correctamente', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renderiza correctamente en estado deshabilitado', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed');
  });

  it('aplica el tipo de input correcto', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('maneja el valor inicial correctamente', () => {
    render(<Input defaultValue="valor inicial" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('valor inicial');
  });
}); 