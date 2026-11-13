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

export const buscarOpcion = <T>(opciones: Opcion<T>[], valor: T): Opcion<T> | undefined =>
  opciones.find((opcion) => opcion.valor === valor);

export const textoOpcion = <T>(opciones: Opcion<T>[], valor: T): string =>
  buscarOpcion(opciones, valor)?.texto ?? String(valor);

export const iconoOpcion = <T>(opciones: Opcion<T>[], valor: T, porDefecto: string): string =>
  buscarOpcion(opciones, valor)?.icono ?? porDefecto;

export const IMAGEN_RESPALDO = 'assets/images/respaldo.svg';

export const claseSpinner = (cargando: boolean, icono: string): string =>
  cargando ? 'spinner-border spinner-border-sm' : `fa-solid ${icono}`;
