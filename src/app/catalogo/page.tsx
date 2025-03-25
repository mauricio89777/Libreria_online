import { Suspense } from "react";
import BookCatalog from "@/app/components/catalogo_libro";
import { Skeleton } from "@/app/components/ui/skeleton";

export default function CatalogoPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="mb-8 text-3xl font-bold">Catálogo de Libros</h1>
      <Suspense fallback={<CatalogSkeleton />}>
        <BookCatalog />
      </Suspense>
    </div>
  );
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="aspect-[3/4] w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}
