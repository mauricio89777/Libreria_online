import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactoPage from '../app/contacto/page';

describe('Formulario de Contacto', () => {
  it('registra correctamente con datos válidos', async () => {
    render(<ContactoPage />);
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'juan@email.com' } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: 'Consulta' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Hola, tengo una duda.' } });

    fireEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    // Espera el mensaje de éxito
    await waitFor(() => {
        expect(screen.getByTestId('mensaje-exitoso')).toBeInTheDocument();
      }, { timeout: 2000 }); 
  });

  it('no permite enviar si faltan campos obligatorios', async () => {
    render(<ContactoPage />);
    // No llenamos ningún campo
    fireEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    // Espera un pequeño tiempo para asegurar que no aparece el mensaje de éxito
    await waitFor(() => {
        expect(screen.queryByTestId('mensaje-exitoso')).not.toBeInTheDocument();
    });
  });
}); 