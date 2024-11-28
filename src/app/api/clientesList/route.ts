// pages/api/clientes.ts

import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany();
    return NextResponse.json(clientes, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "No hay clientes " }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json(
    { error: "POST no está soportado en esta ruta" },
    { status: 405 },
  );
}
// Manejar otros métodos HTTP no soportados
export async function DELETE() {
  return NextResponse.json(
    { error: "DELETE no está soportado en esta ruta" },
    { status: 405 },
  );
}
