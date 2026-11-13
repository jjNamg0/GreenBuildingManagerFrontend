import { Component, OnInit, signal } from '@angular/core';
import { Conjunto, TIPOS_CONJUNTO, textoTipoConjunto } from '../../models/conjuntomodel';
import { Confirmacionservice } from '../../services/confirmacionservice';
import { Conjuntoservice } from '../../services/conjuntoservice';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';

/**
 * Pantalla para administrar los conjuntos: búsqueda, filtro por tipo, creación, edición y eliminación.
 */
@Component({
  selector: 'app-adminconjuntoscomponent',
  standalone: false,
  styleUrl: './adminconjuntoscomponent.css',
  templateUrl: './adminconjuntoscomponent.html',
})
export class Adminconjuntoscomponent implements OnInit {
  readonly TIPOS = TIPOS_CONJUNTO;
  readonly textoTipoConjunto = textoTipoConjunto;

  conjuntos = signal<Conjunto[]>([]);
  busqueda = '';
  tipo = '';
  cargando = signal(true);
  error = signal('');
  formularioAbierto = signal(false);
  conjuntoEditado = signal<Conjunto | null>(null);

  constructor(
    private conjuntoService: Conjuntoservice,
    private confirmacionService: Confirmacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  /** Carga la lista de conjuntos. */
  ngOnInit(): void {
    this.cargar();
  }

  get sinConjuntos(): boolean {
    return !this.cargando() && this.error() === '' && this.conjuntos().length === 0;
  }

  get hayConjuntos(): boolean {
    return !this.cargando() && this.conjuntos().length > 0;
  }

  /** Pide al back los conjuntos con la búsqueda y el tipo actuales. */
  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.conjuntoService.obtenerTodos(this.busqueda.trim(), this.tipo).subscribe({
      next: (conjuntos) => {
        this.conjuntos.set(conjuntos);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos cargar los conjuntos.'));
      },
    });
  }

  /** Filtra la lista por tipo de conjunto. */
  elegirTipo(tipo: string): void {
    this.tipo = tipo;
    this.cargar();
  }

  /** Abre el formulario para crear un conjunto o editar el indicado. */
  abrirFormulario(conjunto: Conjunto | null): void {
    this.conjuntoEditado.set(conjunto);
    this.formularioAbierto.set(true);
  }

  /** Cierra el formulario y recarga la lista. */
  alGuardar(): void {
    this.formularioAbierto.set(false);
    this.cargar();
  }

  /** Pide confirmación y elimina el conjunto indicado. */
  async eliminar(conjunto: Conjunto): Promise<void> {
    const confirmado = await this.confirmacionService.confirmar({
      titulo: `¿Eliminar ${conjunto.nombre}?`,
      texto:
        'Se eliminarán también sus unidades, espacios y eventos. Esta acción no se puede deshacer.',
      textoConfirmar: 'Sí, eliminar',
      peligro: true,
    });
    if (confirmado) {
      this.enviarEliminacion(conjunto.id);
    }
  }

  /** Envía la eliminación al back, avisa el resultado y recarga la lista. */
  private enviarEliminacion(id: number): void {
    this.conjuntoService.eliminar(id).subscribe({
      next: (mensaje) => {
        this.toastService.mostrar(mensaje || 'Conjunto eliminado.');
        this.cargar();
      },
      error: (error: unknown) =>
        this.toastService.mostrar(
          this.errorService.obtenerMensaje(error, 'No pudimos eliminar el conjunto.'),
          'error',
        ),
    });
  }
}
