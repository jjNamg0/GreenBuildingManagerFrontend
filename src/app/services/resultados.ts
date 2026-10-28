import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Resultado, ResultadoFallido } from '../models/resultadomodel';
import { RespuestaError } from '../models/sesionmodel';
import { mensajeError } from './validaciones';

export function armarResultado<T>(respuesta: HttpResponse<T>, mensaje = ''): Resultado<T> {
  if (respuesta.body === null) {
    return { exito: false, status: respuesta.status, mensaje: 'El servidor respondió sin datos.', detalle: null };
  }
  return { exito: true, status: respuesta.status, mensaje, datos: respuesta.body };
}

export function armarLista<T>(respuesta: HttpResponse<T[]>, mensaje = ''): Resultado<T[]> {
  return { exito: true, status: respuesta.status, mensaje, datos: respuesta.body ?? [] };
}

export function armarError(error: HttpErrorResponse, mensaje: string): ResultadoFallido {
  const detalle = typeof error.error === 'object' && error.error !== null ? (error.error as RespuestaError) : null;
  return { exito: false, status: error.status, mensaje: mensajeError(error, mensaje), detalle };
}
