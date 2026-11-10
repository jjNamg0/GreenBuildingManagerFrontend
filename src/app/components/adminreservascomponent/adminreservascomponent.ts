import { Component, OnInit } from '@angular/core';
import { Toastservice } from '../../services/toastservice';
import { Reservaservice } from '../../services/reservaservice';
import { Adminconjuntoservice } from '../../services/adminconjuntoservice';
import { Conjunto } from '../../models/conjuntomodel';
import { FiltrosReservas, Reserva } from '../../models/reservamodel';

@Component({
  selector: 'app-adminreservascomponent',
  standalone: false,
  templateUrl: './adminreservascomponent.html',
  styleUrl: './adminreservascomponent.css',
})
export class Adminreservascomponent implements OnInit {
  readonly TAMANO_PAGINA = 20;

  reservas: Reserva[] = [];
  conjuntos: Conjunto[] = [];
  filtros: FiltrosReservas = { conjuntoId: 0, estado: '', desde: '', hasta: '' };
  pagina = 0;
  totalPaginas = 0;
  totalElementos = 0;
  pendientes = 0;
  cargando = true;
  error = '';

  accionPendiente: 'aprobar' | 'rechazar' | 'cancelar' | null = null;
  reservaPendiente: Reserva | null = null;
  motivo = '';
  errorMotivo = '';
  procesando = false;

  constructor(
    private reservaService: Reservaservice,
    private adminConjuntoService: Adminconjuntoservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.adminConjuntoService
      .obtenerConjuntos()
      .subscribe((resultado) => (this.conjuntos = resultado.exito ? resultado.datos : []));
    this.cargar(0);
  }

  cargar(pagina: number): void {
    if (this.filtros.desde && this.filtros.hasta && this.filtros.desde > this.filtros.hasta) {
      this.error = 'La fecha "desde" debe ser antes de la fecha "hasta".';
      return;
    }
    this.cargando = true;
    this.error = '';
    this.reservaService.buscarComoAdmin(pagina, this.TAMANO_PAGINA, this.filtros).subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.reservas = resultado.datos.contenido;
      this.pagina = resultado.datos.paginaActual;
      this.totalPaginas = resultado.datos.totalPaginas;
      this.totalElementos = resultado.datos.totalElementos;
      this.pendientes = resultado.datos.pendientes;
    });
  }

  verPendientes(): void {
    this.filtros = { conjuntoId: 0, estado: 'PENDIENTE', desde: '', hasta: '' };
    this.cargar(0);
  }

  limpiar(): void {
    this.filtros = { conjuntoId: 0, estado: '', desde: '', hasta: '' };
    this.cargar(0);
  }

  esFutura(reserva: Reserva): boolean {
    return new Date(reserva.inicio) > new Date();
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i);
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
    return estado.charAt(0) + estado.slice(1).toLowerCase();
  }

  pedirAccion(accion: 'aprobar' | 'rechazar' | 'cancelar', reserva: Reserva): void {
    this.accionPendiente = accion;
    this.reservaPendiente = reserva;
    this.motivo = '';
    this.errorMotivo = '';
  }

  cerrarAccion(): void {
    this.accionPendiente = null;
    this.reservaPendiente = null;
  }

  get tituloAccion(): string {
    if (this.accionPendiente === 'aprobar') {
      return 'Aprobar reserva';
    }
    return this.accionPendiente === 'rechazar' ? 'Rechazar reserva' : 'Cancelar reserva';
  }

  confirmarAccion(): void {
    const reserva = this.reservaPendiente;
    if (!reserva || !this.accionPendiente) {
      return;
    }
    if (this.accionPendiente !== 'aprobar' && !this.motivo.trim()) {
      this.errorMotivo = 'Escribe el motivo. Le llegará al residente por correo.';
      return;
    }
    const peticion =
      this.accionPendiente === 'aprobar'
        ? this.reservaService.aprobar(reserva.id)
        : this.accionPendiente === 'rechazar'
          ? this.reservaService.rechazar(reserva.id, this.motivo.trim())
          : this.reservaService.cancelarComoAdmin(reserva.id, this.motivo.trim());
    const mensaje =
      this.accionPendiente === 'aprobar'
        ? 'Reserva aprobada'
        : this.accionPendiente === 'rechazar'
          ? 'Reserva rechazada'
          : 'Reserva cancelada';
    this.procesando = true;
    peticion.subscribe((resultado) => {
      this.procesando = false;
      if (!resultado.exito) {
        this.errorMotivo = resultado.mensaje;
        return;
      }
      this.toastService.mostrar(mensaje);
      this.cerrarAccion();
      this.cargar(this.pagina);
    });
  }
}
