import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ESTADOS_RESERVA, EstadoReserva, Reserva } from '../../models/reservamodel';
import { Confirmacionservice } from '../../services/confirmacionservice';
import { Errorservice } from '../../services/errorservice';
import { Reservaservice } from '../../services/reservaservice';
import { Toastservice } from '../../services/toastservice';

/** Pantalla para que el administrador revise las reservas y las apruebe o rechace. */
@Component({
  selector: 'app-adminreservascomponent',
  standalone: false,
  styleUrl: './adminreservascomponent.css',
  templateUrl: './adminreservascomponent.html',
})
export class Adminreservascomponent implements OnInit {
  readonly ESTADOS = ESTADOS_RESERVA;

  estado: EstadoReserva | '' = 'PENDIENTE';
  reservas = signal<Reserva[]>([]);
  cargando = signal(true);
  error = signal('');
  procesando = signal<number | null>(null);

  constructor(
    private reservaService: Reservaservice,
    private confirmacionService: Confirmacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  /** Carga las reservas. */
  ngOnInit(): void {
    this.cargar();
  }

  get sinReservas(): boolean {
    return !this.cargando() && this.error() === '' && this.reservas().length === 0;
  }

  get hayReservas(): boolean {
    return !this.cargando() && this.reservas().length > 0;
  }

  /** Pide al back las reservas del estado elegido. */
  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.reservaService.obtenerTodas(this.estado).subscribe({
      next: (reservas) => {
        this.reservas.set(reservas);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos cargar las reservas.'));
      },
    });
  }

  /** Filtra las reservas por estado y recarga la lista. */
  elegirEstado(estado: EstadoReserva | ''): void {
    this.estado = estado;
    this.cargar();
  }

  /** Pide confirmación y aprueba la reserva. */
  async aprobar(reserva: Reserva): Promise<void> {
    const confirmado = await this.confirmacionService.confirmar({
      titulo: '¿Aprobar la reserva?',
      texto: `${reserva.espacioNombre} para ${reserva.usuarioNombre}, ${reserva.fecha} de ${reserva.horaInicio} a ${reserva.horaFin}.`,
      textoConfirmar: 'Aprobar',
    });
    if (confirmado) {
      this.enviar(reserva.id, this.reservaService.aprobar(reserva.id), 'Reserva aprobada.');
    }
  }

  /** Pide el motivo y rechaza la reserva. */
  async rechazar(reserva: Reserva): Promise<void> {
    const observacion = await this.confirmacionService.pedirTexto({
      titulo: '¿Rechazar la reserva?',
      texto: `Cuéntale a ${reserva.usuarioNombre} por qué no se puede.`,
      placeholder: 'Motivo del rechazo',
      textoConfirmar: 'Rechazar',
      obligatorio: true,
    });
    if (observacion !== null) {
      this.enviar(
        reserva.id,
        this.reservaService.rechazar(reserva.id, { observacion }),
        'Reserva rechazada.',
      );
    }
  }

  /** Ejecuta la petición recibida, avisa el resultado y recarga la lista. */
  private enviar(id: number, peticion: Observable<string>, porDefecto: string): void {
    this.procesando.set(id);
    peticion.subscribe({
      next: (mensaje) => {
        this.procesando.set(null);
        this.toastService.mostrar(mensaje || porDefecto);
        this.cargar();
      },
      error: (error: unknown) => {
        this.procesando.set(null);
        this.toastService.mostrar(this.errorService.obtenerMensaje(error), 'error');
      },
    });
  }
}
