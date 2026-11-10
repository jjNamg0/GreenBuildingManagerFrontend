import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';

export type Anillo = [number, number][];

interface ColeccionContornos {
  features: { geometry: { coordinates: Anillo[] } }[];
}

@Injectable({ providedIn: 'root' })
export class Geografiaservice {
  private contornos$: Observable<Anillo[]> | null = null;

  constructor(private http: HttpClient) {}

  obtenerContornos(): Observable<Anillo[]> {
    if (!this.contornos$) {
      this.contornos$ = this.http.get<ColeccionContornos>('assets/data/cundinamarcaBogota.json').pipe(
        map((coleccion) => coleccion.features.map((f) => f.geometry.coordinates[0])),
        catchError(() => of([])),
        shareReplay(1),
      );
    }
    return this.contornos$;
  }
}
