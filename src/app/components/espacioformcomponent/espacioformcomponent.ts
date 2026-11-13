import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DATOS_ESPACIO_VACIO,
  DatosEspacio,
  Espacio,
  REGLAS_ESPACIO,
  TIPOS_ESPACIO,
  datosDeEspacio,
  limpiarDatosEspacio,
} from '../../models/espaciomodel';
import { claseSpinner } from '../../models/opcionmodel';
import { primerError } from '../../models/validacionmodel';
import { Errorservice } from '../../services/errorservice';
import { Espacioservice } from '../../services/espacioservice';
import { Toastservice } from '../../services/toastservice';

/** Formulario para crear o editar un espacio común. */
@Component({
  selector: 'app-espacioformcomponent',
  standalone: false,
  styleUrl: './espacioformcomponent.css',
  templateUrl: './espacioformcomponent.html',
})
export class Espacioformcomponent implements OnInit {
  @Input() conjuntoId = 0;
  @Input() espacio: Espacio | null = null;
  @Output() readonly cerrar = new EventEmitter<void>();
  @Output() readonly guardado = new EventEmitter<void>();

  readonly TIPOS = TIPOS_ESPACIO;
  readonly claseSpinner = claseSpinner;

  datos: DatosEspacio = { ...DATOS_ESPACIO_VACIO };
  error = signal('');
  guardando = signal(false);

  constructor(
    private espacioService: Espacioservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  /** Carga los datos del espacio cuando se está editando. */
  ngOnInit(): void {
    const base = this.espacio ? datosDeEspacio(this.espacio) : { ...DATOS_ESPACIO_VACIO };
    this.datos = { ...base, conjuntoId: this.conjuntoId };
  }

  get titulo(): string {
    return this.espacio ? 'Editar espacio' : 'Nuevo espacio';
  }

  /** Valida el formulario y envía el espacio al back. */
  guardar(): void {
    const problema = primerError(REGLAS_ESPACIO, this.datos);
    this.error.set(problema);
    if (problema) {
      return;
    }
    this.guardando.set(true);
    this.peticionGuardar(limpiarDatosEspacio(this.datos)).subscribe({
      next: (mensaje) => {
        this.guardando.set(false);
        this.toastService.mostrar(mensaje || 'Espacio guardado.');
        this.guardado.emit();
      },
      error: (error: unknown) => {
        this.guardando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos guardar el espacio.'));
      },
    });
  }

  /** Elige entre crear o actualizar según si se está editando. */
  private peticionGuardar(datos: DatosEspacio): Observable<string> {
    return this.espacio
      ? this.espacioService.actualizar(this.espacio.id, datos)
      : this.espacioService.crear(datos);
  }
}
