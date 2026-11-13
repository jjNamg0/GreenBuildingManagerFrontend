import { Component, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { DatosLogin, REGLAS_LOGIN } from '../../models/authmodel';
import { claseSpinner } from '../../models/opcionmodel';
import { Usuario } from '../../models/usuariomodel';
import { primerError } from '../../models/validacionmodel';
import { Authservice } from '../../services/authservice';
import { Errorservice } from '../../services/errorservice';
import { Sesionservice } from '../../services/sesionservice';
import { Toastservice } from '../../services/toastservice';
import { Ubicacionservice } from '../../services/ubicacionservice';

const CUENTA_SIN_VERIFICAR = 403;

/** Pantalla de inicio de sesión. */
@Component({
  selector: 'app-logincomponent',
  standalone: false,
  styleUrl: './logincomponent.css',
  templateUrl: './logincomponent.html',
})
export class Logincomponent implements OnInit {
  readonly claseSpinner = claseSpinner;

  correo = '';
  password = '';
  verPassword = false;
  error = signal('');
  cargando = signal(false);

  constructor(
    private authService: Authservice,
    private sesionService: Sesionservice,
    private ubicacionService: Ubicacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  /** Lee el correo de la URL y pide la ubicación sin mostrar errores. */
  ngOnInit(): void {
    this.correo = this.route.snapshot.queryParamMap.get('correo') ?? '';
    this.ubicacionService
      .obtenerUbicacion()
      .pipe(catchError(() => EMPTY))
      .subscribe();
  }

  get sesionExpirada(): boolean {
    return this.route.snapshot.queryParamMap.has('expirada');
  }

  get avisoAcceso(): string {
    if (this.sesionExpirada) {
      return 'Tu sesión expiró. Vuelve a ingresar.';
    }
    return this.route.snapshot.queryParamMap.has('volverA')
      ? 'Inicia sesión para continuar a esa página.'
      : '';
  }

  get tipoAviso(): string {
    return this.sesionExpirada ? 'pendiente' : 'info';
  }

  get iconoAviso(): string {
    return this.sesionExpirada ? 'fa-clock' : 'fa-lock';
  }

  get iconoPassword(): string {
    return this.verPassword ? 'fa-eye-slash' : 'fa-eye';
  }

  get tipoCampoPassword(): string {
    return this.verPassword ? 'text' : 'password';
  }

  /** Borra el mensaje de error del formulario. */
  limpiarError(): void {
    this.error.set('');
  }

  /** Valida el formulario y envía las credenciales al back. */
  iniciarSesion(): void {
    const datos: DatosLogin = { username: this.correo.trim(), password: this.password };
    const problema = primerError(REGLAS_LOGIN, datos);
    if (problema) {
      this.error.set(problema);
      return;
    }
    this.error.set('');
    this.cargando.set(true);
    this.authService.iniciarSesion(datos).subscribe({
      next: (usuario) => this.terminarLogin(usuario),
      error: (error: unknown) => this.fallarLogin(error),
    });
  }

  /** Muestra el saludo y navega al destino seguro. */
  private terminarLogin(usuario: Usuario): void {
    this.cargando.set(false);
    this.toastService.mostrar(`¡Hola, ${usuario.nombre}! Ingresaste correctamente.`);
    const volverA = this.route.snapshot.queryParamMap.get('volverA');
    this.router.navigateByUrl(this.sesionService.destinoSeguro(volverA));
  }

  /** Muestra el error o lleva a verificar la cuenta si aún no está verificada. */
  private fallarLogin(error: unknown): void {
    this.cargando.set(false);
    if (error instanceof HttpErrorResponse && error.status === CUENTA_SIN_VERIFICAR) {
      this.irAVerificar();
      return;
    }
    this.error.set(this.errorService.obtenerMensaje(error, 'Correo o contraseña incorrectos.'));
  }

  /** Avisa que falta verificar la cuenta y lleva a la pantalla del código. */
  private irAVerificar(): void {
    this.toastService.mostrar(
      'Tu cuenta aún no está verificada. Ingresa el código de tu correo.',
      'info',
    );
    this.router.navigate(['/verificar'], { queryParams: { correo: this.correo.trim() } });
  }
}
