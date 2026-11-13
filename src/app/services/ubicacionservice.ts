import { Injectable, signal } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import {
  Coordenadas,
  MENSAJE_SIN_GEOLOCALIZACION,
  coordenadasDePosicion,
  mensajeErrorUbicacion,
} from '../models/ubicacionmodel';

const fallarUbicacion = (
  observador: Subscriber<Coordenadas>,
  error: GeolocationPositionError,
): void => observador.error(new Error(mensajeErrorUbicacion(error.code)));

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

  obtenerUbicacion(): Observable<Coordenadas> {
    return new Observable<Coordenadas>((observador) => {
      if (!('geolocation' in navigator)) {
        observador.error(new Error(MENSAJE_SIN_GEOLOCALIZACION));
        return;
      }
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

  seguirUbicacion(): Observable<Coordenadas> {
    return new Observable<Coordenadas>((observador) => {
      if (!('geolocation' in navigator)) {
        observador.error(new Error(MENSAJE_SIN_GEOLOCALIZACION));
        return;
      }
      const id = navigator.geolocation.watchPosition(
        (posicion) => observador.next(this.guardar(posicion)),
        (error) => fallarUbicacion(observador, error),
        this.OPCIONES,
      );
      return () => navigator.geolocation.clearWatch(id);
    });
  }

  private guardar(posicion: GeolocationPosition): Coordenadas {
    const coordenadas = coordenadasDePosicion(posicion);
    this.ultimaUbicacion.set(coordenadas);
    return coordenadas;
  }
}
