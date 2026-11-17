export type RolChat = 'user' | 'assistant';

export interface MensajeChat {
  rol: RolChat;
  contenido: string;
}

export interface DatosChat {
  mensaje: string;
  historial: MensajeChat[];
}

export interface RespuestaChat {
  respuesta: string;
}

export const MAX_CARACTERES_CHAT = 500;

export const MAX_HISTORIAL_CHAT = 6;

export const MENSAJE_ERROR_CHAT = 'El asistente no está disponible. Intenta más tarde.';

export const BIENVENIDA_CHAT: MensajeChat = {
  rol: 'assistant',
  contenido:
    '¡Hola! Soy el asistente de Green Building. Pregúntame cómo reservar, ver eventos o encontrar tu conjunto.',
};
