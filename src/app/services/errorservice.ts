import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

const SIN_CONEXION = 0;

const MENSAJES_POR_ESTADO: Record<number, string> = {
  [SIN_CONEXION]:
    'No se pudo conectar con el servidor. Verifica que el back esté encendido en localhost:8080.',
  401: 'Tu sesión expiró. Inicia sesión de nuevo.',
  403: 'No tienes permisos para realizar esta acción.',
  404: 'No se encontró la información solicitada.',
};

const textoDelCuerpo = (cuerpo: unknown): string => {
  if (typeof cuerpo === 'string') {
    return cuerpo.trim();
  }
  const objeto = (cuerpo ?? {}) as { mensaje?: string; message?: string };
  return objeto.mensaje ?? objeto.message ?? '';
};

const mensajeHttp = (error: HttpErrorResponse, porDefecto: string): string => {
  if (error.status === SIN_CONEXION) {
    return MENSAJES_POR_ESTADO[SIN_CONEXION];
  }
  return textoDelCuerpo(error.error) || MENSAJES_POR_ESTADO[error.status] || porDefecto;
};

@Injectable({
  providedIn: 'root',
})
export class Errorservice {
  private readonly MENSAJE_GENERAL = 'Ocurrió un error inesperado. Intenta de nuevo.';

  obtenerMensaje(error: unknown, porDefecto: string = this.MENSAJE_GENERAL): string {
    if (error instanceof HttpErrorResponse) {
      return mensajeHttp(error, porDefecto);
    }
    return error instanceof Error && error.message ? error.message : porDefecto;
  }
}
