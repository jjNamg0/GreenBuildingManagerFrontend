import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DatosRegistro, REGLAS_REGISTRO, limpiarDatosRegistro } from '../../models/authmodel';
import { Conjunto } from '../../models/conjuntomodel';
import { claseSpinner } from '../../models/opcionmodel';
import { primerError } from '../../models/validacionmodel';
import { Authservice } from '../../services/authservice';
import { Conjuntoservice } from '../../services/conjuntoservice';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';

@Component({
  selector: 'app-registrocomponent',
  standalone: false,
  styleUrl: './registrocomponent.css',
  templateUrl: './registrocomponent.html',
})
export class Registrocomponent implements OnInit {
  readonly claseSpinner = claseSpinner;

  datos: DatosRegistro = {
    nombre: '',
    apellido: '',
    username: '',
    telefono: '',
    password: '',
    conjuntoId: null,
    unidadSolicitada: '',
  };
  confirmarPassword = '';
  aceptaTerminos = false;
  verPassword = false;

  conjuntos = signal<Conjunto[]>([]);
  cargandoConjuntos = signal(true);
  errorConjuntos = signal('');
  error = signal('');
  cargando = signal(false);

  constructor(
    private authService: Authservice,
    private conjuntoService: Conjuntoservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.conjuntoService.obtenerTodos().subscribe({
      next: (conjuntos) => {
        this.conjuntos.set(conjuntos);
        this.cargandoConjuntos.set(false);
      },
      error: (error: unknown) => {
        this.errorConjuntos.set(
          this.errorService.obtenerMensaje(error, 'No pudimos cargar los conjuntos.'),
        );
        this.cargandoConjuntos.set(false);
      },
    });
  }

  get textoPrimeraOpcion(): string {
    return this.cargandoConjuntos() ? 'Cargando conjuntos...' : 'Elige tu conjunto';
  }

  get tipoCampoPassword(): string {
    return this.verPassword ? 'text' : 'password';
  }

  get iconoPassword(): string {
    return this.verPassword ? 'fa-eye-slash' : 'fa-eye';
  }

  limpiarError(): void {
    this.error.set('');
  }

  registrar(): void {
    const problema = primerError(REGLAS_REGISTRO, {
      datos: this.datos,
      confirmarPassword: this.confirmarPassword,
      aceptaTerminos: this.aceptaTerminos,
    });
    if (problema) {
      this.error.set(problema);
      return;
    }
    const datos = limpiarDatosRegistro(this.datos);
    this.cargando.set(true);
    this.authService.registrar(datos).subscribe({
      next: (mensaje) => this.terminarRegistro(mensaje, datos.username),
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos crear la cuenta.'));
      },
    });
  }

  private terminarRegistro(mensaje: string, correo: string): void {
    this.cargando.set(false);
    this.toastService.mostrar(mensaje || 'Cuenta creada. Te enviamos un código a tu correo.');
    this.router.navigate(['/verificar'], { queryParams: { correo } });
  }
}
