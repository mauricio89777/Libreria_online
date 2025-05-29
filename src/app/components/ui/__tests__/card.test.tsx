import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../card';

describe('Card Component', () => {
  it('renderiza correctamente el Card básico', () => {
    render(<Card>Contenido del Card</Card>);
    const card = screen.getByText('Contenido del Card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-card');
  });

  it('aplica className personalizado al Card', () => {
    render(<Card className="custom-card">Contenido</Card>);
    const card = screen.getByText('Contenido');
    expect(card).toHaveClass('custom-card');
  });

  it('renderiza correctamente un Card completo con todos sus subcomponentes', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título del Card</CardTitle>
          <CardDescription>Descripción del Card</CardDescription>
        </CardHeader>
        <CardContent>Contenido principal</CardContent>
        <CardFooter>Pie del Card</CardFooter>
      </Card>
    );

    expect(screen.getByText('Título del Card')).toBeInTheDocument();
    expect(screen.getByText('Descripción del Card')).toBeInTheDocument();
    expect(screen.getByText('Contenido principal')).toBeInTheDocument();
    expect(screen.getByText('Pie del Card')).toBeInTheDocument();
  });

  it('aplica estilos correctos a cada subcomponente', () => {
    render(
      <Card>
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">Título</CardTitle>
          <CardDescription className="custom-description">Descripción</CardDescription>
        </CardHeader>
        <CardContent className="custom-content">Contenido</CardContent>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Título').parentElement).toHaveClass('custom-header');
    expect(screen.getByText('Título')).toHaveClass('custom-title');
    expect(screen.getByText('Descripción')).toHaveClass('custom-description');
    expect(screen.getByText('Contenido')).toHaveClass('custom-content');
    expect(screen.getByText('Footer')).toHaveClass('custom-footer');
  });

  it('mantiene la estructura jerárquica correcta', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
        </CardHeader>
        <CardContent>Contenido</CardContent>
      </Card>
    );

    const header = container.querySelector('div[class*="flex flex-col space-y-1.5 p-6"]');
    const title = header?.querySelector('h3');
    const content = container.querySelector('div[class*="p-6 pt-0"]');

    expect(header).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
}); 