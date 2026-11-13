import { Injectable, signal } from '@angular/core';
import { Observable, Subscriber, throwError } from 'rxjs';
import {
  Coordenadas,
  MENSAJE_SIN_GEOLOCALIZACION,
  coordenadasDePosicion,
  mensajeErrorUbicacion,
} from '../models/ubicacionmodel';

/** Convierte un error de geolocalización en un error del observable. */
const fallarUbicacion = (
  observador: Subscriber<Coordenadas>,
  error: GeolocationPositionError,
): void => observador.error(new Error(mensajeErrorUbicacion(error.code)));

/** Service que obtiene y sigue la ubicación del navegador. */
@Injectable({
  providedIn: 'root',
})
export class Ubicacionservice {
  private readonly OPCIONES: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 30000,
  };

  ultimaUbicacion = signal<Coordenadas | null>(null);

  /** Obtiene la ubicación una sola vez. */
  obtenerUbicacion(): Observable<Coordenadas> {
    if (!('geolocation' in navigator)) {
      return throwError(() => new Error(MENSAJE_SIN_GEOLOCALIZACION));
    }
    return new Observable<Coordenadas>((observador) => {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          observador.next(this.guardar(posicion));
          observador.complete();
        },
        (error) => fallarUbicacion(observador, error),
        this.OPCIONES,
      );
    });
  }

  /** Emite la ubicación cada vez que cambia. */
  seguirUbicacion(): Observable<Coordenadas> {
    if (!('geolocation' in navigator)) {
      return throwError(() => new Error(MENSAJE_SIN_GEOLOCALIZACION));
    }
    return new Observable<Coordenadas>((observador) => {
      const id = navigator.geolocation.watchPosition(
        (posicion) => observador.next(this.guardar(posicion)),
        (error) => fallarUbicacion(observador, error),
        this.OPCIONES,
      );
      return () => navigator.geolocation.clearWatch(id);
    });
  }

  /** Guarda y devuelve las coordenadas de la posición. */
  private guardar(posicion: GeolocationPosition): Coordenadas {
    const coordenadas = coordenadasDePosicion(posicion);
    this.ultimaUbicacion.set(coordenadas);
    return coordenadas;
  }
}
