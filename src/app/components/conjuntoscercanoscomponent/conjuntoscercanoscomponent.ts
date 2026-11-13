import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conjunto } from '../../models/conjuntomodel';
import { RecomendacionConjunto } from '../../models/recomendacionmodel';

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
