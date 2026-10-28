import {Component} from '@angular/core';
import {Temaservice} from '../../services/temaservice';

@Component({
  selector: 'app-cambiotemacomponent',
  standalone: false,
  templateUrl: './cambiotemacomponent.html',
  styleUrl: './cambiotemacomponent.css',
})
export class Cambiotemacomponent {
  girando = false;

  constructor(public tema: Temaservice) {
  }

  alternar(): void {
    this.girando = true;
    this.tema.alternar();
    setTimeout(() => (this.girando = false), 400);
  }
}
