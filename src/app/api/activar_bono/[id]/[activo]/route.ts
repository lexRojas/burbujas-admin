// pages/api/bonos.ts
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: number; activo: boolean }> },
): Promise<NextResponse> {
  try {
    const { id, activo } = await params;

    if (!id || !activo) {
      return NextResponse.json({ error: "Faltan ID" }, { status: 400 });
    }

    const bono = await prisma.bonos.findUnique({
      where: { id: Number(id.toString()) },
    });

    if (!bono) {
      return NextResponse.json(
        { error: "no existe este bono" },
        { status: 400 },
      );
    }
    // Convertir el valor de 'activo' a booleano
    const myId = parseInt(id.toString());
    let isActivo: boolean;

    if (activo) {
      isActivo = true;
    } else {
      isActivo = false;
    }

    const bonoActualizado = await prisma.bonos.update({
      where: { id: myId },
      data: { activo: isActivo },
    });

    return NextResponse.json(bonoActualizado, { status: 200 });
  } catch (e) {
    console.error({ mensaje: "Error en el servidor:" + e });
    return NextResponse.json({ error: "Error ->" + e }, { status: 500 });
  }
}
