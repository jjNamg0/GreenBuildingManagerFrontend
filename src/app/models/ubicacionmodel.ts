export interface Coordenadas {
  latitud: number;
  longitud: number;
}

const PERMISO_DENEGADO = 1;
const TIEMPO_AGOTADO = 3;

const MENSAJES_ERROR_UBICACION: Record<number, string> = {
  [PERMISO_DENEGADO]:
    'No diste permiso para usar tu ubicación. Actívalo en el candado de la barra de direcciones.',
  [TIEMPO_AGOTADO]: 'La ubicación tardó demasiado en responder. Intenta de nuevo.',
};

export const MENSAJE_SIN_GEOLOCALIZACION = 'Tu navegador no permite obtener la ubicación.';

export const mensajeErrorUbicacion = (codigo: number): string =>
  MENSAJES_ERROR_UBICACION[codigo] ?? 'No pudimos obtener tu ubicación en este momento.';

export const coordenadasDePosicion = (posicion: GeolocationPosition): Coordenadas => ({
  latitud: posicion.coords.latitude,
  longitud: posicion.coords.longitude,
});
