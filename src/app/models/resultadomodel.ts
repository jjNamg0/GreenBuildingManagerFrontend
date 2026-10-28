import { RespuestaError } from './sesionmodel';

export interface ResultadoExitoso<T> {
  exito: true;
  status: number;
  mensaje: string;
  datos: T;
}

export interface ResultadoFallido {
  exito: false;
  status: number;
  mensaje: string;
  detalle: RespuestaError | null;
}

export type Resultado<T> = ResultadoExitoso<T> | ResultadoFallido;
