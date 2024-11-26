import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cedula: string }> },
): Promise<NextResponse> {
  try {
    const { cedula } = await params;

    if (!cedula) {
      return NextResponse.json(
        { error: "Cedula no debe quedar en blanco" },
        { status: 400 },
      );
    }

    try {
      const cliente = await prisma.cliente.findUnique({
        where: { cedula },
        include: {
          compras: true,
          puntosUsados: true,
        },
      });

      // si no existe el cliente
      if (!cliente) {
        return NextResponse.json(
          { error: "Cliente no existe" },
          { status: 404 },
        );
      }

      return NextResponse.json(cliente, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: `Se dio un error ${error}` },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Se dio un error ${error}` },
      { status: 500 },
    );
  }
}
