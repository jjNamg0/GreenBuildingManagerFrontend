import { Component, ElementRef, ViewChild, effect, signal } from '@angular/core';
import {
  BIENVENIDA_CHAT,
  MAX_CARACTERES_CHAT,
  MAX_HISTORIAL_CHAT,
  MENSAJE_ERROR_CHAT,
  MensajeChat,
  RespuestaChat,
} from '../../models/chatmodel';
import { claseSpinner } from '../../models/opcionmodel';
import { Errorservice } from '../../services/errorservice';
import { Iaservice } from '../../services/iaservice';
import { Sesionservice } from '../../services/sesionservice';

/**
 * Chat de ayuda en la esquina inferior derecha: un botón que abre un panel pequeño para preguntarle
 * al asistente.
 */
@Component({
  selector: 'app-chatiacomponent',
  standalone: false,
  styleUrl: './chatiacomponent.css',
  templateUrl: './chatiacomponent.html',
})
export class Chatiacomponent {
  readonly claseSpinner = claseSpinner;
  readonly bienvenida = BIENVENIDA_CHAT;
  readonly maxCaracteres = MAX_CARACTERES_CHAT;

  @ViewChild('lista') lista?: ElementRef<HTMLElement>;
  @ViewChild('campo') campo?: ElementRef<HTMLInputElement>;

  abierto = signal(false);
  mensajes = signal<MensajeChat[]>([]);
  cargando = signal(false);
  error = signal('');
  texto = '';

  constructor(
    private sesionService: Sesionservice,
    private iaService: Iaservice,
    private errorService: Errorservice,
  ) {
    effect(() => {
      if (!this.sesionService.token()) {
        this.reiniciar();
      }
    });
  }

  /** Indica si hay una sesión iniciada: el chat solo aparece con sesión. */
  haySesion(): boolean {
    return this.sesionService.haySesion();
  }

  /** Abre o cierra el panel del chat. */
  alternar(): void {
    this.abierto.update((abierto) => !abierto);
    if (this.abierto()) {
      this.enfocarCampo();
      this.desplazarAlFinal();
    }
  }

  /** Cierra el panel del chat. */
  cerrar(): void {
    this.abierto.set(false);
  }

  /** Envía la pregunta con los últimos mensajes y espera la respuesta del asistente. */
  enviar(): void {
    const texto = this.texto.trim();
    if (!texto || this.cargando()) {
      return;
    }
    const historial = this.mensajes().slice(-MAX_HISTORIAL_CHAT);
    this.agregar({ rol: 'user', contenido: texto });
    this.texto = '';
    this.error.set('');
    this.cargando.set(true);
    this.iaService.preguntar({ mensaje: texto, historial }).subscribe({
      next: (respuesta) => this.recibir(respuesta),
      error: (error: unknown) => this.fallar(error),
    });
  }

  /** Muestra la respuesta del asistente. */
  private recibir(respuesta: RespuestaChat): void {
    this.cargando.set(false);
    this.agregar({ rol: 'assistant', contenido: respuesta.respuesta });
    this.enfocarCampo();
  }

  /** Muestra el motivo por el que el asistente no pudo responder. */
  private fallar(error: unknown): void {
    this.cargando.set(false);
    this.error.set(this.errorService.obtenerMensaje(error, MENSAJE_ERROR_CHAT));
    this.desplazarAlFinal();
    this.enfocarCampo();
  }

  /** Agrega un mensaje al final de la conversación. */
  private agregar(mensaje: MensajeChat): void {
    this.mensajes.update((mensajes) => [...mensajes, mensaje]);
    this.desplazarAlFinal();
  }

  /** Borra la conversación cuando se cierra la sesión. */
  private reiniciar(): void {
    this.abierto.set(false);
    this.mensajes.set([]);
    this.cargando.set(false);
    this.error.set('');
    this.texto = '';
  }

  /** Baja la lista de mensajes hasta el último. */
  private desplazarAlFinal(): void {
    setTimeout(() => {
      const lista = this.lista?.nativeElement;
      if (lista) {
        lista.scrollTop = lista.scrollHeight;
      }
    });
  }

  /** Pone el cursor en el campo de la pregunta. */
  private enfocarCampo(): void {
    setTimeout(() => this.campo?.nativeElement.focus());
  }
}
