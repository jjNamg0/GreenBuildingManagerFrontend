import { Component } from '@angular/core';
import { TipoToast } from '../../models/toastmodel';
import { Toastservice } from '../../services/toastservice';

@Component({
  selector: 'app-toastcomponent',
  standalone: false,
  styleUrl: './toastcomponent.css',
  templateUrl: './toastcomponent.html',
})
export class Toastcomponent {
  constructor(private toastService: Toastservice) {}

  mensaje(): string {
    return this.toastService.mensaje();
  }

  tipo(): TipoToast {
    return this.toastService.tipo();
  }

  cerrar(): void {
    this.toastService.cerrar();
  }
}
