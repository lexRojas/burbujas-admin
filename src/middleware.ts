import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("access_token");

  const url = req.url;

  if (url.endsWith("/admin")) {
    return NextResponse.next();
  } else {
    if (hasCookie) {
      const token = cookieStore.get("access_token");

      const JWT_SECRET = process.env.JWT_SECRET;

      try {
        await jwtVerify(token!.value, new TextEncoder().encode(JWT_SECRET!));
      } catch (e) {
        console.error({ mensaje: "jwt expiro", error: e });
        return NextResponse.redirect(new URL("/admin", req.url));
      }

      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }
}

// Define qué rutas deben pasar por este middleware
export const config = {
  runtime: "nodejs", // desactiva el Edge Runtime
  matcher: ["/admin/:path*"],
};
