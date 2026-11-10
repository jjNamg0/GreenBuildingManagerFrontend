import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Eventoservice } from '../../services/eventoservice';
import { NuevoEvento } from '../../models/eventomodel';
import { DISENOS_INVITACION, DisenoInvitacion } from '../../models/opcionesmodel';

@Component({
  selector: 'app-selectorinvitacioncomponent',
  standalone: false,
  templateUrl: './selectorinvitacioncomponent.html',
  styleUrl: './selectorinvitacioncomponent.css',
})
export class Selectorinvitacioncomponent implements OnChanges {
  @Input() diseno = 'CLASICO';
  @Input() datos: NuevoEvento | null = null;
  @Input() mostrarVistaPrevia = false;
  @Output() disenoChange = new EventEmitter<string>();

  readonly disenos = DISENOS_INVITACION;

  vistaPrevia: SafeHtml | null = null;
  asunto = '';
  cargando = false;
  error = '';

  constructor(
    private eventoService: Eventoservice,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnChanges(cambios: SimpleChanges): void {
    if (cambios['mostrarVistaPrevia'] && this.mostrarVistaPrevia) {
      this.cargarVistaPrevia();
    }
  }

  escoger(diseno: DisenoInvitacion): void {
    if (diseno.valor === this.diseno) {
      return;
    }
    this.diseno = diseno.valor;
    this.disenoChange.emit(diseno.valor);
    if (this.mostrarVistaPrevia) {
      this.cargarVistaPrevia();
    }
  }

  alternarVistaPrevia(): void {
    this.mostrarVistaPrevia = !this.mostrarVistaPrevia;
    if (this.mostrarVistaPrevia) {
      this.cargarVistaPrevia();
    }
  }

  cargarVistaPrevia(): void {
    if (!this.datos) {
      return;
    }
    this.cargando = true;
    this.error = '';
    this.eventoService.vistaPreviaInvitacion({ ...this.datos, disenoInvitacion: this.diseno }).subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.asunto = resultado.datos.asunto;
      this.vistaPrevia = this.sanitizer.bypassSecurityTrustHtml(resultado.datos.html);
    });
  }
}
