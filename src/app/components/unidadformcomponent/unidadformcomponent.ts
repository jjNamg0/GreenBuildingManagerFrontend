import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Conjunto } from '../../models/conjuntomodel';
import { claseSpinner } from '../../models/opcionmodel';
import {
  DatosUnidad,
  REGLAS_UNIDAD,
  TIPOS_UNIDAD,
  Unidad,
  ejemploAgrupacion,
  ejemploNumero,
  etiquetaAgrupacion,
  limpiarDatosUnidad,
} from '../../models/unidadmodel';
import { primerError } from '../../models/validacionmodel';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';
import { Unidadservice } from '../../services/unidadservice';

@Component({
  selector: 'app-unidadformcomponent',
  standalone: false,
  styleUrl: './unidadformcomponent.css',
  templateUrl: './unidadformcomponent.html',
})
export class Unidadformcomponent implements OnInit {
  @Input() conjunto!: Conjunto;
  @Input() unidad: Unidad | null = null;
  @Output() readonly cerrar = new EventEmitter<void>();
  @Output() readonly guardado = new EventEmitter<void>();

  readonly TIPOS = TIPOS_UNIDAD;
  readonly etiquetaAgrupacion = etiquetaAgrupacion;
  readonly ejemploAgrupacion = ejemploAgrupacion;
  readonly ejemploNumero = ejemploNumero;
  readonly claseSpinner = claseSpinner;

  datos: DatosUnidad = { conjuntoId: 0, tipo: 'APARTAMENTO', agrupacion: '', numero: '' };
  error = signal('');
  guardando = signal(false);

  constructor(
    private unidadService: Unidadservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.datos = this.unidad ? this.datosDeUnidad(this.unidad) : this.datosNuevos();
  }

  get titulo(): string {
    return this.unidad ? 'Editar unidad' : 'Nueva unidad';
  }

  guardar(): void {
    const problema = primerError(REGLAS_UNIDAD, this.datos);
    this.error.set(problema);
    if (problema) {
      return;
    }
    this.guardando.set(true);
    this.peticionGuardar(limpiarDatosUnidad(this.datos)).subscribe({
      next: (mensaje) => {
        this.guardando.set(false);
        this.toastService.mostrar(mensaje || 'Unidad guardada.');
        this.guardado.emit();
      },
      error: (error: unknown) => {
        this.guardando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos guardar la unidad.'));
      },
    });
  }

  private peticionGuardar(datos: DatosUnidad): Observable<string> {
    return this.unidad
      ? this.unidadService.actualizar(this.unidad.id, datos)
      : this.unidadService.crear(datos);
  }

  private datosDeUnidad(unidad: Unidad): DatosUnidad {
    return {
      conjuntoId: this.conjunto.id,
      tipo: unidad.tipo,
      agrupacion: unidad.agrupacion,
      numero: unidad.numero,
    };
  }

  private datosNuevos(): DatosUnidad {
    return {
      conjuntoId: this.conjunto.id,
      tipo: this.conjunto.tipo === 'CASAS' ? 'CASA' : 'APARTAMENTO',
      agrupacion: '',
      numero: '',
    };
  }
}
