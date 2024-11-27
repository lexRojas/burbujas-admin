// pages/api/compras_clientes.ts

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

interface CompraCliente {
  cedula: string;
  fecha: Date;
  montoCompra: number;
  puntos: number;
  vencido: boolean;
}

//GET()
export async function GET() {
  try {
    const compras = await prisma.comprasCliente.findMany();

    if (compras) {
      return NextResponse.json(compras, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

//POST()
export async function POST(request: Request) {
  try {
    const body: CompraCliente = await request.json();
    const { cedula, fecha, montoCompra, puntos, vencido } = body;

    console.log("Body....");
    console.log(body);

    if (!cedula || !fecha) {
      return NextResponse.json(
        { error: "Faltan cedula o fecha" },
        { status: 400 },
      );
    }

    // const monto = parseFloat(montoCompra.toString()); // Asegúrate de que sea un número
    // const punto = parseFloat(puntos.toString());

    const compras = await prisma.comprasCliente.create({
      data: {
        cedula,
        fecha,
        montoCompra,
        puntos,
        vencido,
      },
    });

    return NextResponse.json(compras, { status: 201 });
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
