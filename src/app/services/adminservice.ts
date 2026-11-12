import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario } from '../models/usuariomodel';
import { FiltrosAuditoria, PaginaAuditoria } from '../models/auditoriamodel';
import { Resultado } from '../models/resultadomodel';
import { armarError, armarLista, armarResultado } from './resultados';

@Injectable({ providedIn: 'root' })
export class Adminservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = 'http://localhost:8080/admin';

  pedirUsuarios(): Observable<HttpResponse<Usuario[]>> {
    return this.cliente.get<Usuario[]>(`${this.URL_BASE}/usuarios`, { observe: 'response' });
  }

  enviarEstadoUsuario(id: number, activo: boolean): Observable<HttpResponse<Usuario>> {
    return this.cliente.patch<Usuario>(`${this.URL_BASE}/usuarios/${id}/estado`, { activo }, { observe: 'response' });
  }

  enviarUnidadUsuario(id: number, unidadId: number | null): Observable<HttpResponse<Usuario>> {
    return this.cliente.patch<Usuario>(`${this.URL_BASE}/usuarios/${id}/unidad`, { unidadId }, { observe: 'response' });
  }

  enviarRechazoSolicitud(id: number, motivo: string): Observable<HttpResponse<Usuario>> {
    return this.cliente.patch<Usuario>(
      `${this.URL_BASE}/usuarios/${id}/solicitud/rechazar`,
      { motivo },
      { observe: 'response' },
    );
  }

  pedirAuditoria(pagina: number, tamano: number, filtros: FiltrosAuditoria): Observable<HttpResponse<PaginaAuditoria>> {
    let params = new HttpParams().set('pagina', pagina).set('tamano', tamano);
    if (filtros.accion) {
      params = params.set('accion', filtros.accion);
    }
    if (filtros.email.trim()) {
      params = params.set('email', filtros.email.trim());
    }
    if (filtros.exitoso) {
      params = params.set('exitoso', filtros.exitoso);
    }
    if (filtros.desde) {
      params = params.set('desde', `${filtros.desde}:00`);
    }
    if (filtros.hasta) {
      params = params.set('hasta', `${filtros.hasta}:59`);
    }
    return this.cliente.get<PaginaAuditoria>(`${this.URL_BASE}/auditoria`, { params, observe: 'response' });
  }

  pedirAccionesAuditoria(): Observable<HttpResponse<string[]>> {
    return this.cliente.get<string[]>(`${this.URL_BASE}/auditoria/acciones`, { observe: 'response' });
  }

  obtenerUsuarios(): Observable<Resultado<Usuario[]>> {
    return this.pedirUsuarios().pipe(
      map((respuesta) => armarLista(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar los usuarios.'))),
    );
  }

  cambiarEstadoUsuario(id: number, activo: boolean): Observable<Resultado<Usuario>> {
    return this.enviarEstadoUsuario(id, activo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos cambiar el estado del usuario.')),
      ),
    );
  }

  asignarUnidad(id: number, unidadId: number | null): Observable<Resultado<Usuario>> {
    return this.enviarUnidadUsuario(id, unidadId).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos guardar la asignación.'))),
    );
  }

  rechazarSolicitudConjunto(id: number, motivo: string): Observable<Resultado<Usuario>> {
    return this.enviarRechazoSolicitud(id, motivo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos rechazar la solicitud.'))),
    );
  }

  obtenerAuditoria(pagina: number, tamano: number, filtros: FiltrosAuditoria): Observable<Resultado<PaginaAuditoria>> {
    return this.pedirAuditoria(pagina, tamano, filtros).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar la auditoría.'))),
    );
  }

  obtenerAccionesAuditoria(): Observable<Resultado<string[]>> {
    return this.pedirAccionesAuditoria().pipe(
      map((respuesta) => armarLista(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos cargar las acciones de la auditoría.')),
      ),
    );
  }
}
