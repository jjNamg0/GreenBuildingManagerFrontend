import { Component, Input } from '@angular/core';

/** Mensaje que se muestra cuando una lista no tiene elementos. */
@Component({
  selector: 'app-vaciocomponent',
  standalone: false,
  styleUrl: './vaciocomponent.css',
  templateUrl: './vaciocomponent.html',
})
export class Vaciocomponent {
  @Input() visible = false;
  @Input() icono = 'fa-inbox';
  @Input() titulo = '';
  @Input() texto = '';
  @Input() grande = false;
  @Input() enTarjeta = false;
}
