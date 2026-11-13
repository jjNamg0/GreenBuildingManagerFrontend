import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conjunto, imagenConjunto, textoTipoConjunto } from '../../models/conjuntomodel';
import { claseSpinner } from '../../models/opcionmodel';
import { MODOS_RUTA, ModoRuta, Ruta } from '../../models/rutamodel';

@Component({
  selector: 'app-rutacomponent',
  standalone: false,
  styleUrl: './rutacomponent.css',
  templateUrl: './rutacomponent.html',
})
export class Rutacomponent {
  @Input() conjunto!: Conjunto;
  @Input() ruta: Ruta | null = null;
  @Input() modo: ModoRuta = 'CARRO';
  @Input() calculando = false;
  @Input() error = '';
  @Input() siguiendo = false;
  @Output() readonly cerrar = new EventEmitter<void>();
  @Output() readonly cambiarModo = new EventEmitter<ModoRuta>();
  @Output() readonly comoLlegar = new EventEmitter<void>();
  @Output() readonly alternarSeguimiento = new EventEmitter<void>();

  readonly MODOS = MODOS_RUTA;
  readonly textoTipoConjunto = textoTipoConjunto;
  readonly imagenConjunto = imagenConjunto;
  readonly claseSpinner = claseSpinner;

  get textoBotonRuta(): string {
    return this.ruta ? 'Recalcular ruta' : 'Trazar ruta desde mi ubicación';
  }

  get iconoSeguimiento(): string {
    return this.siguiendo ? 'fa-pause' : 'fa-location-arrow';
  }

  get textoSeguimiento(): string {
    return this.siguiendo ? 'Dejar de seguir mi ubicación' : 'Seguir mi ubicación en el mapa';
  }
}
