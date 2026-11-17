import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatosChat, RespuestaChat } from '../models/chatmodel';

/** Service del chat de ayuda: envía la pregunta al back, que es quien habla con la IA. */
@Injectable({
  providedIn: 'root',
})
export class Iaservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/ia`;

  /** Envía la pregunta y la conversación anterior, y devuelve la respuesta del asistente. */
  preguntar(datos: DatosChat): Observable<RespuestaChat> {
    return this.cliente.post<RespuestaChat>(`${this.URL_BASE}/preguntar`, datos);
  }
}
