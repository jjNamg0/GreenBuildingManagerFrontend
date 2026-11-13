import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { Anillo, ContornoGeografico } from '../models/geografiamodel';

/** Service que carga el contorno de Cundinamarca. */
@Injectable({
  providedIn: 'root',
})
export class Geografiaservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_CONTORNO: string = 'assets/data/cundinamarcaBogota.json';

  private contornos$: Observable<Anillo[]> = this.cliente
    .get<ContornoGeografico>(this.URL_CONTORNO)
    .pipe(
      map((contorno) =>
        contorno.features.flatMap((feature) =>
          feature.geometry.type === 'Polygon'
            ? [(feature.geometry.coordinates as Anillo[])[0]]
            : (feature.geometry.coordinates as Anillo[][]).map((poligono) => poligono[0]),
        ),
      ),
      catchError(() => of([] as Anillo[])),
      shareReplay(1),
    );

  /** Lee el archivo de contornos y devuelve los anillos del polígono. */
  obtenerContornos(): Observable<Anillo[]> {
    return this.contornos$;
  }
}
