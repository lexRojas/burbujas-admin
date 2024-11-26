import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";
import { saldopuntos } from "@prisma/client/sql";
import { typeSaldopuntos } from "@/app/lib/modelos";

// Manejar solicitudes GET
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cedula: string }> },
): Promise<NextResponse> {
  try {
    const { cedula } = await params;
    // ...rest of the handler
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
  } catch (error) {
    return NextResponse.json(
      { error: `Error al obtener los usuarios ${error}` },
      { status: 500 },
    );
  }

  // export async function GET(
  //   req: Request,
  //   { params }: { params: { cedula: string } },
  // ) {
  //   const { cedula } = params;
}
