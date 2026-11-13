import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatosUnidad, Unidad } from '../models/unidadmodel';

/** Service de unidades. */
@Injectable({
  providedIn: 'root',
})
export class Unidadservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/unidad`;

  /** Pide las unidades de un conjunto. */
  obtenerPorConjunto(conjuntoId: number): Observable<Unidad[]> {
    return this.cliente
      .get<Unidad[] | null>(`${this.URL_BASE}/getbyconjunto/${conjuntoId}`)
      .pipe(map((unidades) => unidades ?? []));
  }

  /** Pide al back crear una unidad. */
  crear(datos: DatosUnidad): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/createjson`, datos, { responseType: 'text' });
  }

  /** Pide al back actualizar una unidad. */
  actualizar(id: number, datos: DatosUnidad): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/updatejson`, datos, {
      params: { id },
      responseType: 'text',
    });
  }

  /** Pide al back eliminar una unidad. */
  eliminar(id: number): Observable<string> {
    return this.cliente.delete(`${this.URL_BASE}/deletebyid/${id}`, { responseType: 'text' });
  }
}
