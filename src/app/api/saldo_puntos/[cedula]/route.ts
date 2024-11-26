import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { saldopuntos } from "@prisma/client/sql";
import { typeSaldopuntos } from "@/app/lib/modelos";

// Manejar solicitudes GET
export async function GET(
  req: Request,
  { params }: { params: { cedula: string } },
) {
  const { cedula } = params;

  if (!cedula) {
    return NextResponse.json(
      { error: "Cedula no debe quedar en blanco" },
      { status: 400 },
    );
  }

  try {
    const saldo: typeSaldopuntos[] = await prisma.$queryRawTyped(
      saldopuntos(cedula),
    );
    return NextResponse.json(saldo, { status: 200 });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener los usuarios" },
      { status: 500 },
    );
  }
}
