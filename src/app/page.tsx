import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import BookCarousel from "@/app/components/carrusel-libro";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[500px] w-full overflow-hidden">
          <Image
            src="/images/libreria_banner.jpg"
            alt="Librería Banner"
            width={1920}
            height={1080}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Descubre Mundos a Través de la Lectura
            </h1>
            <p className="mt-4 max-w-md text-lg text-white">
              Explora nuestra colección de libros y encuentra tu próxima
              aventura literaria.
            </p>
            <Button asChild className="mt-6">
              {/* mt-6  bg-blue-600 hover:bg-blue-700 mt-4 py-6esto estaba haci pero lo cambie para que  */}
              <Link href="/catalogo">Ver Catálogo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="container px-4 py-8 md:px-6 md:py-12">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">
          Los Más Vendidos
        </h2>
        <BookCarousel />
      </section>

      {/* Categories Section */}
      <section className="container px-4 py-8 md:px-6 md:py-12 bg-muted/50">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">
          Categorías Populares
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { name: "Ficción", img: "/images/genero_ficcion.jpg" },
            { name: "No Ficción", img: "/images/genero_no_ficcion.webp" },
            { name: "Infantil", img: "/images/genero_infantil.jpg" },
            { name: "Académico", img: "/images/genero_academico.jpg" },
          ].map(({ name, img }) => (
            <Link
              key={name}
              href={`/catalogo?categoria=${name}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-square w-full bg-muted">
                <Image
                  src={img}
                  alt={name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <h3 className="text-xl font-bold text-white">{name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
