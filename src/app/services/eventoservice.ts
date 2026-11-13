import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatosCancelacion, DatosEvento, Evento, FiltrosEvento } from '../models/eventomodel';

@Injectable({
  providedIn: 'root',
})
export class Eventoservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/evento`;

  obtenerPorConjunto(conjuntoId: number, filtros: FiltrosEvento): Observable<Evento[]> {
    return this.cliente
      .get<Evento[] | null>(`${this.URL_BASE}/getbyconjunto/${conjuntoId}`, {
        params: { tipo: filtros.tipo, paraNinos: filtros.paraNinos },
      })
      .pipe(map((eventos) => eventos ?? []));
  }

  obtenerTodos(conjuntoId: number | null): Observable<Evento[]> {
    return this.cliente
      .get<Evento[] | null>(`${this.URL_BASE}/getall`, {
        params: conjuntoId ? { conjuntoId } : {},
      })
      .pipe(map((eventos) => eventos ?? []));
  }

  crear(datos: DatosEvento): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/createjson`, datos, { responseType: 'text' });
  }

  actualizar(id: number, datos: DatosEvento): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/updatejson`, datos, {
      params: { id },
      responseType: 'text',
    });
  }

  cancelar(id: number, datos: DatosCancelacion): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/cancelar/${id}`, datos, { responseType: 'text' });
  }

  eliminar(id: number): Observable<string> {
    return this.cliente.delete(`${this.URL_BASE}/deletebyid/${id}`, { responseType: 'text' });
  }

  asistir(id: number): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/asistir/${id}`, null, { responseType: 'text' });
  }

  noAsistir(id: number): Observable<string> {
    return this.cliente.delete(`${this.URL_BASE}/noasistir/${id}`, { responseType: 'text' });
  }

  enviarInvitacion(id: number): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/enviarinvitacion/${id}`, null, {
      responseType: 'text',
    });
  }

  obtenerVistaPrevia(datos: DatosEvento): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/vistaprevia`, datos, { responseType: 'text' });
  }
}
