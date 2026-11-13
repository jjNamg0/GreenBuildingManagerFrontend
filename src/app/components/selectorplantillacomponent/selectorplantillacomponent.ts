import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { PLANTILLAS_INVITACION, PlantillaInvitacion } from '../../models/eventomodel';
import { claseSpinner } from '../../models/opcionmodel';

/** Selector de la plantilla de invitación de un evento. */
@Component({
  selector: 'app-selectorplantillacomponent',
  standalone: false,
  styleUrl: './selectorplantillacomponent.css',
  templateUrl: './selectorplantillacomponent.html',
})
export class Selectorplantillacomponent {
  @Input() plantilla: PlantillaInvitacion = 'FIESTA';
  @Input() vistaPrevia: SafeHtml | null = null;
  @Input() cargando = false;
  @Input() error = '';
  @Output() readonly elegir = new EventEmitter<PlantillaInvitacion>();
  @Output() readonly generar = new EventEmitter<void>();

  readonly PLANTILLAS = PLANTILLAS_INVITACION;
  readonly claseSpinner = claseSpinner;
}
