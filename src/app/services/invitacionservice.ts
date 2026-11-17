import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  DatosCorreosInvitacion,
  DestinoInvitacion,
  Invitacion,
  Invitado,
} from '../models/invitacionmodel';

const RUTAS_DESTINO: Record<DestinoInvitacion['tipo'], string> = {
  EVENTO: 'evento',
  RESERVA: 'reserva',
};

/** Service de las invitaciones a eventos y reservas. */
@Injectable({
  providedIn: 'root',
})
export class Invitacionservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/invitacion`;

  /** Pide al back la invitación pública de un enlace. */
  obtenerPorCodigo(codigo: string): Observable<Invitacion> {
    return this.cliente.get<Invitacion>(`${this.URL_BASE}/getbycodigo/${codigo}`);
  }

  /** Pide al back el enlace público de un evento o una reserva. */
  obtenerEnlace(destino: DestinoInvitacion): Observable<string> {
    return this.cliente.get(`${this.URL_BASE}/getenlace${RUTAS_DESTINO[destino.tipo]}/${destino.id}`, {
      responseType: 'text',
    });
  }

  /** Pide al back enviar la invitación a una lista de correos. */
  enviar(destino: DestinoInvitacion, datos: DatosCorreosInvitacion): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/enviar${RUTAS_DESTINO[destino.tipo]}/${destino.id}`, datos, {
      responseType: 'text',
    });
  }

  /** Pide al back los correos ya invitados. */
  obtenerInvitados(destino: DestinoInvitacion): Observable<Invitado[]> {
    return this.cliente
      .get<Invitado[] | null>(`${this.URL_BASE}/getinvitados${RUTAS_DESTINO[destino.tipo]}/${destino.id}`)
      .pipe(map((invitados) => invitados ?? []));
  }
}
