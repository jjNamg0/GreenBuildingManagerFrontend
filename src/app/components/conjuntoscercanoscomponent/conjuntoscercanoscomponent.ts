import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conjunto } from '../../models/conjuntomodel';
import { RecomendacionConjunto } from '../../models/recomendacionmodel';

/** Lista de conjuntos cercanos a la ubicación del visitante. */
@Component({
  selector: 'app-conjuntoscercanoscomponent',
  standalone: false,
  styleUrl: './conjuntoscercanoscomponent.css',
  templateUrl: './conjuntoscercanoscomponent.html',
})
export class Conjuntoscercanoscomponent {
  @Input() cercanos: RecomendacionConjunto[] = [];
  @Output() readonly seleccionar = new EventEmitter<Conjunto>();
}
