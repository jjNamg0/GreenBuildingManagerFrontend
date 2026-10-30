import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import {
  ConsultaDisponibilidad,
  Disponibilidad,
  FiltrosReservas,
  NuevaReserva,
  PaginaReservas,
  Reserva,
} from '../models/reservamodel';
import { Resultado } from '../models/resultadomodel';
import { armarError, armarLista, armarResultado } from './resultados';

@Injectable({ providedIn: 'root' })
export class Reservaservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = 'http://localhost:8080/reservas';
  private readonly URL_ADMIN: string = 'http://localhost:8080/admin/reservas';

  pedirMisReservas(): Observable<HttpResponse<Reserva[]>> {
    return this.cliente.get<Reserva[]>(`${this.URL_BASE}/mias`, { observe: 'response' });
  }

  pedirDisponibilidad(
    espacioId: number,
    fecha: string,
    consulta: ConsultaDisponibilidad | null,
  ): Observable<HttpResponse<Disponibilidad>> {
    let params = new HttpParams().set('espacioId', espacioId).set('fecha', fecha);
    if (consulta) {
      params = params
        .set('horaInicio', consulta.horaInicio)
        .set('duracion', consulta.duracion)
        .set('personas', consulta.personas);
    }
    return this.cliente.get<Disponibilidad>(`${this.URL_BASE}/disponibilidad`, { params, observe: 'response' });
  }

  enviarCrear(reserva: NuevaReserva): Observable<HttpResponse<Reserva>> {
    return this.cliente.post<Reserva>(this.URL_BASE, reserva, { observe: 'response' });
  }

  enviarCancelar(id: number): Observable<HttpResponse<Reserva>> {
    return this.cliente.patch<Reserva>(`${this.URL_BASE}/${id}/cancelar`, {}, { observe: 'response' });
  }

  pedirReservasAdmin(pagina: number, tamano: number, filtros: FiltrosReservas): Observable<HttpResponse<PaginaReservas>> {
    let params = new HttpParams().set('pagina', pagina).set('tamano', tamano);
    if (filtros.conjuntoId) {
      params = params.set('conjuntoId', filtros.conjuntoId);
    }
    if (filtros.estado) {
      params = params.set('estado', filtros.estado);
    }
    if (filtros.desde) {
      params = params.set('desde', filtros.desde);
    }
    if (filtros.hasta) {
      params = params.set('hasta', filtros.hasta);
    }
    return this.cliente.get<PaginaReservas>(this.URL_ADMIN, { params, observe: 'response' });
  }

  enviarAprobar(id: number): Observable<HttpResponse<Reserva>> {
    return this.cliente.patch<Reserva>(`${this.URL_ADMIN}/${id}/aprobar`, {}, { observe: 'response' });
  }

  enviarRechazar(id: number, motivo: string): Observable<HttpResponse<Reserva>> {
    return this.cliente.patch<Reserva>(`${this.URL_ADMIN}/${id}/rechazar`, { motivo }, { observe: 'response' });
  }

  enviarCancelarAdmin(id: number, motivo: string): Observable<HttpResponse<Reserva>> {
    return this.cliente.patch<Reserva>(`${this.URL_ADMIN}/${id}/cancelar`, { motivo }, { observe: 'response' });
  }

  obtenerMisReservas(): Observable<Resultado<Reserva[]>> {
    return this.pedirMisReservas().pipe(
      map((respuesta) => armarLista(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar tus reservas.'))),
    );
  }

  obtenerDisponibilidad(
    espacioId: number,
    fecha: string,
    consulta: ConsultaDisponibilidad | null,
  ): Observable<Resultado<Disponibilidad>> {
    return this.pedirDisponibilidad(espacioId, fecha, consulta).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos cargar la disponibilidad del día.')),
      ),
    );
  }

  crear(reserva: NuevaReserva): Observable<Resultado<Reserva>> {
    return this.enviarCrear(reserva).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos crear la reserva.'))),
    );
  }

  cancelar(id: number): Observable<Resultado<Reserva>> {
    return this.enviarCancelar(id).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cancelar la reserva.'))),
    );
  }

  buscarComoAdmin(pagina: number, tamano: number, filtros: FiltrosReservas): Observable<Resultado<PaginaReservas>> {
    return this.pedirReservasAdmin(pagina, tamano, filtros).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar las reservas.'))),
    );
  }

  aprobar(id: number): Observable<Resultado<Reserva>> {
    return this.enviarAprobar(id).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos actualizar la reserva.'))),
    );
  }

  rechazar(id: number, motivo: string): Observable<Resultado<Reserva>> {
    return this.enviarRechazar(id, motivo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos actualizar la reserva.'))),
    );
  }

  cancelarComoAdmin(id: number, motivo: string): Observable<Resultado<Reserva>> {
    return this.enviarCancelarAdmin(id, motivo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos actualizar la reserva.'))),
    );
  }
}
