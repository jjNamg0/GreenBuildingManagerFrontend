import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordenadas } from '../models/rutamodel';

@Injectable({ providedIn: 'root' })
export class Ubicacionservice {
  constructor(private zona: NgZone) {}

  get disponible(): boolean {
    return 'geolocation' in navigator;
  }

  obtenerUbicacion(): Observable<Coordenadas> {
    return new Observable<Coordenadas>((observador) => {
      if (!this.disponible) {
        observador.error('Tu navegador no permite obtener la ubicación.');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (posicion) =>
          this.zona.run(() => {
            observador.next({ latitud: posicion.coords.latitude, longitud: posicion.coords.longitude });
            observador.complete();
          }),
        (error) => this.zona.run(() => observador.error(this.describirError(error))),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 },
      );
    });
  }

  seguirUbicacion(alMoverse: (coordenadas: Coordenadas) => void, alFallar: (mensaje: string) => void): number | null {
    if (!this.disponible) {
      alFallar('Tu navegador no permite obtener la ubicación.');
      return null;
    }
    return navigator.geolocation.watchPosition(
      (posicion) =>
        this.zona.run(() =>
          alMoverse({ latitud: posicion.coords.latitude, longitud: posicion.coords.longitude }),
        ),
      (error) => this.zona.run(() => alFallar(this.describirError(error))),
      { enableHighAccuracy: true, maximumAge: 5000 },
    );
  }

  dejarDeSeguir(id: number | null): void {
    if (id !== null) {
      navigator.geolocation.clearWatch(id);
    }
  }

  private describirError(error: GeolocationPositionError): string {
    if (error.code === error.PERMISSION_DENIED) {
      return 'No diste permiso para usar tu ubicación. Actívalo en el navegador para ver la ruta desde donde estás.';
    }
    if (error.code === error.TIMEOUT) {
      return 'Se demoró mucho obtener tu ubicación. Intenta de nuevo.';
    }
    return 'No pudimos obtener tu ubicación en este momento.';
  }
}
