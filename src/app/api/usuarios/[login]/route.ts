import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Ajusta la ruta si es necesario

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ login: string }> },
): Promise<NextResponse> {
  try {
    const { login } = await params;
    if (!login) {
      return NextResponse.json(
        { error: "El parámetro login es obligatorio" },
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

      return NextResponse.json(usuario, { status: 200 });
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
