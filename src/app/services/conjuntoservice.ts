import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Conjunto, DatosConjunto } from '../models/conjuntomodel';

/** Service de conjuntos. */
@Injectable({
  providedIn: 'root',
})
export class Conjuntoservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/conjunto`;

  /** Pide los conjuntos con la búsqueda y el tipo. */
  obtenerTodos(busqueda = '', tipo = ''): Observable<Conjunto[]> {
    return this.cliente
      .get<Conjunto[] | null>(`${this.URL_BASE}/getall`, { params: { busqueda, tipo } })
      .pipe(map((conjuntos) => conjuntos ?? []));
  }

  /** Pide un conjunto por su id. */
  obtenerPorId(id: number): Observable<Conjunto> {
    return this.cliente.get<Conjunto>(`${this.URL_BASE}/getbyid/${id}`);
  }

  /** Pide al back crear un conjunto. */
  crear(datos: DatosConjunto): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/createjson`, datos, { responseType: 'text' });
  }

  /** Pide al back actualizar un conjunto. */
  actualizar(id: number, datos: DatosConjunto): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/updatejson`, datos, {
      params: { id },
      responseType: 'text',
    });
  }

  /** Pide al back eliminar un conjunto. */
  eliminar(id: number): Observable<string> {
    return this.cliente.delete(`${this.URL_BASE}/deletebyid/${id}`, { responseType: 'text' });
  }
}
