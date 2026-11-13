import { Injectable, signal } from '@angular/core';
import { Tema } from '../models/temamodel';

/** Service que guarda y aplica el tema claro u oscuro. */
@Injectable({
  providedIn: 'root',
})
export class Temaservice {
  private readonly CLAVE_TEMA = 'greenbuilding-tema';

  tema = signal<Tema>('oscuro');

  /** Lee el tema guardado y lo aplica. */
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

  /** Indica si el tema actual es oscuro. */
  esOscuro(): boolean {
    return this.tema() === 'oscuro';
  }

  /** Cambia de tema y lo guarda. */
  alternar(): void {
    this.tema.set(this.esOscuro() ? 'claro' : 'oscuro');
    this.aplicar();
    try {
      localStorage.setItem(this.CLAVE_TEMA, this.tema());
    } catch {
      return;
    }
  }

  /** Aplica el tema al documento. */
  private aplicar(): void {
    document.documentElement.setAttribute('data-bs-theme', this.esOscuro() ? 'dark' : 'light');
  }
}
