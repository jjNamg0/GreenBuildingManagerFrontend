import { Component, Input, OnInit, signal } from '@angular/core';
import {
  Espacio,
  claseEstadoEspacio,
  iconoTipoEspacio,
  textoEstadoEspacio,
  textoTipoEspacio,
  textoUsoEspacio,
} from '../../models/espaciomodel';
import { Confirmacionservice } from '../../services/confirmacionservice';
import { Errorservice } from '../../services/errorservice';
import { Espacioservice } from '../../services/espacioservice';
import { Toastservice } from '../../services/toastservice';

/** Tabla de espacios de un conjunto con crear, editar y eliminar. */
@Component({
  selector: 'app-tablaespacioscomponent',
  standalone: false,
  styleUrl: './tablaespacioscomponent.css',
  templateUrl: './tablaespacioscomponent.html',
})
export class Tablaespacioscomponent implements OnInit {
  @Input() conjuntoId = 0;

  readonly textoTipoEspacio = textoTipoEspacio;
  readonly iconoTipoEspacio = iconoTipoEspacio;
  readonly textoUsoEspacio = textoUsoEspacio;
  readonly textoEstadoEspacio = textoEstadoEspacio;
  readonly claseEstadoEspacio = claseEstadoEspacio;

  espacios = signal<Espacio[]>([]);
  cargando = signal(true);
  error = signal('');
  formularioAbierto = signal(false);
  espacioEditado = signal<Espacio | null>(null);

  constructor(
    private espacioService: Espacioservice,
    private confirmacionService: Confirmacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  /** Carga los espacios. */
  ngOnInit(): void {
    this.cargar();
  }

  get sinEspacios(): boolean {
    return !this.cargando() && this.error() === '' && this.espacios().length === 0;
  }

  get hayEspacios(): boolean {
    return !this.cargando() && this.espacios().length > 0;
  }

  /** Pide al back los espacios del conjunto. */
  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.espacioService.obtenerPorConjunto(this.conjuntoId).subscribe({
      next: (espacios) => {
        this.espacios.set(espacios);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos cargar los espacios.'));
      },
    });
  }

  /** Abre el formulario para crear un espacio o editar el indicado. */
  abrirFormulario(espacio: Espacio | null): void {
    this.espacioEditado.set(espacio);
    this.formularioAbierto.set(true);
  }

  /** Cierra el formulario y recarga la tabla. */
  alGuardar(): void {
    this.formularioAbierto.set(false);
    this.cargar();
  }

  /** Pide confirmación y elimina el espacio. */
  async eliminar(espacio: Espacio): Promise<void> {
    const confirmado = await this.confirmacionService.confirmar({
      titulo: `¿Eliminar ${espacio.nombre}?`,
      texto: 'Se cancelarán las reservas futuras de este espacio.',
      textoConfirmar: 'Sí, eliminar',
      peligro: true,
    });
    if (confirmado) {
      this.enviarEliminacion(espacio.id);
    }
  }

  /** Envía la eliminación al back, avisa el resultado y recarga la tabla. */
  private enviarEliminacion(id: number): void {
    this.espacioService.eliminar(id).subscribe({
      next: (mensaje) => {
        this.toastService.mostrar(mensaje || 'Espacio eliminado.');
        this.cargar();
      },
      error: (error: unknown) =>
        this.toastService.mostrar(this.errorService.obtenerMensaje(error), 'error'),
    });
  }
}
