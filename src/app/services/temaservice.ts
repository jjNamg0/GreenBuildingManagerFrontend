import { Injectable } from '@angular/core';

export type Tema = 'claro' | 'oscuro';

@Injectable({ providedIn: 'root' })
export class Temaservice {
  private readonly CLAVE_TEMA = 'greenbuilding-tema';
  private _tema: Tema = 'oscuro';

  constructor() {
    try {
      const guardado = localStorage.getItem(this.CLAVE_TEMA);
      if (guardado === 'claro' || guardado === 'oscuro') {
        this._tema = guardado;
      }
    } catch {
      this._tema = 'oscuro';
    }
    this.aplicar();
  }

  get tema(): Tema {
    return this._tema;
  }

  get esOscuro(): boolean {
    return this._tema === 'oscuro';
  }

  alternar(): void {
    this._tema = this.esOscuro ? 'claro' : 'oscuro';
    this.aplicar();
    try {
      localStorage.setItem(this.CLAVE_TEMA, this._tema);
    } catch {
      return;
    }
  }

  private aplicar(): void {
    document.documentElement.setAttribute('data-bs-theme', this.esOscuro ? 'dark' : 'light');
  }
}
