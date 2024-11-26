// pages/api/compras_clientes.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // Obtener todas las compras
    const compras = await prisma.comprasCliente.findMany();
    res.status(200).json(compras);
  } else if (req.method === "POST") {
    // Crear un compra cliente
    const { cedula, fecha, montoCompra, puntos, vencido } = req.body;

    try {
      const cliente = await prisma.comprasCliente.create({
        data: { cedula, fecha, montoCompra, puntos, vencido },
      });

      res.status(201).json(cliente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear la compra" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
