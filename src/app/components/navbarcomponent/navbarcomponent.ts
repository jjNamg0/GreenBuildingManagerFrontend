import { Component } from '@angular/core';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-navbarcomponent',
  standalone: false,
  templateUrl: './navbarcomponent.html',
  styleUrl: './navbarcomponent.css',
})
export class Navbarcomponent {
  menuAbierto = false;

  constructor(public auth: Authservice) {}

  get iniciales(): string {
    const usuario = this.auth.usuario;
    return usuario ? `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase() : '';
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  logout(): void {
    this.cerrarMenu();
    this.auth.logout();
  }
}
