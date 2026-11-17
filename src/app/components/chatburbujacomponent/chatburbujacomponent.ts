import { Component, Input } from '@angular/core';
import { MensajeChat } from '../../models/chatmodel';

/**
 * Burbuja de un mensaje del chat: a la derecha si lo escribió el usuario, a la izquierda si fue el
 * asistente.
 */
@Component({
  selector: 'app-chatburbujacomponent',
  standalone: false,
  styleUrl: './chatburbujacomponent.css',
  templateUrl: './chatburbujacomponent.html',
})
export class Chatburbujacomponent {
  @Input() mensaje!: MensajeChat;

  get esUsuario(): boolean {
    return this.mensaje.rol === 'user';
  }
}
