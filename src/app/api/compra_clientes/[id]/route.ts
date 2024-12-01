// pages/api/compras_clientes.ts

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Faltan ID" }, { status: 400 });
    }

    const compras = await prisma.comprasCliente.delete({
      where: { id: Number(id.toString()) },
    });

    return NextResponse.json(compras, { status: 200 });
  } catch (e) {
    console.error({ mensaje: "Error en el servidor:" + e });
    return NextResponse.json({ error: "Error ->" + e }, { status: 500 });
  }
}
