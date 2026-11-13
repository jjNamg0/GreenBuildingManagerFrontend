import { Component, signal } from '@angular/core';
import { Temaservice } from '../../services/temaservice';

/** Botón para alternar entre el tema oscuro y el claro. */
@Component({
  selector: 'app-cambiotemacomponent',
  standalone: false,
  styleUrl: './cambiotemacomponent.css',
  templateUrl: './cambiotemacomponent.html',
})
export class Cambiotemacomponent {
  girando = signal(false);

  constructor(private temaService: Temaservice) {}

  /** Indica si el tema actual es oscuro. */
  esOscuro(): boolean {
    return this.temaService.esOscuro();
  }

  /** Cambia al otro tema. */
  alternar(): void {
    this.temaService.alternar();
    this.girando.set(false);
    setTimeout(() => this.girando.set(true));
  }
}
