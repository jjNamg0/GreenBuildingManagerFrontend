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

/** Service de autenticación: sesión, registro, verificación y recuperación de contraseña. */
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

  /** Envía las credenciales, guarda la sesión y carga el usuario. */
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

  /** Envía al back el registro de un residente. */
  registrar(datos: DatosRegistro): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/register`, datos, { responseType: 'text' });
  }

  /** Verifica la cuenta con el código del correo. */
  verificarCodigo(datos: DatosVerificacion): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/verify`, datos, { responseType: 'text' });
  }

  /** Pide que se reenvíe el código de verificación. */
  reenviarCodigo(datos: DatosCorreo): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/resendcode`, datos, { responseType: 'text' });
  }

  /** Pide el código para restablecer la contraseña. */
  solicitarRestablecimiento(datos: DatosCorreo): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/forgotpassword`, datos, { responseType: 'text' });
  }

  /** Cambia la contraseña con el código recibido. */
  restablecerPassword(datos: DatosRestablecer): Observable<string> {
    return this.cliente.post(`${this.URL_BASE}/resetpassword`, datos, { responseType: 'text' });
  }

  /** Pide el usuario actual y lo guarda en la sesión. */
  cargarUsuario(): Observable<Usuario> {
    return this.usuarioService
      .obtenerMiUsuario()
      .pipe(tap((usuario) => this.sesionService.usuario.set(usuario)));
  }

  /** Recarga el usuario si hay una sesión guardada. */
  restaurarSesion(): void {
    if (this.sesionService.haySesion()) {
      this.cargarUsuario()
        .pipe(catchError(() => EMPTY))
        .subscribe();
    }
  }

  /** Avisa al back del cierre y borra la sesión. */
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
