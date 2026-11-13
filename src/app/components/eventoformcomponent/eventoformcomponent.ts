import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Conjunto } from '../../models/conjuntomodel';
import { Espacio } from '../../models/espaciomodel';
import {
  DATOS_EVENTO_VACIO,
  DatosEvento,
  Evento,
  PLANTILLAS_INVITACION,
  PlantillaInvitacion,
  REGLAS_EVENTO,
  TIPOS_EVENTO,
  TipoEvento,
  buscarPlantilla,
  datosDeEvento,
  limpiarDatosEvento,
} from '../../models/eventomodel';
import { claseSpinner } from '../../models/opcionmodel';
import { primerError } from '../../models/validacionmodel';
import { Errorservice } from '../../services/errorservice';
import { Espacioservice } from '../../services/espacioservice';
import { Eventoservice } from '../../services/eventoservice';
import { Toastservice } from '../../services/toastservice';

@Component({
  selector: 'app-eventoformcomponent',
  standalone: false,
  styleUrl: './eventoformcomponent.css',
  templateUrl: './eventoformcomponent.html',
})
export class Eventoformcomponent implements OnInit {
  @Input() evento: Evento | null = null;
  @Input() conjuntos: Conjunto[] = [];
  @Output() readonly cerrar = new EventEmitter<void>();
  @Output() readonly guardado = new EventEmitter<void>();

  readonly TIPOS = TIPOS_EVENTO;
  readonly PLANTILLAS = PLANTILLAS_INVITACION;
  readonly claseSpinner = claseSpinner;

  datos: DatosEvento = { ...DATOS_EVENTO_VACIO };
  espacios = signal<Espacio[]>([]);
  vistaPrevia = signal<SafeHtml | null>(null);
  cargandoVista = signal(false);
  errorVista = signal('');
  error = signal('');
  guardando = signal(false);

  constructor(
    private eventoService: Eventoservice,
    private espacioService: Espacioservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.datos = this.evento ? datosDeEvento(this.evento) : { ...DATOS_EVENTO_VACIO };
    this.cargarEspacios();
  }

  get titulo(): string {
    return this.evento ? 'Editar evento' : 'Programar evento';
  }

  cambiarConjunto(conjuntoId: number | null): void {
    this.datos.conjuntoId = conjuntoId;
    this.datos.espacioId = null;
    this.cargarEspacios();
  }

  elegirTipo(tipo: TipoEvento): void {
    this.datos.tipo = tipo;
    this.datos.paraNinos = this.datos.paraNinos || tipo === 'INFANTIL';
    this.datos.plantilla = buscarPlantilla(tipo) ?? this.datos.plantilla;
  }

  elegirPlantilla(plantilla: PlantillaInvitacion): void {
    this.datos.plantilla = plantilla;
    if (this.vistaPrevia()) {
      this.verVistaPrevia();
    }
  }

  verVistaPrevia(): void {
    this.cargandoVista.set(true);
    this.errorVista.set('');
    this.eventoService.obtenerVistaPrevia(this.datos).subscribe({
      next: (html) => {
        this.cargandoVista.set(false);
        this.vistaPrevia.set(this.sanitizer.bypassSecurityTrustHtml(html));
      },
      error: (error: unknown) => {
        this.cargandoVista.set(false);
        this.errorVista.set(
          this.errorService.obtenerMensaje(error, 'No pudimos generar la vista previa.'),
        );
      },
    });
  }

  guardar(): void {
    const problema = primerError(REGLAS_EVENTO, this.datos);
    this.error.set(problema);
    if (problema) {
      return;
    }
    this.guardando.set(true);
    this.peticionGuardar(limpiarDatosEvento(this.datos)).subscribe({
      next: (mensaje) => {
        this.guardando.set(false);
        this.toastService.mostrar(mensaje || 'Evento guardado.');
        this.guardado.emit();
      },
      error: (error: unknown) => {
        this.guardando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos guardar el evento.'));
      },
    });
  }

  private peticionGuardar(datos: DatosEvento): Observable<string> {
    return this.evento
      ? this.eventoService.actualizar(this.evento.id, datos)
      : this.eventoService.crear(datos);
  }

  private cargarEspacios(): void {
    if (this.datos.conjuntoId === null) {
      this.espacios.set([]);
      return;
    }
    this.espacioService.obtenerPorConjunto(this.datos.conjuntoId).subscribe({
      next: (espacios) => this.espacios.set(espacios),
      error: () => this.espacios.set([]),
    });
  }
}
