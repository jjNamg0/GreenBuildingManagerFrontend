import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosVerificacion, REGLAS_CORREO, REGLAS_VERIFICACION } from '../../models/authmodel';
import { claseSpinner } from '../../models/opcionmodel';
import { LONGITUD_CODIGO, primerError } from '../../models/validacionmodel';
import { Authservice } from '../../services/authservice';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';

@Component({
  selector: 'app-verificarcodigocomponent',
  standalone: false,
  styleUrl: './verificarcodigocomponent.css',
  templateUrl: './verificarcodigocomponent.html',
})
export class Verificarcodigocomponent implements OnInit {
  readonly LONGITUD_CODIGO = LONGITUD_CODIGO;
  readonly claseSpinner = claseSpinner;

  correo = '';
  codigo = '';
  correoDesdeEnlace = false;
  enfocado = signal(false);
  error = signal('');
  cargando = signal(false);
  reenviando = signal(false);

  constructor(
    private authService: Authservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.correo = this.route.snapshot.queryParamMap.get('correo') ?? '';
    this.correoDesdeEnlace = this.correo !== '';
  }

  casillas(): string[] {
    return Array.from({ length: this.LONGITUD_CODIGO }, (_valor, indice) =>
      this.codigo.charAt(indice),
    );
  }

  esCasillaActual(indice: number): boolean {
    return this.enfocado() && indice === Math.min(this.codigo.length, this.LONGITUD_CODIGO - 1);
  }

  actualizarCodigo(entrada: HTMLInputElement): void {
    this.codigo = entrada.value.replace(/\D/g, '').slice(0, this.LONGITUD_CODIGO);
    entrada.value = this.codigo;
    this.error.set('');
    if (this.codigo.length === this.LONGITUD_CODIGO && this.correo.trim() !== '') {
      this.verificar();
    }
  }

  verificar(): void {
    const datos: DatosVerificacion = { username: this.correo.trim(), codigo: this.codigo };
    const problema = primerError(REGLAS_VERIFICACION, datos);
    if (problema) {
      this.error.set(problema);
      return;
    }
    this.cargando.set(true);
    this.authService.verificarCodigo(datos).subscribe({
      next: (mensaje) => this.terminarVerificacion(mensaje, datos.username),
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(
          this.errorService.obtenerMensaje(error, 'El código no es válido o ya venció.'),
        );
      },
    });
  }

  reenviar(): void {
    const datos = { username: this.correo.trim() };
    const problema = primerError(REGLAS_CORREO, datos);
    if (problema) {
      this.error.set(problema);
      return;
    }
    this.reenviando.set(true);
    this.authService.reenviarCodigo(datos).subscribe({
      next: (mensaje) => {
        this.reenviando.set(false);
        this.toastService.mostrar(mensaje || 'Te enviamos un código nuevo.', 'info');
      },
      error: (error: unknown) => {
        this.reenviando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos reenviar el código.'));
      },
    });
  }

  private terminarVerificacion(mensaje: string, correo: string): void {
    this.cargando.set(false);
    this.toastService.mostrar(mensaje || 'Tu correo quedó verificado. Ya puedes iniciar sesión.');
    this.router.navigate(['/login'], { queryParams: { correo } });
  }
}
