import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Conjunto } from '../../models/conjuntomodel';
import { claseSpinner } from '../../models/opcionmodel';
import { Unidad, textoOpcionUnidad } from '../../models/unidadmodel';
import { Usuario, nombreCompleto } from '../../models/usuariomodel';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';
import { Unidadservice } from '../../services/unidadservice';
import { Usuarioservice } from '../../services/usuarioservice';

@Component({
  selector: 'app-asignarunidadcomponent',
  standalone: false,
  styleUrl: './asignarunidadcomponent.css',
  templateUrl: './asignarunidadcomponent.html',
})
export class Asignarunidadcomponent implements OnInit {
  @Input() usuario!: Usuario;
  @Input() conjuntos: Conjunto[] = [];
  @Output() readonly cerrar = new EventEmitter<void>();
  @Output() readonly asignado = new EventEmitter<void>();

  readonly nombreCompleto = nombreCompleto;
  readonly textoOpcionUnidad = textoOpcionUnidad;
  readonly claseSpinner = claseSpinner;

  conjuntoElegido: number | null = null;
  unidadElegida: number | null = null;
  unidades = signal<Unidad[]>([]);
  cargandoUnidades = signal(false);
  guardando = signal(false);
  error = signal('');

  constructor(
    private usuarioService: Usuarioservice,
    private unidadService: Unidadservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.conjuntoElegido = this.usuario.conjuntoId;
    this.unidadElegida = this.usuario.unidadId;
    this.cargarUnidades();
  }

  get textoPrimeraUnidad(): string {
    return this.cargandoUnidades() ? 'Cargando unidades...' : 'Elige una unidad';
  }

  cambiarConjunto(conjuntoId: number | null): void {
    this.conjuntoElegido = conjuntoId;
    this.unidadElegida = null;
    this.cargarUnidades();
  }

  guardar(): void {
    if (this.unidadElegida === null) {
      this.error.set('Elige el conjunto y la unidad.');
      return;
    }
    this.guardando.set(true);
    this.usuarioService.asignarUnidad(this.usuario.id, this.unidadElegida).subscribe({
      next: (mensaje) => {
        this.guardando.set(false);
        this.toastService.mostrar(mensaje || `Unidad asignada a ${this.usuario.nombre}.`);
        this.asignado.emit();
      },
      error: (error: unknown) => {
        this.guardando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos asignar la unidad.'));
      },
    });
  }

  private cargarUnidades(): void {
    if (this.conjuntoElegido === null) {
      this.unidades.set([]);
      return;
    }
    this.cargandoUnidades.set(true);
    this.unidadService.obtenerPorConjunto(this.conjuntoElegido).subscribe({
      next: (unidades) => {
        this.unidades.set(unidades);
        this.cargandoUnidades.set(false);
      },
      error: (error: unknown) => {
        this.unidades.set([]);
        this.cargandoUnidades.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos cargar las unidades.'));
      },
    });
  }
}
