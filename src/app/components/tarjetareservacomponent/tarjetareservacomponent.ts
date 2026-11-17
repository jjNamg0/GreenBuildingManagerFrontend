import { Component, EventEmitter, Input, Output } from '@angular/core';
import { claseSpinner } from '../../models/opcionmodel';
import {
  Reserva,
  claseEstadoReserva,
  puedeCancelarReserva,
  puedeInvitarReserva,
  textoEstadoReserva,
} from '../../models/reservamodel';

/** Tarjeta con la información de una reserva y sus acciones. */
@Component({
  selector: 'app-tarjetareservacomponent',
  standalone: false,
  styleUrl: './tarjetareservacomponent.css',
  templateUrl: './tarjetareservacomponent.html',
})
export class Tarjetareservacomponent {
  @Input() reserva!: Reserva;
  @Input() cancelando = false;
  @Output() readonly cancelar = new EventEmitter<Reserva>();
  @Output() readonly invitar = new EventEmitter<Reserva>();

  readonly claseEstadoReserva = claseEstadoReserva;
  readonly textoEstadoReserva = textoEstadoReserva;
  readonly puedeCancelarReserva = puedeCancelarReserva;
  readonly puedeInvitarReserva = puedeInvitarReserva;
  readonly claseSpinner = claseSpinner;
}
