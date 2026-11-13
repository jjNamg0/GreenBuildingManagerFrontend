import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  DatosCorreo,
  DatosLogin,
  DatosRegistro,
  DatosRestablecer,
  DatosVerificacion,
  RespuestaLogin,
} from '../models/authmodel';
import { Usuario } from '../models/usuariomodel';
import { Sesionservice } from './sesionservice';
import { Usuarioservice } from './usuarioservice';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/auth`;

  constructor(
    private sesionService: Sesionservice,
    private usuarioService: Usuarioservice,
  ) {}

  iniciarSesion(datos: DatosLogin): Observable<Usuario> {
    return this.cliente.post<RespuestaLogin>(`${this.URL_BASE}/login`, datos).pipe(
      tap((respuesta) => this.sesionService.guardar(respuesta)),
      switchMap(() => this.cargarUsuario()),
      catchError((error) => {
        this.sesionService.limpiar();
        return throwError(() => error);
      }),
    );
  }

  registrar(datos: DatosRegistro): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/register`, datos, { responseType: 'text' });
  }

  verificarCodigo(datos: DatosVerificacion): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/verify`, datos, { responseType: 'text' });
  }

  reenviarCodigo(datos: DatosCorreo): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/resendcode`, datos, { responseType: 'text' });
  }

  solicitarRestablecimiento(datos: DatosCorreo): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/forgotpassword`, datos, { responseType: 'text' });
  }

  restablecerPassword(datos: DatosRestablecer): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/resetpassword`, datos, { responseType: 'text' });
  }

  cargarUsuario(): Observable<Usuario> {
    return this.usuarioService
      .obtenerMiUsuario()
      .pipe(tap((usuario) => this.sesionService.usuario.set(usuario)));
  }

  restaurarSesion(): void {
    if (this.sesionService.haySesion()) {
      this.cargarUsuario()
        .pipe(catchError(() => EMPTY))
        .subscribe();
    }
  }

  cerrarSesion(): void {
    if (!this.sesionService.haySesion()) {
      return;
    }
    this.cliente
      .post(`${this.URL_BASE}/logout`, {}, { responseType: 'text' })
      .pipe(catchError(() => EMPTY))
      .subscribe();
    this.sesionService.limpiar();
  }
}
