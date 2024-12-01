// pages/api/compras_clientes.ts

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

interface PuntosUsadosCliente_interface {
  cedula: string;
  fecha: Date;
  montoCompra: number;
  puntosUsados: number;
}

//GET()
export async function GET() {
  try {
    const puntos = await prisma.puntosUsadosCliente.findMany();

    if (puntos) {
      return NextResponse.json(puntos, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

//POST()
export async function POST(request: Request) {
  try {
    const body: PuntosUsadosCliente_interface = await request.json();
    const { cedula, fecha, montoCompra, puntosUsados } = body;

    if (!cedula || !fecha) {
      return NextResponse.json(
        { error: "Faltan cedula o fecha" },
        { status: 400 },
      );
    }

    const monto_int = parseInt(montoCompra.toString()); // Asegúrate de que sea un número
    const punto_int = parseInt(puntosUsados.toString());

    const puntos = await prisma.puntosUsadosCliente.create({
      data: {
        cedula,
        fecha,
        montoCompra: monto_int,
        puntosUsados: punto_int,
      },
    });

    return NextResponse.json(puntos, { status: 201 });
  } catch (error) {
    console.error({ mensaje: "Error en el servidor:" + error }); // Log detallado del error
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  return NextResponse.json(
    { error: "DELETE no está soportado en esta ruta" },
    { status: 405 },
  );
}
