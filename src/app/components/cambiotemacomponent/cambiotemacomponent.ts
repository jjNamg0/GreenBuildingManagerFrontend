import { Component, signal } from '@angular/core';
import { Temaservice } from '../../services/temaservice';

@Component({
  selector: 'app-cambiotemacomponent',
  standalone: false,
  styleUrl: './cambiotemacomponent.css',
  templateUrl: './cambiotemacomponent.html',
})
export class Cambiotemacomponent {
  girando = signal(false);

  constructor(private temaService: Temaservice) {}

  esOscuro(): boolean {
    return this.temaService.esOscuro();
  }

  alternar(): void {
    this.temaService.alternar();
    this.girando.set(false);
    setTimeout(() => this.girando.set(true));
  }
}
