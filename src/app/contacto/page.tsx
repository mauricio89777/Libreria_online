"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de envío
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Contáctanos</h1>
          <p className="text-lg text-blue-600">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Sección de información */}
          <div className="bg-blue-700 text-white p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-2 rounded-full">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">Dirección</h3>
                  <p className="text-blue-100">
                    Calle Librería 123, Santiago, Chile
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">Teléfono</h3>
                  <p className="text-blue-100">+56 2 1234 5678</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-blue-100">info@libreria.com</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Horario de Atención</h2>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-blue-600 pb-2">
                  <span>Lunes a Viernes</span>
                  <span className="font-medium">9:00 - 19:00</span>
                </li>
                <li className="flex justify-between border-b border-blue-600 pb-2">
                  <span>Sábados</span>
                  <span className="font-medium">10:00 - 16:00</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>Domingos y Festivos</span>
                  <span className="font-medium">Cerrado</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Formulario */}
          <div className="p-8 md:p-10">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800">
                  Envía tu mensaje
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Completa el formulario y te responderemos a la brevedad.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div data-testid="mensaje-exitoso" className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
                    <p className="font-bold">¡Mensaje enviado con éxito!</p>
                    <p className="text-sm mt-1">
                      Nos pondremos en contacto contigo pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-gray-700">
                        Nombre
                      </Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="asunto" className="text-gray-700">
                        Asunto
                      </Label>
                      <Input
                        id="asunto"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje" className="text-gray-700">
                        Mensaje
                      </Label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        rows={5}
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 mt-4 py-6"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Mensaje
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
