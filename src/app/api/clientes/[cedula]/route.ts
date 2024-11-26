import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { cedula: string } },
) {
  const { cedula } = context.params;

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
      return NextResponse.json({ error: "Cliente no existe" }, { status: 404 });
    }

    return NextResponse.json(cliente, { status: 200 });
  } catch (error) {
    NextResponse.json({ error: `Se dio un error ${error}` }, { status: 500 });
  }
}
