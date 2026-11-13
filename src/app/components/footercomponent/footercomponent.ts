import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footercomponent',
  standalone: false,
  styleUrl: './footercomponent.css',
  templateUrl: './footercomponent.html',
})
export class Footercomponent {
  readonly ANIO = new Date().getFullYear();

  constructor(private router: Router) {}

  mostrar(): boolean {
    return !this.router.url.startsWith('/mapa');
  }
}
