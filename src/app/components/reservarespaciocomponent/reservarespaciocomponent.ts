import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Espacio, textoTipoEspacio } from '../../models/espaciomodel';
import { claseSpinner } from '../../models/opcionmodel';
import {
  DatosReserva,
  FranjaHoraria,
  REGLAS_RESERVA,
  proximosDias,
} from '../../models/reservamodel';
import { primerError } from '../../models/validacionmodel';
import { Errorservice } from '../../services/errorservice';
import { Espacioservice } from '../../services/espacioservice';
import { Reservaservice } from '../../services/reservaservice';
import { Toastservice } from '../../services/toastservice';

@Component({
  selector: 'app-reservarespaciocomponent',
  standalone: false,
  styleUrl: './reservarespaciocomponent.css',
  templateUrl: './reservarespaciocomponent.html',
})
export class Reservarespaciocomponent implements OnInit {
  private readonly DIAS_VISIBLES = 14;

  readonly textoTipoEspacio = textoTipoEspacio;
  readonly claseSpinner = claseSpinner;

  espacio = signal<Espacio | null>(null);
  dias = signal<string[]>([]);
  fecha = signal('');
  hoy = '';
  franjas = signal<FranjaHoraria[]>([]);
  inicio = signal<number | null>(null);
  fin = signal<number | null>(null);
  motivo = '';
  asistentes: number | null = null;

  cargandoEspacio = signal(true);
  cargandoFranjas = signal(false);
  errorEspacio = signal('');
  errorFranjas = signal('');
  error = signal('');
  guardando = signal(false);

  constructor(
    private espacioService: Espacioservice,
    private reservaService: Reservaservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dias.set(proximosDias(this.DIAS_VISIBLES));
    this.hoy = this.dias()[0];
    const id = Number(this.route.snapshot.paramMap.get('espacioId'));
    this.espacioService.obtenerPorId(id).subscribe({
      next: (espacio) => {
        this.espacio.set(espacio);
        this.cargandoEspacio.set(false);
        this.seleccionarFecha(this.hoy);
      },
      error: (error: unknown) => {
        this.cargandoEspacio.set(false);
        this.errorEspacio.set(
          this.errorService.obtenerMensaje(error, 'No encontramos este espacio.'),
        );
      },
    });
  }

  get textoHorario(): string {
    return this.inicio() === null ? 'Sin elegir' : `${this.horaInicio()} – ${this.horaFin()}`;
  }

  seleccionarFecha(fecha: string): void {
    const espacio = this.espacio();
    if (!fecha || !espacio) {
      return;
    }
    this.fecha.set(fecha);
    this.inicio.set(null);
    this.fin.set(null);
    this.cargandoFranjas.set(true);
    this.errorFranjas.set('');
    this.reservaService.obtenerDisponibilidad(espacio.id, fecha).subscribe({
      next: (franjas) => this.mostrarFranjas(franjas, ''),
      error: (error: unknown) =>
        this.mostrarFranjas(
          [],
          this.errorService.obtenerMensaje(error, 'No pudimos cargar la disponibilidad.'),
        ),
    });
  }

  elegirFranja(indice: number): void {
    if (!this.franjas()[indice].disponible) {
      return;
    }
    if (this.extiendeSeleccion(indice)) {
      this.fin.set(indice);
    } else {
      this.inicio.set(indice);
      this.fin.set(null);
    }
    this.error.set('');
  }

  horaInicio(): string {
    const inicio = this.inicio();
    return inicio === null ? '' : this.franjas()[inicio].horaInicio;
  }

  horaFin(): string {
    const inicio = this.inicio();
    return inicio === null ? '' : this.franjas()[this.fin() ?? inicio].horaFin;
  }

  reservar(): void {
    const espacio = this.espacio();
    if (!espacio) {
      return;
    }
    const datos: DatosReserva = {
      espacioId: espacio.id,
      fecha: this.fecha(),
      horaInicio: this.horaInicio(),
      horaFin: this.horaFin(),
      motivo: this.motivo.trim(),
      asistentes: this.asistentes,
    };
    const problema = primerError(REGLAS_RESERVA, datos);
    if (problema) {
      this.error.set(problema);
      return;
    }
    this.enviarReserva(datos);
  }

  private enviarReserva(datos: DatosReserva): void {
    this.guardando.set(true);
    this.reservaService.crear(datos).subscribe({
      next: (mensaje) => {
        this.guardando.set(false);
        this.toastService.mostrar(
          mensaje || 'Solicitud enviada. La administración la revisará pronto.',
        );
        this.router.navigate(['/mis-reservas']);
      },
      error: (error: unknown) => {
        this.guardando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos crear la reserva.'));
      },
    });
  }

  private mostrarFranjas(franjas: FranjaHoraria[], error: string): void {
    this.franjas.set(franjas);
    this.errorFranjas.set(error);
    this.cargandoFranjas.set(false);
  }

  private extiendeSeleccion(indice: number): boolean {
    const inicio = this.inicio();
    if (inicio === null || this.fin() !== null || indice <= inicio) {
      return false;
    }
    return this.franjas()
      .slice(inicio, indice + 1)
      .every((franja) => franja.disponible);
  }
}
