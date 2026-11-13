import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** Pie de página de la aplicación. */
@Component({
  selector: 'app-footercomponent',
  standalone: false,
  styleUrl: './footercomponent.css',
  templateUrl: './footercomponent.html',
})
export class Footercomponent {
  readonly ANIO = new Date().getFullYear();

  constructor(private router: Router) {}

  /** Indica si se muestra el pie de página; se oculta en la página del mapa. */
  mostrar(): boolean {
    return !this.router.url.startsWith('/mapa');
  }
}
