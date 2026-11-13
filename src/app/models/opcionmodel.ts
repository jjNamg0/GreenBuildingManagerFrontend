export interface Opcion<T = string> {
  valor: T;
  texto: string;
  icono?: string;
}

export interface Insignia {
  texto: string;
  clase: string;
  icono: string;
}

/** Busca una opción por su valor. */
export const buscarOpcion = <T>(opciones: Opcion<T>[], valor: T): Opcion<T> | undefined =>
  opciones.find((opcion) => opcion.valor === valor);

/** Devuelve el texto de la opción con ese valor. */
export const textoOpcion = <T>(opciones: Opcion<T>[], valor: T): string =>
  buscarOpcion(opciones, valor)?.texto ?? String(valor);

/** Devuelve el ícono de la opción con ese valor o el ícono por defecto. */
export const iconoOpcion = <T>(opciones: Opcion<T>[], valor: T, porDefecto: string): string =>
  buscarOpcion(opciones, valor)?.icono ?? porDefecto;

export const IMAGEN_RESPALDO = 'assets/images/respaldo.svg';

/** Devuelve la clase del ícono: un spinner mientras carga o el ícono normal. */
export const claseSpinner = (cargando: boolean, icono: string): string =>
  cargando ? 'spinner-border spinner-border-sm' : `fa-solid ${icono}`;
