import { Component, Input } from '@angular/core';
import {
  RegistroAuditoria,
  claseAccion,
  enlaceMapaAuditoria,
  textoAccion,
  tieneCoordenadas,
} from '../../models/auditoriamodel';

/** Fila de la tabla de auditoría. */
@Component({
  selector: '[app-filaauditoriacomponent]',
  standalone: false,
  styleUrl: './filaauditoriacomponent.css',
  templateUrl: './filaauditoriacomponent.html',
})
export class Filaauditoriacomponent {
  @Input() registro!: RegistroAuditoria;

  readonly textoAccion = textoAccion;
  readonly claseAccion = claseAccion;
  readonly tieneCoordenadas = tieneCoordenadas;
  readonly enlaceMapaAuditoria = enlaceMapaAuditoria;
}
