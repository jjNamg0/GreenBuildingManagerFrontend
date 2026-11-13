import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosRestablecer, REGLAS_CORREO, REGLAS_RESTABLECER } from '../../models/authmodel';
import { claseSpinner } from '../../models/opcionmodel';
import { primerError } from '../../models/validacionmodel';
import { Authservice } from '../../services/authservice';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';

/**
 * Pantalla para recuperar la contraseña en dos pasos: pedir el código y escribir la nueva contraseña.
 */
@Component({
  selector: 'app-olvidecontrasenacomponent',
  standalone: false,
  styleUrl: './olvidecontrasenacomponent.css',
  templateUrl: './olvidecontrasenacomponent.html',
})
export class Olvidecontrasenacomponent implements OnInit {
  readonly claseSpinner = claseSpinner;

  paso = signal<1 | 2>(1);
  correo = '';
  codigo = '';
  nuevaPassword = '';
  confirmarPassword = '';
  verPassword = false;
  error = signal('');
  cargando = signal(false);

  constructor(
    private authService: Authservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  /** Lee el correo de la URL. */
  ngOnInit(): void {
    this.correo = this.route.snapshot.queryParamMap.get('correo') ?? '';
  }

  get tipoCampoPassword(): string {
    return this.verPassword ? 'text' : 'password';
  }

  get iconoPassword(): string {
    return this.verPassword ? 'fa-eye-slash' : 'fa-eye';
  }

  /** Borra el mensaje de error del formulario. */
  limpiarError(): void {
    this.error.set('');
  }

  /** Valida el correo y pide al back que envíe el código. */
  solicitarCodigo(): void {
    const datos = { username: this.correo.trim() };
    const problema = primerError(REGLAS_CORREO, datos);
    if (problema) {
      this.error.set(problema);
      return;
    }
    this.cargando.set(true);
    this.authService.solicitarRestablecimiento(datos).subscribe({
      next: (mensaje) => {
        this.cargando.set(false);
        this.toastService.mostrar(mensaje || 'Te enviamos un código a tu correo.', 'info');
        this.paso.set(2);
      },
      error: (error: unknown) => this.fallar(error, 'No pudimos enviar el código.'),
    });
  }

  /** Valida los datos y restablece la contraseña con el código. */
  restablecer(): void {
    const datos: DatosRestablecer = {
      username: this.correo.trim(),
      codigo: this.codigo.trim(),
      nuevaPassword: this.nuevaPassword,
    };
    const problema = primerError(REGLAS_RESTABLECER, {
      datos,
      confirmarPassword: this.confirmarPassword,
    });
    if (problema) {
      this.error.set(problema);
      return;
    }
    this.cargando.set(true);
    this.authService.restablecerPassword(datos).subscribe({
      next: (mensaje) => this.terminar(mensaje, datos.username),
      error: (error: unknown) => this.fallar(error, 'No pudimos restablecer la contraseña.'),
    });
  }

  /** Vuelve al primer paso y borra el código y el error. */
  volverAlPaso1(): void {
    this.paso.set(1);
    this.codigo = '';
    this.error.set('');
  }

  /** Avisa el resultado y avanza al paso siguiente. */
  private terminar(mensaje: string, correo: string): void {
    this.cargando.set(false);
    this.toastService.mostrar(mensaje || 'Tu contraseña se actualizó. Ya puedes iniciar sesión.');
    this.router.navigate(['/login'], { queryParams: { correo } });
  }

  /** Muestra el mensaje del error. */
  private fallar(error: unknown, porDefecto: string): void {
    this.cargando.set(false);
    this.error.set(this.errorService.obtenerMensaje(error, porDefecto));
  }
}
