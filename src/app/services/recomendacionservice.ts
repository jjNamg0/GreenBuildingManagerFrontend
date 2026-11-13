import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  RecomendacionConjunto,
  RecomendacionEspacio,
  RecomendacionEvento,
} from '../models/recomendacionmodel';
import { Coordenadas } from '../models/ubicacionmodel';

@Injectable({
  providedIn: 'root',
})
export class Recomendacionservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/recomendacion`;

  obtenerEventos(): Observable<RecomendacionEvento[]> {
    return this.cliente
      .get<RecomendacionEvento[] | null>(`${this.URL_BASE}/geteventos`)
      .pipe(map((recomendaciones) => recomendaciones ?? []));
  }

  obtenerEspacios(): Observable<RecomendacionEspacio[]> {
    return this.cliente
      .get<RecomendacionEspacio[] | null>(`${this.URL_BASE}/getespacios`)
      .pipe(map((recomendaciones) => recomendaciones ?? []));
  }

  obtenerConjuntosCercanos(coordenadas: Coordenadas): Observable<RecomendacionConjunto[]> {
    return this.cliente
      .get<RecomendacionConjunto[] | null>(`${this.URL_BASE}/getconjuntoscercanos`, {
        params: { latitud: coordenadas.latitud, longitud: coordenadas.longitud },
      })
      .pipe(map((recomendaciones) => recomendaciones ?? []));
  }
}
