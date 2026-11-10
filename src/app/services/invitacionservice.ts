import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { UbicacionInvitacion } from '../models/invitacionmodel';
import { Resultado } from '../models/resultadomodel';
import { armarError, armarResultado } from './resultados';

@Injectable({ providedIn: 'root' })
export class Invitacionservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = 'http://localhost:8080/invitaciones';

  pedirUbicacion(token: string): Observable<HttpResponse<UbicacionInvitacion>> {
    return this.cliente.get<UbicacionInvitacion>(`${this.URL_BASE}/ubicacion/${encodeURIComponent(token)}`, {
      observe: 'response',
    });
  }

  obtenerUbicacion(token: string): Observable<Resultado<UbicacionInvitacion>> {
    return this.pedirUbicacion(token).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos abrir la invitación.'))),
    );
  }
}
