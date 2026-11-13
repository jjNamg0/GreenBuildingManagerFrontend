import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacioncomponent',
  standalone: false,
  styleUrl: './paginacioncomponent.css',
  templateUrl: './paginacioncomponent.html',
})
export class Paginacioncomponent {
  @Input() pagina = 0;
  @Input() totalPaginas = 0;
  @Input() totalElementos = 0;
  @Input() bloqueado = false;
  @Output() readonly cambiar = new EventEmitter<number>();

  paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_valor, indice) => indice);
  }

  hayAnterior(): boolean {
    return this.pagina > 0;
  }

  haySiguiente(): boolean {
    return this.pagina < this.totalPaginas - 1;
  }

  ir(pagina: number): void {
    if (pagina !== this.pagina) {
      this.cambiar.emit(pagina);
    }
  }
}
