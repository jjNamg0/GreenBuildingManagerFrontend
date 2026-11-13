import { Component, Input } from '@angular/core';
import {
  Espacio,
  iconoNoReservable,
  iconoTipoEspacio,
  imagenEspacio,
  sePuedeReservar,
  textoNoReservable,
  textoTipoEspacio,
} from '../../models/espaciomodel';

@Component({
  selector: 'app-tarjetaespaciocomponent',
  standalone: false,
  styleUrl: './tarjetaespaciocomponent.css',
  templateUrl: './tarjetaespaciocomponent.html',
})
export class Tarjetaespaciocomponent {
  @Input() espacio!: Espacio;
  @Input() motivo = '';
  @Input() mostrarReserva = true;

  readonly textoTipoEspacio = textoTipoEspacio;
  readonly iconoTipoEspacio = iconoTipoEspacio;
  readonly imagenEspacio = imagenEspacio;
  readonly sePuedeReservar = sePuedeReservar;
  readonly textoNoReservable = textoNoReservable;
  readonly iconoNoReservable = iconoNoReservable;
}
