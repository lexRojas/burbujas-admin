import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

import dotenv from "dotenv";

dotenv.config();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ login: string; password: string }> },
): Promise<NextResponse> {
  const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

  try {
    const { login, password } = await params;

    if (!login) {
      return NextResponse.json(
        { error: "El parámetro login es obligatorio" },
        { status: 400 },
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "El parámetro password es obligatorio" },
        { status: 400 },
      );
    }

    try {
      const usuario = await prisma.usuario.findUnique({
        where: { login },
      });

      if (!usuario) {
        return NextResponse.json(
          { error: "Usuario no encontrado" },
          { status: 404 },
        );
      }

      try {
        const secret = new TextEncoder().encode(JWT_SECRET);

        const token = await new SignJWT({ usuario: login }) // Define el payload
          .setProtectedHeader({ alg: "HS256" }) // Especificamos el algoritmo
          .setIssuedAt() // Marca el tiempo de emisión
          .setExpirationTime("1m") // El token expira en 1 hora
          .sign(secret); // Firmamos el JWT con la clave secreta

        const cookieStore = await cookies();

        cookieStore.set({
          name: "access_token",
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV == "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        });

        return NextResponse.json(usuario, { status: 200 });
      } catch (e) {
        return NextResponse.json(
          { error: "Error interno generar la clave firmada" + e },
          { status: 500 },
        );
      }
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return NextResponse.json(
        { error: "Error interno al obtener el usuario" },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Error interno al obtener el usuario  ${error}` },
      { status: 500 },
    );
  }
}
