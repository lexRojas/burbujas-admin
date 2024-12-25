// pages/api/clientes.ts

import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      include: {
        compras: true, // Incluir todas las compras relacionadas
        puntosUsados: true, // Incluir todos los puntos usados
      },
    });
    return NextResponse.json(clientes, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "No hay clientes " }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cedula, nombre, direccion, correo, telefono } = body;

    if (!cedula || !nombre) {
      return NextResponse.json(
        { error: "Los campos cedula y nombre son obligatorios" },
        { status: 400 },
      );
    }

    const cliente = await prisma.cliente.create({
      data: { cedula, nombre, direccion, correo, telefono },
    });

    const bonos = await prisma.bonos.findMany();
    const today = new Date();
    // Usar for...of para iterar y esperar las operaciones asíncronas
    for (const bono of bonos) {
      if (bono.fecha_inicio <= today && bono.fecha_final >= today) {
        console.log(bono);
        // Esperar la creación de las compras
        await prisma.comprasCliente.create({
          data: {
            cedula: cedula,
            fecha: today,
            montoCompra: 0,
            puntos: bono.bono_puntos,
            origen_puntos: bono.descripcion,
            vencido: false,
          },
        });
      }
    }

    return NextResponse.json(cliente, {
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
          { error: "El cliente con esta cédula ya existe..." },
          { status: 409 }, // Conflict status code
        );
      }
    }

    // Log de error general
    console.error("Error al crear un cliente", error);

    // Respuesta genérica en caso de error inesperado
    return NextResponse.json(
      { error: "No fue posible crear el cliente" },
      { status: 500 },
    );
  }
}

// Manejar otros métodos HTTP no soportados
export async function DELETE() {
  return NextResponse.json(
    { error: "DELETE no está soportado en esta ruta" },
    { status: 405 },
  );
}
