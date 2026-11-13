import { Injectable, signal } from '@angular/core';
import { Tema } from '../models/temamodel';

@Injectable({
  providedIn: 'root',
})
export class Temaservice {
  private readonly CLAVE_TEMA = 'greenbuilding-tema';

  tema = signal<Tema>('oscuro');

  iniciar(): void {
    try {
      const guardado = localStorage.getItem(this.CLAVE_TEMA);
      if (guardado === 'claro' || guardado === 'oscuro') {
        this.tema.set(guardado);
      }
    } catch {
      this.tema.set('oscuro');
    }
    this.aplicar();
  }

  esOscuro(): boolean {
    return this.tema() === 'oscuro';
  }

  alternar(): void {
    this.tema.set(this.esOscuro() ? 'claro' : 'oscuro');
    this.aplicar();
    try {
      localStorage.setItem(this.CLAVE_TEMA, this.tema());
    } catch {
      return;
    }
  }

  private aplicar(): void {
    document.documentElement.setAttribute('data-bs-theme', this.esOscuro() ? 'dark' : 'light');
  }
}
