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

/** Service de usuarios: perfil propio y gestión de residentes. */
@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/user`;

  /** Pide el usuario con la sesión iniciada. */
  obtenerMiUsuario(): Observable<Usuario> {
    return this.cliente.get<Usuario>(`${this.URL_BASE}/getme`);
  }

  /** Pide al back actualizar el perfil del usuario. */
  actualizarMiPerfil(datos: DatosPerfil): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/updateme`, datos, { responseType: 'text' });
  }

  /** Pide al back cambiar la contraseña del usuario. */
  cambiarPassword(datos: DatosCambioPassword): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/changepassword`, datos, { responseType: 'text' });
  }

  /** Pide al back guardar los intereses del usuario. */
  actualizarIntereses(datos: DatosIntereses): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/updateintereses`, datos, { responseType: 'text' });
  }

  /** Pide los usuarios con el filtro y la búsqueda. */
  obtenerTodos(filtro: FiltroUsuarios, busqueda: string): Observable<Usuario[]> {
    return this.cliente
      .get<Usuario[] | null>(`${this.URL_BASE}/getall`, { params: { filtro, busqueda } })
      .pipe(map((usuarios) => usuarios ?? []));
  }

  /** Pide al back asignar una unidad a un usuario. */
  asignarUnidad(id: number, unidadId: number): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/asignarunidad`, null, {
      params: { id, unidadId },
      responseType: 'text',
    });
  }

  /** Pide al back activar o desactivar a un usuario. */
  cambiarEstado(id: number, activo: boolean): Observable<string> {
    return this.cliente.put(`${this.URL_BASE}/cambiarestado`, null, {
      params: { id, activo },
      responseType: 'text',
    });
  }

  /** Pide al back eliminar a un usuario. */
  eliminar(id: number): Observable<string> {
    return this.cliente.delete(`${this.URL_BASE}/deletebyid/${id}`, { responseType: 'text' });
  }
}
