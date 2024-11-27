import { Cliente, ComprasCliente, PuntosUsadosCliente } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
export interface ClienteConRelaciones extends Cliente {
  compras: ComprasCliente[];
  puntosUsados: PuntosUsadosCliente[];
}

export interface typeSaldopuntos {
  cedula: string;
  nombre: string;
  total_puntos: Decimal;
  total_puntos_usados: Decimal;
  saldo: Decimal;
}
