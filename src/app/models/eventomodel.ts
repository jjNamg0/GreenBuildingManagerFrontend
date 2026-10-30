import { Espacio } from './espaciomodel';

export interface Evento {
  id: number;
  conjuntoId: number;
  conjuntoNombre: string;
  espacioId: number;
  espacioNombre: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  inicio: string;
  fin: string;
  fiestaNinos: boolean;
  edadMinima: number | null;
  edadMaxima: number | null;
  imagen: string | null;
  estado: string;
  motivoCancelacion: string | null;
  disenoInvitacion: string;
}

export interface NuevoEvento {
  conjuntoId: number;
  espacioId: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  inicio: string;
  fin: string;
  fiestaNinos: boolean;
  edadMinima: number | null;
  edadMaxima: number | null;
  imagen: string;
  disenoInvitacion: string;
  enviarInvitacion: boolean;
}

export interface VistaPreviaInvitacion {
  asunto: string;
  html: string;
}

export interface RespuestaInvitacion {
  mensaje: string;
  enviados: number;
  evento: Evento;
}

export interface EspacioRecomendado {
  espacio: Espacio;
  razon: string;
}

export interface EventoRecomendado {
  evento: Evento;
  razon: string;
}

export interface Recomendaciones {
  espacios: EspacioRecomendado[];
  eventos: EventoRecomendado[];
}
