// pages/api/bonos.ts
import { Prisma } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

interface Bono {
  descripcion: string;
  fecha_inicio: Date;
  fecha_final: Date;
  bono_puntos: number;
  activo: boolean;
}

export async function GET() {
  try {
    const bonos = await prisma.bonos.findMany();
    return NextResponse.json(bonos, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "No hay bonos" }, { status: 500 });
  }
}

// Manejar otros métodos HTTP no soportados
export async function POST(req: Request) {
  try {
    const body: Bono = await req.json();

    console.log("body...");
    console.log(body);

    const { descripcion, fecha_inicio, fecha_final, bono_puntos, activo } =
      body;

    if (!descripcion || !fecha_final || !fecha_inicio) {
      return NextResponse.json(
        { error: "Los campos descripcion y fechas son obligatorios" },
        { status: 400 },
      );
    }

    const monto_bono = parseInt(bono_puntos.toString());

    const bono = await prisma.bonos.create({
      data: {
        descripcion,
        fecha_inicio,
        fecha_final,
        bono_puntos: monto_bono,
        activo,
      },
    });

    return NextResponse.json(bono, {
      status: 201,
      headers: {
        "Cache-Control": "no-store", // Esto evita que se almacene en caché la respuesta
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Manejo de error de cliente duplicado

      if (error.code === "P2002") {
        // Prisma error code for unique constraint violation
        return NextResponse.json(
          { error: "El bono con esta id ya existe" },
          { status: 409 }, // Conflict status code
        );
      }
    }

    // Log de error general

    // Respuesta genérica en caso de error inesperado
    return NextResponse.json(
      { error: "No fue posible crear el cliente" + error },
      { status: 500 },
    );
  }
}
