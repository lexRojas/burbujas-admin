import { NextResponse } from "next/server";
import prisma from "../../lib/prisma"; // Ajusta la ruta a tu archivo `prisma.ts`

// Manejar solicitudes GET
export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany();
    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener los usuarios" },
      { status: 500 },
    );
  }
}

// Manejar solicitudes POST
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, login, password, perfil, activo } = body;

    // Validación básica
    if (!nombre || !login || !password) {
      return NextResponse.json(
        { error: "nombre, login y password son obligatorios" },
        { status: 400 },
      );
    }

    const usuario = await prisma.usuario.create({
      data: { nombre, login, password, perfil, activo },
    });

    return NextResponse.json(usuario, { status: 201 });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
    return NextResponse.json(
      { error: "Error interno al crear el usuario" },
      { status: 500 },
    );
  }
}

// Manejar otros métodos HTTP no soportados
export async function DELETE() {
  return NextResponse.json(
    { error: "DELETE no está soportado en esta ruta" },
    { status: 405 },
  );
}
