import { Component, Input, OnInit, signal } from '@angular/core';
import { Conjunto, textoAgrupacionConjunto } from '../../models/conjuntomodel';
import { Unidad, textoResidentes, textoTipoUnidad } from '../../models/unidadmodel';
import { Confirmacionservice } from '../../services/confirmacionservice';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';
import { Unidadservice } from '../../services/unidadservice';

/** Tabla de unidades de un conjunto con crear, editar y eliminar. */
@Component({
  selector: 'app-tablaunidadescomponent',
  standalone: false,
  styleUrl: './tablaunidadescomponent.css',
  templateUrl: './tablaunidadescomponent.html',
})
export class Tablaunidadescomponent implements OnInit {
  @Input() conjunto!: Conjunto;

  readonly textoTipoUnidad = textoTipoUnidad;
  readonly textoResidentes = textoResidentes;
  readonly textoAgrupacionConjunto = textoAgrupacionConjunto;

  unidades = signal<Unidad[]>([]);
  cargando = signal(true);
  error = signal('');
  formularioAbierto = signal(false);
  unidadEditada = signal<Unidad | null>(null);

  constructor(
    private unidadService: Unidadservice,
    private confirmacionService: Confirmacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  /** Carga las unidades. */
  ngOnInit(): void {
    this.cargar();
  }

  get sinUnidades(): boolean {
    return !this.cargando() && this.error() === '' && this.unidades().length === 0;
  }

  get hayUnidades(): boolean {
    return !this.cargando() && this.unidades().length > 0;
  }

  /** Pide al back las unidades del conjunto. */
  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.unidadService.obtenerPorConjunto(this.conjunto.id).subscribe({
      next: (unidades) => {
        this.unidades.set(unidades);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos cargar las unidades.'));
      },
    });
  }

  /** Abre el formulario para crear una unidad o editar la indicada. */
  abrirFormulario(unidad: Unidad | null): void {
    this.unidadEditada.set(unidad);
    this.formularioAbierto.set(true);
  }

  /** Cierra el formulario y recarga la tabla. */
  alGuardar(): void {
    this.formularioAbierto.set(false);
    this.cargar();
  }

  /** Pide confirmación y elimina la unidad. */
  async eliminar(unidad: Unidad): Promise<void> {
    const confirmado = await this.confirmacionService.confirmar({
      titulo: `¿Eliminar ${unidad.descripcion}?`,
      texto: 'Los residentes de esta unidad quedarán sin unidad asignada.',
      textoConfirmar: 'Sí, eliminar',
      peligro: true,
    });
    if (confirmado) {
      this.enviarEliminacion(unidad.id);
    }
  }

  /** Envía la eliminación al back, avisa el resultado y recarga la tabla. */
  private enviarEliminacion(id: number): void {
    this.unidadService.eliminar(id).subscribe({
      next: (mensaje) => {
        this.toastService.mostrar(mensaje || 'Unidad eliminada.');
        this.cargar();
      },
      error: (error: unknown) =>
        this.toastService.mostrar(this.errorService.obtenerMensaje(error), 'error'),
    });
  }
}
