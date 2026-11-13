import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatosCancelacion, DatosEvento, Evento, FiltrosEvento } from '../models/eventomodel';

/** Service de eventos, asistencia e invitaciones. */
@Injectable({
  providedIn: 'root',
})
export class Eventoservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/evento`;

  /** Pide los eventos de un conjunto con los filtros. */
  obtenerPorConjunto(conjuntoId: number, filtros: FiltrosEvento): Observable<Evento[]> {
    return this.cliente
      .get<Evento[] | null>(`${this.URL_BASE}/getbyconjunto/${conjuntoId}`, {
        params: { tipo: filtros.tipo, paraNinos: filtros.paraNinos },
      })
      .pipe(map((eventos) => eventos ?? []));
  }

  /** Pide todos los eventos o los de un conjunto. */
  obtenerTodos(conjuntoId: number | null): Observable<Evento[]> {
    return this.cliente
      .get<Evento[] | null>(`${this.URL_BASE}/getall`, {
        params: conjuntoId ? { conjuntoId } : {},
      })
      .pipe(map((eventos) => eventos ?? []));
  }

  /** Pide al back crear un evento. */
  crear(datos: DatosEvento): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/createjson`, datos, { responseType: 'text' });
  }

  /** Pide al back actualizar un evento. */
  actualizar(id: number, datos: DatosEvento): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/updatejson`, datos, {
      params: { id },
      responseType: 'text',
    });
  }

  /** Pide al back cancelar un evento con su motivo. */
  cancelar(id: number, datos: DatosCancelacion): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/cancelar/${id}`, datos, { responseType: 'text' });
  }

  /** Pide al back eliminar un evento. */
  eliminar(id: number): Observable<string> {
    return this.cliente.delete(`${this.URL_BASE}/deletebyid/${id}`, { responseType: 'text' });
  }

  /** Inscribe al residente en un evento. */
  asistir(id: number): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/asistir/${id}`, null, { responseType: 'text' });
  }

  /** Cancela la asistencia del residente a un evento. */
  noAsistir(id: number): Observable<string> {
    return this.cliente.delete(`${this.URL_BASE}/noasistir/${id}`, { responseType: 'text' });
  }

  /** Pide al back enviar por correo la invitación del evento. */
  enviarInvitacion(id: number): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/enviarinvitacion/${id}`, null, {
      responseType: 'text',
    });
  }

  /** Pide el HTML de la invitación de un evento. */
  obtenerVistaPrevia(datos: DatosEvento): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/vistaprevia`, datos, { responseType: 'text' });
  }
}
