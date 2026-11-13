import { Component } from '@angular/core';
import { TipoToast } from '../../models/toastmodel';
import { Toastservice } from '../../services/toastservice';

/** Aviso emergente temporal. */
@Component({
  selector: 'app-toastcomponent',
  standalone: false,
  styleUrl: './toastcomponent.css',
  templateUrl: './toastcomponent.html',
})
export class Toastcomponent {
  constructor(private toastService: Toastservice) {}

  /** Devuelve el mensaje del aviso actual. */
  mensaje(): string {
    return this.toastService.mensaje();
  }

  /** Devuelve el tipo del aviso actual. */
  tipo(): TipoToast {
    return this.toastService.tipo();
  }

  /** Cierra el aviso. */
  cerrar(): void {
    this.toastService.cerrar();
  }
}
