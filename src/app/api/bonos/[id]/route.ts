// pages/api/bonos.ts
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Faltan ID" }, { status: 400 });
    }

    const compras = await prisma.bonos.delete({
      where: { id: Number(id.toString()) },
    });

    return NextResponse.json(compras, { status: 200 });
  } catch (e) {
    console.error({ mensaje: "Error en el servidor:" + e });
    return NextResponse.json({ error: "Error ->" + e }, { status: 500 });
  }
}
