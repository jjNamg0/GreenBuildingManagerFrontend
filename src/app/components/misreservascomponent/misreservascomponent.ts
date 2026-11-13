import { Component, OnInit, signal } from '@angular/core';
import { Reserva } from '../../models/reservamodel';
import { Confirmacionservice } from '../../services/confirmacionservice';
import { Errorservice } from '../../services/errorservice';
import { Reservaservice } from '../../services/reservaservice';
import { Toastservice } from '../../services/toastservice';

@Component({
  selector: 'app-misreservascomponent',
  standalone: false,
  styleUrl: './misreservascomponent.css',
  templateUrl: './misreservascomponent.html',
})
export class Misreservascomponent implements OnInit {
  reservas = signal<Reserva[]>([]);
  cargando = signal(true);
  error = signal('');
  cancelando = signal<number | null>(null);

  constructor(
    private reservaService: Reservaservice,
    private confirmacionService: Confirmacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  get sinReservas(): boolean {
    return !this.cargando() && this.error() === '' && this.reservas().length === 0;
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.reservaService.obtenerMias().subscribe({
      next: (reservas) => {
        this.reservas.set(reservas);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos cargar tus reservas.'));
      },
    });
  }

  async cancelar(reserva: Reserva): Promise<void> {
    const confirmado = await this.confirmacionService.confirmar({
      titulo: '¿Cancelar la reserva?',
      texto: `${reserva.espacioNombre} el ${reserva.fecha} de ${reserva.horaInicio} a ${reserva.horaFin}. El horario quedará libre para otros residentes.`,
      textoConfirmar: 'Sí, cancelar',
      peligro: true,
    });
    if (confirmado) {
      this.enviarCancelacion(reserva.id);
    }
  }

  private enviarCancelacion(id: number): void {
    this.cancelando.set(id);
    this.reservaService.cancelar(id).subscribe({
      next: (mensaje) => {
        this.cancelando.set(null);
        this.toastService.mostrar(mensaje || 'La reserva quedó cancelada.');
        this.cargar();
      },
      error: (error: unknown) => {
        this.cancelando.set(null);
        this.toastService.mostrar(
          this.errorService.obtenerMensaje(error, 'No pudimos cancelar la reserva.'),
          'error',
        );
      },
    });
  }
}
