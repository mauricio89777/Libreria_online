import { Suspense } from "react";
import BookCatalog from "@/app/components/catalogo_libro";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Button } from "@/app/components/ui/button";

export default function CatalogoPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Catálogo de Libros</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-300">
            Filtros
          </Button>
          <Button variant="outline" className="border-gray-300">
            Ordenar
          </Button>
        </div>
      </div>

      <Suspense fallback={<CatalogSkeleton />}>
        <BookCatalog />
      </Suspense>
    </div>
  );
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <Skeleton className="h-4 w-1/4 rounded" />
          </div>
          <Skeleton className="h-10 w-full rounded-md mt-2" />
        </div>
      ))}
    </div>
  );
}
