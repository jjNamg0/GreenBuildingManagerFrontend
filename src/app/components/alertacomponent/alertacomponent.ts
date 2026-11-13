import { Component, EventEmitter, Input, Output } from '@angular/core';

/** Aviso reutilizable con mensaje, tipo, ícono y botón de acción opcional. */
@Component({
  selector: 'app-alertacomponent',
  standalone: false,
  styleUrl: './alertacomponent.css',
  templateUrl: './alertacomponent.html',
})
export class Alertacomponent {
  @Input() mensaje: string | null = '';
  @Input() tipo = 'peligro';
  @Input() icono = 'fa-circle-exclamation';
  @Input() clases = '';
  @Input() textoAccion = '';
  @Output() readonly accion = new EventEmitter<void>();
}
