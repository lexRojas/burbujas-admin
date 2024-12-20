import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { saldoclientes } from "@prisma/client/sql";

// Manejar solicitudes GET
export async function GET() {
  try {
    try {
      const saldoraw = await prisma.$queryRawTyped(saldoclientes());
      return NextResponse.json(saldoraw, { status: 200 });
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
}
