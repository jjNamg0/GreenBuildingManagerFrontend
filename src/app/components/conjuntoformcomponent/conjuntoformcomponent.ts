import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Cada anillo es una lista de [longitud, latitud]
export type Anillo = [number, number][];

@Injectable({ providedIn: 'root' })
export class Geografiaservice {
  constructor(private http: HttpClient) {}

  obtenerContornos(): Observable<Anillo[]> {
    return this.http.get<any>('assets/geo/cundinamarca.geojson').pipe(
      map((geo: any) => {
        const anillos: Anillo[] = [];

        for (const feature of geo.features ?? []) {
          const g = feature.geometry;

          if (g.type === 'Polygon') {
            anillos.push(g.coordinates[0] as Anillo);
          } else if (g.type === 'MultiPolygon') {
            for (const poligono of g.coordinates) {
              anillos.push(poligono[0] as Anillo);
            }
          }
        }

        return anillos;
      }),
      catchError(() => of([] as Anillo[])),
    );
  }
}
