import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footercomponent',
  standalone: false,
  templateUrl: './footercomponent.html',
  styleUrl: './footercomponent.css',
})
export class Footercomponent {
  constructor(private router: Router) {
  }

  get mostrar(): boolean {
    const ruta = this.router.url.split('?')[0];
    return !ruta.startsWith('/ubicacion/') && ruta !== '/admin/mapa';
  }
}
