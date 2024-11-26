export function convertDateToDDMMYYY(fecha: Date): string {
  const mi_fecha = new Date(fecha);

  // Obtener el día, mes y año
  const dia = String(mi_fecha.getDate()).padStart(2, "0"); // Asegura que el día tenga dos dígitos
  const mes = String(mi_fecha.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-11, por eso sumamos 1
  const anio = mi_fecha.getFullYear();

  // Formatear la fecha en el formato 'dd-mm-YYYY'
  const fechaFormateada = `${dia}-${mes}-${anio}`;

  return fechaFormateada;
}
