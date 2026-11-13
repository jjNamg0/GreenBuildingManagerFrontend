import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EnlaceMenu } from '../../models/menumodel';

/** Menú lateral del panel de administración. */
@Component({
  selector: 'app-barralateralcomponent',
  standalone: false,
  styleUrl: './barralateralcomponent.css',
  templateUrl: './barralateralcomponent.html',
})
export class Barralateralcomponent {
  @Input() abierta = false;
  @Output() readonly cerrar = new EventEmitter<void>();

  readonly ENLACES_OPERACION: EnlaceMenu[] = [
    { texto: 'Inicio', ruta: '/admin', icono: 'fa-gauge-high', exacto: true },
    { texto: 'Conjuntos', ruta: '/admin/conjuntos', icono: 'fa-city', exacto: false },
    { texto: 'Usuarios', ruta: '/admin/usuarios', icono: 'fa-users', exacto: false },
    { texto: 'Eventos', ruta: '/admin/eventos', icono: 'fa-calendar-days', exacto: false },
    { texto: 'Reservas', ruta: '/admin/reservas', icono: 'fa-calendar-check', exacto: false },
  ];

  readonly ENLACES_CONTROL: EnlaceMenu[] = [
    { texto: 'Auditoría', ruta: '/admin/auditoria', icono: 'fa-clipboard-list', exacto: false },
    { texto: 'Mapa', ruta: '/mapa', icono: 'fa-map-location-dot', exacto: false },
    { texto: 'Mi perfil', ruta: '/perfil', icono: 'fa-user-gear', exacto: false },
  ];
}
