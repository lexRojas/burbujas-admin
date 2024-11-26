// pages/api/puntos_usados_clientes.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // Obtener todos los puntos usados
    const puntosUsadosCliente = await prisma.puntosUsadosCliente.findMany();
    res.status(200).json(puntosUsadosCliente);
  } else if (req.method === "POST") {
    // Crear un cliente
    const { cedula, fecha, montoCompra, puntosUsados } = req.body;

    try {
      const puntosUsadosCliente = await prisma.puntosUsadosCliente.create({
        data: { cedula, fecha, montoCompra, puntosUsados },
      });
      res.status(201).json(puntosUsadosCliente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear puntos" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
