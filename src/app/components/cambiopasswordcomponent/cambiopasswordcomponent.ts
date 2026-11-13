import { Component, signal } from '@angular/core';
import { claseSpinner } from '../../models/opcionmodel';
import { DatosCambioPassword, REGLAS_CAMBIO_PASSWORD } from '../../models/usuariomodel';
import { primerError } from '../../models/validacionmodel';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';
import { Usuarioservice } from '../../services/usuarioservice';

@Component({
  selector: 'app-cambiopasswordcomponent',
  standalone: false,
  styleUrl: './cambiopasswordcomponent.css',
  templateUrl: './cambiopasswordcomponent.html',
})
export class Cambiopasswordcomponent {
  readonly claseSpinner = claseSpinner;

  datos: DatosCambioPassword = { passwordActual: '', passwordNueva: '' };
  confirmarPassword = '';
  error = signal('');
  guardando = signal(false);

  constructor(
    private usuarioService: Usuarioservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  cambiarPassword(): void {
    const problema = primerError(REGLAS_CAMBIO_PASSWORD, {
      datos: this.datos,
      confirmarPassword: this.confirmarPassword,
    });
    this.error.set(problema);
    if (problema) {
      return;
    }
    this.guardando.set(true);
    this.usuarioService.cambiarPassword(this.datos).subscribe({
      next: (mensaje) => this.terminar(mensaje),
      error: (error: unknown) => {
        this.guardando.set(false);
        this.error.set(
          this.errorService.obtenerMensaje(error, 'No pudimos cambiar la contraseña.'),
        );
      },
    });
  }

  private terminar(mensaje: string): void {
    this.guardando.set(false);
    this.datos = { passwordActual: '', passwordNueva: '' };
    this.confirmarPassword = '';
    this.toastService.mostrar(mensaje || 'Tu contraseña se cambió correctamente.');
  }
}
