export type User = {
  cedula: number | null;
  nombre: string;
  direccion: string;
  correo: string;
  telefono: number | null;
};

export type ComprasUser = {
  id: number; // Clave primaria autoincremental
  cedula: number; // Referencia a la tabla user (FOREIGN KEY)
  fecha: string; // Fecha en formato ISO o tipo DATE
  monto_compra: number; // Monto de la compra
  puntos: number; // Puntos generados por la compra
  vencidos: boolean; //indica si los puntos ya vencieron
};

export type PuntosUsadosUser = {
  id: number; // Clave primaria autoincremental
  cedula: number; // Referencia a la tabla user (FOREIGN KEY)
  fecha: string; // Fecha en formato ISO o tipo DATE
  monto_compra: number; // Monto asociado a la transacción
  puntos_usados: number; // Puntos utilizados en la transacción
};

export type SaldoPuntosUser = {
  cedula: number;
  nombre: string;
  total_puntos: number;
  total_puntos_usados: number;
  saldo: number;
};
