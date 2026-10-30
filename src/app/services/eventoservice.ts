import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Evento, NuevoEvento, Recomendaciones, RespuestaInvitacion, VistaPreviaInvitacion } from '../models/eventomodel';
import { Resultado } from '../models/resultadomodel';
import { armarError, armarLista, armarResultado } from './resultados';

@Injectable({ providedIn: 'root' })
export class Eventoservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = 'http://localhost:8080';

  pedirEventos(pasados: boolean): Observable<HttpResponse<Evento[]>> {
    const params = new HttpParams().set('pasados', pasados);
    return this.cliente.get<Evento[]>(`${this.URL_BASE}/eventos`, { params, observe: 'response' });
  }

  pedirRecomendaciones(): Observable<HttpResponse<Recomendaciones>> {
    return this.cliente.get<Recomendaciones>(`${this.URL_BASE}/recomendaciones`, { observe: 'response' });
  }

  pedirEventosAdmin(conjuntoId: number, pasados: boolean): Observable<HttpResponse<Evento[]>> {
    let params = new HttpParams().set('pasados', pasados);
    if (conjuntoId) {
      params = params.set('conjuntoId', conjuntoId);
    }
    return this.cliente.get<Evento[]>(`${this.URL_BASE}/admin/eventos`, { params, observe: 'response' });
  }

  enviarCrear(evento: NuevoEvento): Observable<HttpResponse<Evento>> {
    return this.cliente.post<Evento>(`${this.URL_BASE}/admin/eventos`, evento, { observe: 'response' });
  }

  enviarEditar(id: number, evento: NuevoEvento): Observable<HttpResponse<Evento>> {
    return this.cliente.put<Evento>(`${this.URL_BASE}/admin/eventos/${id}`, evento, { observe: 'response' });
  }

  enviarCancelar(id: number, motivo: string): Observable<HttpResponse<Evento>> {
    return this.cliente.patch<Evento>(`${this.URL_BASE}/admin/eventos/${id}/cancelar`, { motivo }, {
      observe: 'response',
    });
  }

  enviarVistaPrevia(datos: NuevoEvento): Observable<HttpResponse<VistaPreviaInvitacion>> {
    return this.cliente.post<VistaPreviaInvitacion>(
      `${this.URL_BASE}/admin/eventos/invitaciones/vista-previa`,
      datos,
      { observe: 'response' },
    );
  }

  enviarInvitacionEvento(id: number, diseno: string): Observable<HttpResponse<RespuestaInvitacion>> {
    return this.cliente.post<RespuestaInvitacion>(
      `${this.URL_BASE}/admin/eventos/${id}/invitacion`,
      { diseno },
      { observe: 'response' },
    );
  }

  obtenerEventos(pasados: boolean): Observable<Resultado<Evento[]>> {
    return this.pedirEventos(pasados).pipe(
      map((respuesta) => armarLista(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos cargar los eventos de tu conjunto.')),
      ),
    );
  }

  obtenerRecomendaciones(): Observable<Resultado<Recomendaciones>> {
    return this.pedirRecomendaciones().pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos cargar tus recomendaciones.')),
      ),
    );
  }

  obtenerEventosAdmin(conjuntoId: number, pasados: boolean): Observable<Resultado<Evento[]>> {
    return this.pedirEventosAdmin(conjuntoId, pasados).pipe(
      map((respuesta) => armarLista(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar los eventos.'))),
    );
  }

  crear(evento: NuevoEvento): Observable<Resultado<Evento>> {
    return this.enviarCrear(evento).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos guardar el evento.'))),
    );
  }

  editar(id: number, evento: NuevoEvento): Observable<Resultado<Evento>> {
    return this.enviarEditar(id, evento).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos guardar el evento.'))),
    );
  }

  cancelar(id: number, motivo: string): Observable<Resultado<Evento>> {
    return this.enviarCancelar(id, motivo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cancelar el evento.'))),
    );
  }

  vistaPreviaInvitacion(datos: NuevoEvento): Observable<Resultado<VistaPreviaInvitacion>> {
    return this.enviarVistaPrevia(datos).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar la vista previa.'))),
    );
  }

  enviarInvitacion(id: number, diseno: string): Observable<Resultado<RespuestaInvitacion>> {
    return this.enviarInvitacionEvento(id, diseno).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos enviar la invitación.'))),
    );
  }
}
