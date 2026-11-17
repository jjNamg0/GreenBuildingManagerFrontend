import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Evento,
  claseEstadoEvento,
  estaProgramado,
  iconoTipoEvento,
  textoAsistentes,
  textoEstadoEvento,
  textoLugarEvento,
  textoTipoEvento,
} from '../../models/eventomodel';

/** Fila de la tabla de eventos del administrador con sus acciones. */
@Component({
  selector: '[app-filaeventoadmincomponent]',
  standalone: false,
  styleUrl: './filaeventoadmincomponent.css',
  templateUrl: './filaeventoadmincomponent.html',
})
export class Filaeventoadmincomponent {
  @Input() evento!: Evento;
  @Output() readonly invitar = new EventEmitter<Evento>();
  @Output() readonly editar = new EventEmitter<Evento>();
  @Output() readonly cancelar = new EventEmitter<Evento>();
  @Output() readonly eliminar = new EventEmitter<Evento>();

  readonly textoTipoEvento = textoTipoEvento;
  readonly iconoTipoEvento = iconoTipoEvento;
  readonly textoEstadoEvento = textoEstadoEvento;
  readonly claseEstadoEvento = claseEstadoEvento;
  readonly textoAsistentes = textoAsistentes;
  readonly textoLugarEvento = textoLugarEvento;
  readonly estaProgramado = estaProgramado;
}
