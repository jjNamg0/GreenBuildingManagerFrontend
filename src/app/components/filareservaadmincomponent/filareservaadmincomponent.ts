import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Reserva,
  claseEstadoReserva,
  estaPendiente,
  textoEstadoReserva,
} from '../../models/reservamodel';

@Component({
  selector: '[app-filareservaadmincomponent]',
  standalone: false,
  styleUrl: './filareservaadmincomponent.css',
  templateUrl: './filareservaadmincomponent.html',
})
export class Filareservaadmincomponent {
  @Input() reserva!: Reserva;
  @Input() procesando = false;
  @Output() readonly aprobar = new EventEmitter<Reserva>();
  @Output() readonly rechazar = new EventEmitter<Reserva>();

  readonly claseEstadoReserva = claseEstadoReserva;
  readonly textoEstadoReserva = textoEstadoReserva;
  readonly estaPendiente = estaPendiente;
}
