import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  try {
    // url con API key
    const apiUrl = new URL("https://www.googleapis.com/books/v1/volumes");
    apiUrl.searchParams.append("q", query);
    apiUrl.searchParams.append("maxResults", "12");

    // key
    if (process.env.GOOGLE_BOOKS_API_KEY) {
      apiUrl.searchParams.append("key", process.env.GOOGLE_BOOKS_API_KEY);
    }

    const res = await fetch(apiUrl.toString());

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Google Books API Error:", errorData);
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    
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
