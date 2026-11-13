import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuariomodel';
import { Authservice } from '../../services/authservice';
import { Sesionservice } from '../../services/sesionservice';
import { Toastservice } from '../../services/toastservice';

@Component({
  selector: 'app-navbarcomponent',
  standalone: false,
  styleUrl: './navbarcomponent.css',
  templateUrl: './navbarcomponent.html',
})
export class Navbarcomponent {
  menuAbierto = signal(false);

  constructor(
    private sesionService: Sesionservice,
    private authService: Authservice,
    private toastService: Toastservice,
    private router: Router,
  ) {}

  haySesion(): boolean {
    return this.sesionService.haySesion();
  }

  esAdmin(): boolean {
    return this.sesionService.esAdmin();
  }

  usuario(): Usuario | null {
    return this.sesionService.usuario();
  }

  nombreCompleto(): string {
    const usuario = this.usuario();
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Mi cuenta';
  }

  iniciales(): string {
    const usuario = this.usuario();
    if (!usuario) {
      return '';
    }
    return `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase();
  }

  alternarMenu(): void {
    this.menuAbierto.set(!this.menuAbierto());
  }

  abrirMenu(): void {
    this.menuAbierto.set(true);
  }

  cerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.cerrarMenu();
    this.toastService.mostrar('Cerraste sesión correctamente.', 'info');
    this.router.navigate(['/']);
  }
}
