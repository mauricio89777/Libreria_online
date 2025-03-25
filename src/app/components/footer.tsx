import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div
        className="container grid gap-8 px-4 py-10
            md:grid-cols-2 lg:grid-cols-4 md:px-6"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Libreria Online</h3>
          <p className="text-sm text-muted-foreground">
            Tu destino para encontrar los mejores libros con envio a todo el
            pais.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Enlaces Rápidos</h3>
          <nav className="flex flex-col gap-2">
            <Link href="/linksdasd" className="text-sm hover:underline">
              Más Sobre Nosotros
            </Link>

            <p>sobre nosotros/ pagina / </p>
            <p>¿quieres Trabajar con nosotros</p>
            <p>Política de Privacidad</p>
            <p>Términos y condiciones</p>
            {/* Aqui irian los link de las paginas */}
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Contacto</h3>
          <address className="flex flex-col gap-2 not-italic">
            <p className="text-sm">Calle Librería 123</p>
            <p className="text-sm">Ciudad, País</p>
            <p className="text-sm">info@libreria.com</p>
            <p className="text-sm">+123 456 7890</p>
          </address>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Síguenos</h3>
          <div className="flex gap-4">
            <p>link</p>
            <p>link</p>
            <p>link</p>
          </div>
        </div>
      </div>

      <div className="border-t py-6">
        <div
          className="container flex flex-col items-center
        justify-center gap-2 px-4 md:px-6"
        >
          <p
            className="text-center text-sm
            text-muted-foreground"
          >
            &copy; {new Date().getFullYear()} Librería Online. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
