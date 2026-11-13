import { Component, EventEmitter, Input, Output } from '@angular/core';

/** Controles de paginación reutilizables. */
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

  /** Devuelve los números de página a mostrar. */
  paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_valor, indice) => indice);
  }

  /** Indica si existe una página anterior. */
  hayAnterior(): boolean {
    return this.pagina > 0;
  }

  /** Indica si existe una página siguiente. */
  haySiguiente(): boolean {
    return this.pagina < this.totalPaginas - 1;
  }

  /** Cambia a la página indicada si es distinta de la actual. */
  ir(pagina: number): void {
    if (pagina !== this.pagina) {
      this.cambiar.emit(pagina);
    }
  }
}
