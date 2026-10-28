import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { MiConjunto } from '../models/miconjuntomodel';
import { Resultado } from '../models/resultadomodel';
import { Usuario } from '../models/usuariomodel';
import { armarError, armarResultado } from './resultados';

@Injectable({ providedIn: 'root' })
export class Residenteservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = 'http://localhost:8080/usuarios';

  pedirPerfil(): Observable<HttpResponse<Usuario>> {
    return this.cliente.get<Usuario>(`${this.URL_BASE}/perfil`, { observe: 'response' });
  }

  pedirMiConjunto(): Observable<HttpResponse<MiConjunto>> {
    return this.cliente.get<MiConjunto>(`${this.URL_BASE}/mi-conjunto`, { observe: 'response' });
  }

  enviarSolicitudConjunto(conjuntoId: number): Observable<HttpResponse<Usuario>> {
    return this.cliente.post<Usuario>(`${this.URL_BASE}/solicitud-conjunto`, { conjuntoId }, { observe: 'response' });
  }

  solicitarConjunto(conjuntoId: number): Observable<Resultado<Usuario>> {
    return this.enviarSolicitudConjunto(conjuntoId).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos enviar tu solicitud.'))),
    );
  }

  obtenerPerfil(): Observable<Resultado<Usuario>> {
    return this.pedirPerfil().pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar tu perfil.'))),
    );
  }

  obtenerMiConjunto(): Observable<Resultado<MiConjunto>> {
    return this.pedirMiConjunto().pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos cargar la información de tu conjunto.')),
      ),
    );
  }
}
