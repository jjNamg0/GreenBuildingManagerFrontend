import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-barralateralcomponent',
  standalone: false,
  templateUrl: './barralateralcomponent.html',
  styleUrl: './barralateralcomponent.css',
})
export class Barralateralcomponent {
  @Input() abierta = false;
  @Output() cerrar = new EventEmitter<void>();

  readonly enlaces = [
    {ruta: '/admin/mapa', icono: 'bi-map', texto: 'Mapa', exacto: false},
    {ruta: '/admin/conjuntos', icono: 'bi-buildings', texto: 'Conjuntos', exacto: false},
    {ruta: '/admin/usuarios', icono: 'bi-people', texto: 'Usuarios', exacto: false},
    {ruta: '/admin/reservas', icono: 'bi-calendar-check', texto: 'Reservas', exacto: false},
    {ruta: '/admin/eventos', icono: 'bi-megaphone', texto: 'Eventos', exacto: false},
    {ruta: '/admin/auditoria', icono: 'bi-shield-check', texto: 'Auditoría', exacto: false},
  ];
}
