// lib/data.ts
import { createClient } from "@libsql/client";
import { User, SaldoPuntosUser } from "./modelos";

const TURSO_URL = process.env.TURSO_URL || "";
const TURSO_TOKEN = process.env.TURSO_TOKEN || "";

// Función para crear la conexión a la base de datos Turso
export const getTursoClient = () => {
  if (!TURSO_URL || !TURSO_TOKEN) {
    throw new Error(
      "La URL o el token de la base de datos no están configurados."
    );
  }

  try {
    const client = createClient({
      url: TURSO_URL,
      authToken: TURSO_TOKEN,
    });
    return client;
  } catch (error) {
    console.error("Error al crear la conexión a la base de datos:", error);
    throw new Error("No se pudo conectar a la base de datos");
  }
};

// Ejemplo de uso de la función de conexión
export const fetchData = async (query: string) => {
  const client = getTursoClient();
  try {
    const result = await client.execute(query);
    return result;
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    throw error;
  }
};

export const saveUserToDatabase = async (user: User) => {
  const client = getTursoClient();

  const query = `
    INSERT INTO user (cedula, nombre, direccion, correo, telefono)
    VALUES (?, ?, ?, ?, ?);
  `;

  try {
    const result = await client.execute({
      sql: query,
      args: [
        user.cedula,
        user.nombre,
        user.direccion,
        user.correo,
        user.telefono,
      ],
    });

    console.log("Usuario guardado exitosamente:", result);
    return result;
  } catch (error) {
    console.error("Error al guardar el usuario en la base de datos:", error);
    throw error;
  }
};

export const getSaldoPuntosUser = async (
  cedula: number
): Promise<SaldoPuntosUser[]> => {
  const client = getTursoClient();

  const query = `
            select a.cedula, a.nombre, b.total_puntos, c.total_puntos_usados, (b.total_puntos-c.total_puntos_usados) saldo
            from user a 
            inner join (select cedula,sum(puntos) total_puntos from  compras_user where not vencidos group by cedula) b on a.cedula = b.cedula 
            inner join (select cedula,sum(puntos_usados) total_puntos_usados from puntos_usados_user  group by cedula) c on a.cedula = c.cedula 
            where a.cedula = ? 
            group by a.cedula, a.nombre;  `;

  try {
    const result = await client.execute({
      sql: query,
      args: [cedula],
    });

    if (result && result.rows.length > 0) {
      // Mapeamos cada fila al tipo definido
      const saldoPuntosUsers: SaldoPuntosUser[] = result.rows.map((row) => ({
        cedula: Number(row.cedula).valueOf(),
        nombre: row.nombre?.toString() ?? "",
        total_puntos: Number(row.total_puntos).valueOf(),
        total_puntos_usados: Number(row.total_puntos_usados).valueOf(),
        saldo: Number(row.saldo).valueOf(),
      }));

      return saldoPuntosUsers; // Devolver todas las filas como un array de objetos
    }

    return [];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
