import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.url;

  // Definir las rutas permitidas
  const allowedPaths = ["/", "/admin"];

  // Verificar si la ruta solicitada está en las rutas permitidas
  if (allowedPaths.some((path) => url.includes(path))) {
    return NextResponse.next(); // Permite la solicitud
  }

  // Si la ruta no está permitida, redirige al home (o alguna ruta segura)
  return NextResponse.redirect(new URL("/", url));
}

// Define las rutas que serán manejadas por el middleware
export const config = {
  matcher: [
    "/admin",
    "/admin/canje",
    "/admin/menu",
    "/admin/registro",
    "/admin/ventas",
  ], // Rutas donde se aplica el middleware
};
