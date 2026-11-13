import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FranjaHoraria } from '../../models/reservamodel';

/** Calendario de franjas horarias donde el residente elige la hora de inicio y de fin. */
@Component({
  selector: 'app-calendarioreservacomponent',
  standalone: false,
  styleUrl: './calendarioreservacomponent.css',
  templateUrl: './calendarioreservacomponent.html',
})
export class Calendarioreservacomponent {
  @Input() dias: string[] = [];
  @Input() fecha = '';
  @Input() hoy = '';
  @Input() franjas: FranjaHoraria[] = [];
  @Input() cargando = false;
  @Input() error = '';
  @Input() inicio: number | null = null;
  @Input() fin: number | null = null;
  @Output() readonly elegirFecha = new EventEmitter<string>();
  @Output() readonly elegirFranja = new EventEmitter<number>();

  get sinFranjas(): boolean {
    return !this.cargando && this.error === '' && this.franjas.length === 0;
  }

  /** Indica si la franja está dentro del rango elegido. */
  estaElegida(indice: number): boolean {
    if (this.inicio === null) {
      return false;
    }
    return indice >= this.inicio && indice <= (this.fin ?? this.inicio);
  }

  /** Devuelve la clase de estilo de la franja: elegida, libre u ocupada. */
  claseFranja(franja: FranjaHoraria, indice: number): string {
    if (this.estaElegida(indice)) {
      return 'elegido';
    }
    return franja.disponible ? 'libre' : 'ocupado';
  }
}
