import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatosEspacio, Espacio } from '../models/espaciomodel';

/** Service de espacios comunes. */
@Injectable({
  providedIn: 'root',
})
export class Espacioservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/espacio`;

  /** Pide los espacios de un conjunto. */
  obtenerPorConjunto(conjuntoId: number): Observable<Espacio[]> {
    return this.cliente
      .get<Espacio[] | null>(`${this.URL_BASE}/getbyconjunto/${conjuntoId}`)
      .pipe(map((espacios) => espacios ?? []));
  }

  /** Pide un espacio por su id. */
  obtenerPorId(id: number): Observable<Espacio> {
    return this.cliente.get<Espacio>(`${this.URL_BASE}/getbyid/${id}`);
  }

  /** Pide al back crear un espacio. */
  crear(datos: DatosEspacio): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/createjson`, datos, { responseType: 'text' });
  }

  /** Pide al back actualizar un espacio. */
  actualizar(id: number, datos: DatosEspacio): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/updatejson`, datos, {
      params: { id },
      responseType: 'text',
    });
  }

  /** Pide al back eliminar un espacio. */
  eliminar(id: number): Observable<string> {
    return this.cliente.delete(`${this.URL_BASE}/deletebyid/${id}`, { responseType: 'text' });
  }
}
