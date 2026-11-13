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

@Injectable({
  providedIn: 'root',
})
export class Reservaservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/reserva`;

  obtenerMias(): Observable<Reserva[]> {
    return this.cliente
      .get<Reserva[] | null>(`${this.URL_BASE}/getmine`)
      .pipe(map((reservas) => reservas ?? []));
  }

  obtenerTodas(estado: EstadoReserva | ''): Observable<Reserva[]> {
    return this.cliente
      .get<Reserva[] | null>(`${this.URL_BASE}/getall`, { params: { estado } })
      .pipe(map((reservas) => reservas ?? []));
  }

  obtenerDisponibilidad(espacioId: number, fecha: string): Observable<FranjaHoraria[]> {
    return this.cliente
      .get<FranjaHoraria[] | null>(`${this.URL_BASE}/getdisponibilidad`, {
        params: { espacioId, fecha },
      })
      .pipe(map((franjas) => franjas ?? []));
  }

  crear(datos: DatosReserva): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/createjson`, datos, { responseType: 'text' });
  }

  cancelar(id: number): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/cancelar/${id}`, null, { responseType: 'text' });
  }

  aprobar(id: number): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/aprobar/${id}`, null, { responseType: 'text' });
  }

  rechazar(id: number, datos: DatosObservacion): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/rechazar/${id}`, datos, { responseType: 'text' });
  }
}
