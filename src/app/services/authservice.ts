import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Toastservice } from './toastservice';
import { Usuario } from '../models/usuariomodel';
import {
  RespuestaLogin,
  RespuestaMensaje,
  RespuestaRefresco,
  RespuestaSesion,
  SolicitudAdmin,
} from '../models/sesionmodel';
import { Resultado } from '../models/resultadomodel';
import { Residenteservice } from './residenteservice';
import { armarError, armarResultado } from './resultados';

@Injectable({ providedIn: 'root' })
export class Authservice {
  private cliente: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private toastService: Toastservice = inject(Toastservice);
  private residenteService: Residenteservice = inject(Residenteservice);
  private readonly URL_BASE: string = 'http://localhost:8080/auth';
  private readonly URL_GOOGLE: string = 'http://localhost:8080/oauth2/authorization/google';
  private readonly CLAVE_SESION: string = 'greenbuilding-sesion';
  private _usuario: Usuario | null = null;
  private _token: string | null = null;
  private _refreshToken: string | null = null;

  constructor() {
    this.cargarSesion();
  }

  get usuario(): Usuario | null {
    return this._usuario;
  }

  get token(): string | null {
    return this._token;
  }

  get isLoggedIn(): boolean {
    return this._token !== null;
  }

  get isAdmin(): boolean {
    return this._usuario?.rol === 'ADMIN';
  }

  enviarLogin(email: string, password: string): Observable<HttpResponse<RespuestaLogin>> {
    return this.cliente.post<RespuestaLogin>(`${this.URL_BASE}/login`, { email, password }, { observe: 'response' });
  }

  enviarRegistro(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    conjuntoId: number,
  ): Observable<HttpResponse<RespuestaMensaje>> {
    return this.cliente.post<RespuestaMensaje>(
      `${this.URL_BASE}/registro`,
      { nombre, apellido, email, password, conjuntoId },
      { observe: 'response' },
    );
  }

  enviarVerificarCuenta(email: string, codigo: string): Observable<HttpResponse<RespuestaSesion>> {
    return this.cliente.post<RespuestaSesion>(
      `${this.URL_BASE}/verificar-cuenta`,
      { email, codigo },
      { observe: 'response' },
    );
  }

  enviarVerificarLogin(email: string, codigo: string): Observable<HttpResponse<RespuestaSesion>> {
    return this.cliente.post<RespuestaSesion>(
      `${this.URL_BASE}/verificar-login`,
      { email, codigo },
      { observe: 'response' },
    );
  }

  enviarReenviarCodigo(email: string, tipo: string): Observable<HttpResponse<RespuestaMensaje>> {
    return this.cliente.post<RespuestaMensaje>(
      `${this.URL_BASE}/reenviar-codigo`,
      { email, tipo },
      { observe: 'response' },
    );
  }

  enviarOlvideContrasena(email: string): Observable<HttpResponse<RespuestaMensaje>> {
    return this.cliente.post<RespuestaMensaje>(
      `${this.URL_BASE}/olvide-contrasena`,
      { email },
      { observe: 'response' },
    );
  }

  enviarRestablecerContrasena(
    email: string,
    codigo: string,
    password: string,
  ): Observable<HttpResponse<RespuestaMensaje>> {
    return this.cliente.post<RespuestaMensaje>(
      `${this.URL_BASE}/restablecer-contrasena`,
      { email, codigo, password },
      { observe: 'response' },
    );
  }

  enviarSolicitarAdmin(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
  ): Observable<HttpResponse<RespuestaMensaje>> {
    return this.cliente.post<RespuestaMensaje>(
      `${this.URL_BASE}/solicitar-admin`,
      { nombre, apellido, email, password },
      { observe: 'response' },
    );
  }

  pedirSolicitud(token: string): Observable<HttpResponse<SolicitudAdmin>> {
    return this.cliente.get<SolicitudAdmin>(`${this.URL_BASE}/solicitudes-admin/${encodeURIComponent(token)}`, {
      observe: 'response',
    });
  }

  enviarAprobarSolicitud(token: string): Observable<HttpResponse<RespuestaMensaje>> {
    return this.cliente.post<RespuestaMensaje>(
      `${this.URL_BASE}/solicitudes-admin/${encodeURIComponent(token)}/aprobar`,
      {},
      { observe: 'response' },
    );
  }

  enviarRechazarSolicitud(token: string): Observable<HttpResponse<RespuestaMensaje>> {
    return this.cliente.post<RespuestaMensaje>(
      `${this.URL_BASE}/solicitudes-admin/${encodeURIComponent(token)}/rechazar`,
      {},
      { observe: 'response' },
    );
  }

  enviarRefresco(refreshToken: string): Observable<HttpResponse<RespuestaRefresco>> {
    return this.cliente.post<RespuestaRefresco>(`${this.URL_BASE}/refresh`, { refreshToken }, { observe: 'response' });
  }

  enviarLogout(): Observable<HttpResponse<unknown>> {
    return this.cliente.post(`${this.URL_BASE}/logout`, {}, { observe: 'response' });
  }

  login(email: string, password: string): Observable<Resultado<RespuestaLogin>> {
    return this.enviarLogin(email, password).pipe(
      map((respuesta) => armarResultado(respuesta)),
      tap((resultado) => this.guardarSiHayCredenciales(resultado)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos iniciar sesión. Intenta de nuevo.')),
      ),
    );
  }

  registro(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    conjuntoId: number,
  ): Observable<Resultado<RespuestaMensaje>> {
    return this.enviarRegistro(nombre, apellido, email, password, conjuntoId).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos crear la cuenta. Intenta de nuevo.')),
      ),
    );
  }

  verificarCuenta(email: string, codigo: string): Observable<Resultado<RespuestaSesion>> {
    return this.enviarVerificarCuenta(email, codigo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      tap((resultado) => this.guardarSiHayCredenciales(resultado)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos verificar el código.'))),
    );
  }

  verificarLogin(email: string, codigo: string): Observable<Resultado<RespuestaSesion>> {
    return this.enviarVerificarLogin(email, codigo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      tap((resultado) => this.guardarSiHayCredenciales(resultado)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos verificar el código.'))),
    );
  }

  reenviarCodigo(email: string, tipo: string): Observable<Resultado<RespuestaMensaje>> {
    return this.enviarReenviarCodigo(email, tipo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos reenviar el código.'))),
    );
  }

  olvideContrasena(email: string): Observable<Resultado<RespuestaMensaje>> {
    return this.enviarOlvideContrasena(email).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos enviar el código. Intenta de nuevo.')),
      ),
    );
  }

  restablecerContrasena(email: string, codigo: string, password: string): Observable<Resultado<RespuestaMensaje>> {
    return this.enviarRestablecerContrasena(email, codigo, password).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cambiar la contraseña.'))),
    );
  }

  solicitarAdmin(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
  ): Observable<Resultado<RespuestaMensaje>> {
    return this.enviarSolicitarAdmin(nombre, apellido, email, password).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos enviar la solicitud. Intenta de nuevo.')),
      ),
    );
  }

  obtenerSolicitud(token: string): Observable<Resultado<SolicitudAdmin>> {
    return this.pedirSolicitud(token).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar la solicitud.'))),
    );
  }

  aprobarSolicitud(token: string): Observable<Resultado<RespuestaMensaje>> {
    return this.enviarAprobarSolicitud(token).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos procesar la solicitud.'))),
    );
  }

  rechazarSolicitud(token: string): Observable<Resultado<RespuestaMensaje>> {
    return this.enviarRechazarSolicitud(token).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos procesar la solicitud.'))),
    );
  }

  refrescar(): Observable<string | null> {
    if (!this._refreshToken) {
      return of(null);
    }
    return this.enviarRefresco(this._refreshToken).pipe(
      map((respuesta) => {
        const datos = respuesta.body;
        if (!datos) {
          return null;
        }
        this._token = datos.token;
        this._refreshToken = datos.refreshToken;
        this.persistir();
        return datos.token;
      }),
      catchError(() => of(null)),
    );
  }

  actualizarUsuario(usuario: Usuario): void {
    this._usuario = usuario;
    this.persistir();
  }

  loginConGoogle(): void {
    window.location.href = this.URL_GOOGLE;
  }

  procesarCallbackGoogle(token: string, refreshToken: string): Observable<Resultado<Usuario>> {
    this._token = token;
    this._refreshToken = refreshToken;
    return this.residenteService.obtenerPerfil().pipe(
      tap((resultado) => {
        if (resultado.exito) {
          this._usuario = resultado.datos;
          this.persistir();
        }
      }),
    );
  }

  cerrarSesionExpirada(): void {
    this.limpiarSesion();
    this.toastService.mostrar('Tu sesión expiró. Inicia sesión de nuevo.');
    this.router.navigate(['/login']);
  }

  descartarSesion(): void {
    this.limpiarSesion();
  }

  logout(): void {
    if (this._token) {
      this.enviarLogout().subscribe({ error: () => {} });
    }
    this.limpiarSesion();
    this.router.navigate(['/']);
  }

  destinoSeguro(volverA: string | null): string {
    const esRutaInterna = !!volverA && volverA.startsWith('/') && !volverA.startsWith('//');
    if (volverA && esRutaInterna && (this.isAdmin || !volverA.startsWith('/admin'))) {
      return volverA;
    }
    return this.isAdmin ? '/admin/conjuntos' : '/mi-conjunto';
  }

  private guardarSiHayCredenciales(resultado: Resultado<RespuestaLogin>): void {
    if (!resultado.exito) {
      return;
    }
    const { token, refreshToken, usuario } = resultado.datos;
    if (token && refreshToken && usuario) {
      this.guardarSesion({ token, refreshToken, usuario });
    }
  }

  private guardarSesion(res: RespuestaSesion): void {
    this._token = res.token;
    this._refreshToken = res.refreshToken;
    this._usuario = res.usuario;
    this.persistir();
  }

  private limpiarSesion(): void {
    this._token = null;
    this._refreshToken = null;
    this._usuario = null;
    try {
      localStorage.removeItem(this.CLAVE_SESION);
    } catch {
      return;
    }
  }

  private persistir(): void {
    try {
      localStorage.setItem(
        this.CLAVE_SESION,
        JSON.stringify({ token: this._token, refreshToken: this._refreshToken, usuario: this._usuario }),
      );
    } catch {
      return;
    }
  }

  private cargarSesion(): void {
    try {
      const guardada = localStorage.getItem(this.CLAVE_SESION);
      if (!guardada) {
        return;
      }
      const datos = JSON.parse(guardada) as Partial<RespuestaSesion>;
      if (datos.token && datos.refreshToken && datos.usuario) {
        this._token = datos.token;
        this._refreshToken = datos.refreshToken;
        this._usuario = datos.usuario;
      }
    } catch {
      this.limpiarSesion();
    }
  }
}
