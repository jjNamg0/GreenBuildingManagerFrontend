import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuariomodel';
import { Authservice } from '../../services/authservice';
import { Sesionservice } from '../../services/sesionservice';
import { Toastservice } from '../../services/toastservice';

/** Barra de navegación superior con el menú, la cuenta y el cierre de sesión. */
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

  /** Indica si hay una sesión iniciada. */
  haySesion(): boolean {
    return this.sesionService.haySesion();
  }

  /** Indica si el usuario es administrador. */
  esAdmin(): boolean {
    return this.sesionService.esAdmin();
  }

  /** Devuelve el usuario con la sesión iniciada o null. */
  usuario(): Usuario | null {
    return this.sesionService.usuario();
  }

  /** Devuelve el nombre completo o "Mi cuenta" si no hay usuario. */
  nombreCompleto(): string {
    const usuario = this.usuario();
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Mi cuenta';
  }

  /** Devuelve las iniciales del usuario en mayúscula. */
  iniciales(): string {
    const usuario = this.usuario();
    if (!usuario) {
      return '';
    }
    return `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase();
  }

  /** Abre o cierra el menú. */
  alternarMenu(): void {
    this.menuAbierto.set(!this.menuAbierto());
  }

  /** Abre el menú. */
  abrirMenu(): void {
    this.menuAbierto.set(true);
  }

  /** Cierra el menú. */
  cerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  /** Cierra la sesión del usuario. */
  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.cerrarMenu();
    this.toastService.mostrar('Cerraste sesión correctamente.', 'info');
    this.router.navigate(['/']);
  }
}
