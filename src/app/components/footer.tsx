"use client";

import Link from "next/link";
import { BookOpen, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://instagram.com",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: "https://twitter.com",
    },
    {
      name: "Linkedin",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://linkedin.com",
    },
  ];

  const quickLinks = [
    { text: "Más Sobre Nosotros", href: "/sobrenosotros" },
    { text: "¿Quieres Trabajar con Nosotros?", href: "/trabaja-con-nosotros" },
    { text: "Política y Privacidad", href: "/politica-privacidad" },
    { text: "Términos y Condiciones", href: "/terminosCodiciones" },
  ];

  return (
    <footer className="w-full bg-blue-800 text-white shadow-lg">
      <div className="container grid gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4 md:px-6">
        {/* Sección Información */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-white" />
            <h3 className="text-lg font-bold">Librería Online</h3>
          </div>
          <p className="text-sm text-blue-200">
            Tu destino para encontrar los mejores libros con envío a todo el
            país.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Enlaces Rápidos</h3>
          <nav className="space-y-2">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block text-sm hover:underline transition-colors text-blue-200 hover:text-white"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contacto */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Contacto</h3>
          <address className="space-y-2 not-italic text-blue-200">
            <p className="text-sm">Calle Librería 123</p>
            <p className="text-sm">Santiago, Chile</p>
            <p className="text-sm">info@libreria.com</p>
            <p className="text-sm">+123 456 7890</p>
          </address>
        </div>

        {/* Redes sociales */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Síguenos</h3>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors text-white"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-700 py-6">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 md:px-6">
          <p className="text-center text-sm text-blue-200">
            &copy; {currentYear} Librería Online. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
