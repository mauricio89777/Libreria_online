import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  try {
    // 1. Construye la URL correctamente con API key
    const apiUrl = new URL("https://www.googleapis.com/books/v1/volumes");
    apiUrl.searchParams.append("q", query);
    apiUrl.searchParams.append("maxResults", "12");

    // 2. Usa parámetro key (no Authorization Bearer)
    if (process.env.GOOGLE_BOOKS_API_KEY) {
      apiUrl.searchParams.append("key", process.env.GOOGLE_BOOKS_API_KEY);
    }

    const res = await fetch(apiUrl.toString());

    // 3. Mejor manejo de errores
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Google Books API Error:", errorData);
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // 4. Formatea la respuesta consistentemente
    const libros =
      data.items?.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo?.title || "Sin título",
        authors: item.volumeInfo?.authors || ["Autor desconocido"],
        description: item.volumeInfo?.description || "Sin descripción",
        imagen: item.volumeInfo?.imageLinks?.thumbnail || null,
      })) || [];

    return NextResponse.json(libros);
  } catch (error) {
    console.error("Error en /api/libros:", error);
    return NextResponse.json(
      {
        error: "Error al buscar libros",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
