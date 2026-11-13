import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FranjaHoraria } from '../../models/reservamodel';

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

  estaElegida(indice: number): boolean {
    if (this.inicio === null) {
      return false;
    }
    return indice >= this.inicio && indice <= (this.fin ?? this.inicio);
  }

  claseFranja(franja: FranjaHoraria, indice: number): string {
    if (this.estaElegida(indice)) {
      return 'elegido';
    }
    return franja.disponible ? 'libre' : 'ocupado';
  }
}
