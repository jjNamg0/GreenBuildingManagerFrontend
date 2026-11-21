import { HttpErrorResponse } from '@angular/common/http';
import { Evento, PlantillaInvitacion, imagenPlantilla } from './eventomodel';
import { Reserva } from './reservamodel';
import { esCorreoValido } from './validacionmodel';

export type TipoInvitacion = 'EVENTO' | 'RESERVA';

export type EstadoInvitacion = 'VIGENTE' | 'CANCELADO' | 'FINALIZADO';

export interface Invitacion {
  tipo: TipoInvitacion;
  titulo: string;
  descripcion: string | null;
  anfitrion: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  plantilla: PlantillaInvitacion;
  estado: EstadoInvitacion;
  motivoCancelacion: string | null;
  conjuntoId: number;
  conjuntoNombre: string;
  direccion: string;
  municipio: string;
  latitud: number;
  longitud: number;
  espacioNombre: string | null;
}

export interface DatosCorreosInvitacion {
  correos: string[];
}

export interface Invitado {
  correo: string;
  fechaEnvio: string;
}

export interface DestinoInvitacion {
  tipo: TipoInvitacion;
  id: number;
  titulo: string;
}

export const MAX_CORREOS_INVITACION = 30;

const NO_ENCONTRADO = 404;

const MENSAJE_INVITACION_NO_ENCONTRADA =
  'Esta invitación no existe o el enlace está incompleto. Pídele a quien te invitó que te lo envíe de nuevo.';

const AVISOS_ESTADO: Record<EstadoInvitacion, string> = {
  VIGENTE: '',
  CANCELADO: 'Este plan fue cancelado.',
  FINALIZADO: 'Este plan ya terminó.',
};

/** Separa el texto escrito en correos, sin espacios, en minúscula y sin repetidos. */
export const separarCorreos = (texto: string): string[] =>
  texto
    .split(/[\s,;]+/)
    .map((correo) => correo.trim().toLowerCase())
    .filter((correo, posicion, lista) => correo !== '' && lista.indexOf(correo) === posicion);

/** Devuelve los correos sin formato válido o de un dominio que no está permitido. */
export const correosInvalidos = (correos: string[]): string[] =>
  correos.filter((correo) => !esCorreoValido(correo));

/** Revisa la lista de correos y devuelve el error, o vacío si está bien. */
export const errorCorreos = (correos: string[]): string => {
  const invalidos = correosInvalidos(correos);
  if (correos.length === 0) {
    return 'Escribe al menos un correo.';
  }
  if (correos.length > MAX_CORREOS_INVITACION) {
    return `Puedes invitar hasta ${MAX_CORREOS_INVITACION} correos por envío.`;
  }
  return invalidos.length > 0 ? `Estos correos no son válidos: ${invalidos.join(', ')}` : '';
};

/** Devuelve el mensaje cuando no se puede abrir una invitación. */
export const mensajeErrorInvitacion = (error: unknown, porDefecto: string): string =>
  error instanceof HttpErrorResponse && error.status === NO_ENCONTRADO
    ? MENSAJE_INVITACION_NO_ENCONTRADA
    : porDefecto;

/** Arma el enlace para compartir la invitación por WhatsApp. */
export const enlaceWhatsapp = (destino: DestinoInvitacion, enlace: string): string =>
  `https://wa.me/?text=${encodeURIComponent(`Te invito a ${destino.titulo}: ${enlace}`)}`;

/** Devuelve el aviso de una invitación cancelada o terminada, o vacío si sigue vigente. */
export const avisoEstadoInvitacion = (invitacion: Invitacion): string =>
  invitacion.estado === 'CANCELADO' && invitacion.motivoCancelacion
    ? `${AVISOS_ESTADO.CANCELADO} Motivo: ${invitacion.motivoCancelacion}`
    : AVISOS_ESTADO[invitacion.estado];

/** Arma el destino de la invitación a un evento. */
export const destinoEvento = (evento: Evento): DestinoInvitacion => ({
  tipo: 'EVENTO',
  id: evento.id,
  titulo: evento.titulo,
});

/** Arma el destino de la invitación a una reserva. */
export const destinoReserva = (reserva: Reserva): DestinoInvitacion => ({
  tipo: 'RESERVA',
  id: reserva.id,
  titulo: reserva.motivo,
});

/** Devuelve la imagen de cabecera de la invitación. */
export const imagenInvitacion = (invitacion: Invitacion): string =>
  imagenPlantilla(invitacion.plantilla);

/** Devuelve el texto del lugar de la invitación. */
export const lugarInvitacion = (invitacion: Invitacion): string =>
  invitacion.espacioNombre
    ? `${invitacion.espacioNombre} · ${invitacion.conjuntoNombre}`
    : invitacion.conjuntoNombre;
