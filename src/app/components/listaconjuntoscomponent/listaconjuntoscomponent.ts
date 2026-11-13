import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Conjunto,
  TIPOS_CONJUNTO,
  iconoTipoConjunto,
  textoTipoConjunto,
} from '../../models/conjuntomodel';
import { RecomendacionConjunto } from '../../models/recomendacionmodel';

/** Lista de conjuntos con búsqueda y filtro por tipo. */
@Component({
  selector: 'app-listaconjuntoscomponent',
  standalone: false,
  styleUrl: './listaconjuntoscomponent.css',
  templateUrl: './listaconjuntoscomponent.html',
})
export class Listaconjuntoscomponent {
  @Input() conjuntos: Conjunto[] = [];
  @Input() cercanos: RecomendacionConjunto[] = [];
  @Input() cargando = false;
  @Input() error = '';
  @Input() haySesion = false;
  @Input() busqueda = '';
  @Input() tipo = '';
  @Output() readonly busquedaChange = new EventEmitter<string>();
  @Output() readonly tipoChange = new EventEmitter<string>();
  @Output() readonly buscar = new EventEmitter<void>();
  @Output() readonly limpiar = new EventEmitter<void>();
  @Output() readonly seleccionar = new EventEmitter<Conjunto>();

  readonly TIPOS = TIPOS_CONJUNTO;
  readonly textoTipoConjunto = textoTipoConjunto;
  readonly iconoTipoConjunto = iconoTipoConjunto;

  get mensajeVisitante(): string {
    return this.haySesion
      ? ''
      : 'No necesitas cuenta para ver la ruta. Si vives en uno de estos conjuntos, crea tu cuenta.';
  }

  get errorVisible(): string {
    return this.cargando ? '' : this.error;
  }

  get sinResultados(): boolean {
    return !this.cargando && this.error === '' && this.conjuntos.length === 0;
  }

  get hayResultados(): boolean {
    return !this.cargando && this.conjuntos.length > 0;
  }

  /** Actualiza el texto de búsqueda y se lo notifica al padre. */
  cambiarBusqueda(valor: string): void {
    this.busqueda = valor;
    this.busquedaChange.emit(valor);
  }

  /** Actualiza el tipo elegido y se lo notifica al padre. */
  cambiarTipo(valor: string): void {
    this.tipo = valor;
    this.tipoChange.emit(valor);
    this.buscar.emit();
  }
}
