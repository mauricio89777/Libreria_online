import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../app/login/page';
import { AuthContext } from '../app/context/auth-context';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
    }),
  }));

const mockLogin = vi.fn().mockResolvedValue({
  success: false,
  error: 'Credenciales incorrectas'
});

const customRender = (ui: React.ReactElement) => {
    return render(
      <AuthContext.Provider
        value={{
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Credenciales incorrectas', 
          login: mockLogin,
          logout: vi.fn(),
        }}
      >
        {ui}
      </AuthContext.Provider>
    );
  };

describe('LoginPage', () => {
  it('muestra un mensaje de error con credenciales incorrectas', async () => {
    customRender(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: 'incorrecta' } });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
    });
  });
}); 