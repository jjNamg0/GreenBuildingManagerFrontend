import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Insignia } from '../../models/opcionmodel';
import {
  Usuario,
  claseEstadoUsuario,
  esAdministrador,
  iconoCambioEstado,
  insigniaRol,
  nombreCompleto,
  textoAccionEstado,
  textoEstadoUsuario,
  textoSolicitudUsuario,
} from '../../models/usuariomodel';

@Component({
  selector: '[app-filausuariocomponent]',
  standalone: false,
  styleUrl: './filausuariocomponent.css',
  templateUrl: './filausuariocomponent.html',
})
export class Filausuariocomponent {
  @Input() usuario!: Usuario;
  @Output() readonly asignar = new EventEmitter<Usuario>();
  @Output() readonly cambiarEstado = new EventEmitter<Usuario>();
  @Output() readonly eliminar = new EventEmitter<Usuario>();

  readonly nombreCompleto = nombreCompleto;
  readonly textoEstadoUsuario = textoEstadoUsuario;
  readonly claseEstadoUsuario = claseEstadoUsuario;
  readonly iconoCambioEstado = iconoCambioEstado;
  readonly textoAccionEstado = textoAccionEstado;

  get esAdmin(): boolean {
    return esAdministrador(this.usuario);
  }

  get insignia(): Insignia {
    return insigniaRol(this.usuario.role);
  }

  get sinUnidad(): boolean {
    return !this.esAdmin && this.usuario.unidadId === null;
  }

  get textoConjunto(): string {
    return this.esAdmin ? '—' : (this.usuario.conjuntoNombre ?? 'Sin conjunto');
  }

  get textoUnidad(): string {
    if (this.esAdmin) {
      return '';
    }
    return this.usuario.unidadDescripcion ?? textoSolicitudUsuario(this.usuario);
  }

  get textoBotonAsignar(): string {
    return this.usuario.unidadId === null ? 'Asignar' : 'Cambiar';
  }
}
