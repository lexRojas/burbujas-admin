import { Cliente, ComprasCliente, PuntosUsadosCliente } from "@prisma/client";
export interface ClienteConRelaciones extends Cliente {
  compras: ComprasCliente[];
  puntosUsados: PuntosUsadosCliente[];
}

export interface typeSaldopuntos {
  cedula: string;
  nombre: string;
  total_puntos: number;
  total_puntos_usados: number;
  saldo: number;
}
