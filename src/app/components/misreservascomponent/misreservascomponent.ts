import { Component, OnInit } from '@angular/core';
import { Toastservice } from '../../services/toastservice';
import { Reservaservice } from '../../services/reservaservice';
import { Authservice } from '../../services/authservice';
import { Reserva } from '../../models/reservamodel';

@Component({
  selector: 'app-misreservascomponent',
  standalone: false,
  templateUrl: './misreservascomponent.html',
  styleUrl: './misreservascomponent.css',
})
export class Misreservascomponent implements OnInit {
  reservas: Reserva[] = [];
  cargando = true;
  error = '';
  vista: 'proximas' | 'pasadas' | 'canceladas' = 'proximas';

  mostrarConfirmacion = false;
  reservaPendiente: Reserva | null = null;
  procesando = false;
  comprobante: Reserva | null = null;

  constructor(
    private reservaService: Reservaservice,
    public auth: Authservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  get filtradas(): Reserva[] {
    return this.deVista(this.vista);
  }

  cantidad(vista: 'proximas' | 'pasadas' | 'canceladas'): number {
    return this.deVista(vista).length;
  }

  private deVista(vista: 'proximas' | 'pasadas' | 'canceladas'): Reserva[] {
    const ahora = new Date();
    if (vista === 'canceladas') {
      return this.reservas.filter((r) => r.estado === 'CANCELADA' || r.estado === 'RECHAZADA');
    }
    const vivas = this.reservas.filter((r) => r.estado === 'PENDIENTE' || r.estado === 'CONFIRMADA');
    if (vista === 'pasadas') {
      return vivas.filter((r) => new Date(r.fin) <= ahora);
    }
    return vivas.filter((r) => new Date(r.fin) > ahora).sort((a, b) => a.inicio.localeCompare(b.inicio));
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.reservaService.obtenerMisReservas().subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.reservas = resultado.datos;
    });
  }

  sePuedeCancelar(reserva: Reserva): boolean {
    return (reserva.estado === 'PENDIENTE' || reserva.estado === 'CONFIRMADA') && new Date(reserva.inicio) > new Date();
  }

  claseEstado(estado: string): string {
    switch (estado) {
      case 'CONFIRMADA':
        return 'exito';
      case 'PENDIENTE':
        return 'pendiente';
      case 'RECHAZADA':
        return 'peligro';
      default:
        return 'neutro';
    }
  }

  textoEstado(estado: string): string {
    if (estado === 'PENDIENTE') {
      return 'Pendiente de revisión';
    }
    return estado.charAt(0) + estado.slice(1).toLowerCase();
  }

  pedirConfirmacion(reserva: Reserva): void {
    this.reservaPendiente = reserva;
    this.mostrarConfirmacion = true;
  }

  cancelarConfirmacion(): void {
    this.mostrarConfirmacion = false;
    this.reservaPendiente = null;
  }

  confirmarCancelacion(): void {
    const reserva = this.reservaPendiente;
    if (!reserva) {
      return;
    }
    this.procesando = true;
    this.reservaService.cancelar(reserva.id).subscribe((resultado) => {
      this.procesando = false;
      if (!resultado.exito) {
        this.toastService.mostrar(resultado.mensaje, 'error');
        this.cancelarConfirmacion();
        return;
      }
      const actualizada = resultado.datos;
      this.reservas = this.reservas.map((r) => (r.id === actualizada.id ? actualizada : r));
      this.toastService.mostrar('Reserva cancelada');
      this.cancelarConfirmacion();
    });
  }

  verComprobante(reserva: Reserva): void {
    this.comprobante = reserva;
  }

  cerrarComprobante(): void {
    this.comprobante = null;
  }

  imprimir(): void {
    window.print();
  }
}
