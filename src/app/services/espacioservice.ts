import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatosEspacio, Espacio } from '../models/espaciomodel';

@Injectable({
  providedIn: 'root',
})
export class Espacioservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/espacio`;

  obtenerPorConjunto(conjuntoId: number): Observable<Espacio[]> {
    return this.cliente
      .get<Espacio[] | null>(`${this.URL_BASE}/getbyconjunto/${conjuntoId}`)
      .pipe(map((espacios) => espacios ?? []));
  }

  obtenerPorId(id: number): Observable<Espacio> {
    return this.cliente.get<Espacio>(`${this.URL_BASE}/getbyid/${id}`);
  }

  crear(datos: DatosEspacio): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/createjson`, datos, { responseType: 'text' });
  }

  actualizar(id: number, datos: DatosEspacio): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/updatejson`, datos, {
      params: { id },
      responseType: 'text',
    });
  }

  eliminar(id: number): Observable<string> {
    return this.cliente.delete(`${this.URL_BASE}/deletebyid/${id}`, { responseType: 'text' });
  }
}
