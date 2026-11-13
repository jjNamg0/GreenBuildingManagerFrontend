import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Evento,
  estaProgramado,
  iconoTipoEvento,
  imagenPlantilla,
  insigniaEvento,
  textoAsistentes,
  textoLugarEvento,
  textoTipoEvento,
} from '../../models/eventomodel';
import { claseSpinner } from '../../models/opcionmodel';

/** Tarjeta con la información de un evento y el botón de asistencia. */
@Component({
  selector: 'app-tarjetaeventocomponent',
  standalone: false,
  styleUrl: './tarjetaeventocomponent.css',
  templateUrl: './tarjetaeventocomponent.html',
})
export class Tarjetaeventocomponent {
  @Input() evento!: Evento;
  @Input() motivo = '';
  @Input() procesando = false;
  @Input() permitirAsistencia = true;
  @Output() readonly alternarAsistencia = new EventEmitter<Evento>();

  readonly imagenPlantilla = imagenPlantilla;
  readonly textoTipoEvento = textoTipoEvento;
  readonly iconoTipoEvento = iconoTipoEvento;
  readonly insigniaEvento = insigniaEvento;
  readonly textoLugarEvento = textoLugarEvento;
  readonly textoAsistentes = textoAsistentes;
  readonly claseSpinner = claseSpinner;

  get estaCancelado(): boolean {
    return this.evento.estado === 'CANCELADO';
  }

  get motivoCancelacion(): string {
    return this.estaCancelado ? (this.evento.motivoCancelacion ?? '') : '';
  }

  get puedeMarcarAsistencia(): boolean {
    return this.permitirAsistencia && estaProgramado(this.evento);
  }

  get claseBotonAsistencia(): string {
    return this.evento.asistire ? 'btn-gb-borde w-100' : 'btn-gb w-100';
  }

  get iconoAsistencia(): string {
    return this.evento.asistire ? 'fa-xmark' : 'fa-hand';
  }

  get textoAsistencia(): string {
    return this.evento.asistire ? 'Ya no asistiré' : 'Asistiré';
  }
}
