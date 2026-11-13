import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  DatosCambioPassword,
  DatosIntereses,
  DatosPerfil,
  FiltroUsuarios,
  Usuario,
} from '../models/usuariomodel';

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/user`;

  obtenerMiUsuario(): Observable<Usuario> {
    return this.cliente.get<Usuario>(`${this.URL_BASE}/getme`);
  }

  actualizarMiPerfil(datos: DatosPerfil): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/updateme`, datos, { responseType: 'text' });
  }

  cambiarPassword(datos: DatosCambioPassword): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/changepassword`, datos, { responseType: 'text' });
  }

  actualizarIntereses(datos: DatosIntereses): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/updateintereses`, datos, { responseType: 'text' });
  }

  obtenerTodos(filtro: FiltroUsuarios, busqueda: string): Observable<Usuario[]> {
    return this.cliente
      .get<Usuario[] | null>(`${this.URL_BASE}/getall`, { params: { filtro, busqueda } })
      .pipe(map((usuarios) => usuarios ?? []));
  }

  asignarUnidad(id: number, unidadId: number): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/asignarunidad`, null, {
      params: { id, unidadId },
      responseType: 'text',
    });
  }

  cambiarEstado(id: number, activo: boolean): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/cambiarestado`, null, {
      params: { id, activo },
      responseType: 'text',
    });
  }

  eliminar(id: number): Observable<string> {
    return this.cliente.delete(`${this.URL_BASE}/deletebyid/${id}`, { responseType: 'text' });
  }
}
