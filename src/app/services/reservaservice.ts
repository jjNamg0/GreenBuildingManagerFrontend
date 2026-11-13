import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  DatosObservacion,
  DatosReserva,
  EstadoReserva,
  FranjaHoraria,
  Reserva,
} from '../models/reservamodel';

/** Service de reservas de espacios. */
@Injectable({
  providedIn: 'root',
})
export class Reservaservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/reserva`;

  /** Pide las reservas del residente. */
  obtenerMias(): Observable<Reserva[]> {
    return this.cliente
      .get<Reserva[] | null>(`${this.URL_BASE}/getmine`)
      .pipe(map((reservas) => reservas ?? []));
  }

  /** Pide las reservas de todos los conjuntos, filtradas por estado. */
  obtenerTodas(estado: EstadoReserva | ''): Observable<Reserva[]> {
    return this.cliente
      .get<Reserva[] | null>(`${this.URL_BASE}/getall`, { params: { estado } })
      .pipe(map((reservas) => reservas ?? []));
  }

  /** Pide las franjas de un espacio en una fecha. */
  obtenerDisponibilidad(espacioId: number, fecha: string): Observable<FranjaHoraria[]> {
    return this.cliente
      .get<FranjaHoraria[] | null>(`${this.URL_BASE}/getdisponibilidad`, {
        params: { espacioId, fecha },
      })
      .pipe(map((franjas) => franjas ?? []));
  }

  /** Pide al back crear una reserva. */
  crear(datos: DatosReserva): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/createjson`, datos, { responseType: 'text' });
  }

  /** Pide al back cancelar una reserva. */
  cancelar(id: number): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/cancelar/${id}`, null, { responseType: 'text' });
  }

  /** Pide al back aprobar una reserva. */
  aprobar(id: number): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/aprobar/${id}`, null, { responseType: 'text' });
  }

  /** Pide al back rechazar una reserva con su observación. */
  rechazar(id: number, datos: DatosObservacion): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/rechazar/${id}`, datos, { responseType: 'text' });
  }
}
