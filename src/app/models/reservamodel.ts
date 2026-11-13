import { Opcion } from './opcionmodel';
import { ReglaValidacion, estaVacio } from './validacionmodel';

export type EstadoReserva = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA' | 'CANCELADA';

export interface Reserva {
  id: number;
  espacioId: number;
  espacioNombre: string;
  conjuntoNombre: string;
  usuarioId: number;
  usuarioNombre: string;
  unidadDescripcion: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  motivo: string;
  asistentes: number;
  estado: EstadoReserva;
  observacion: string | null;
  fechaCreacion: string;
}

export interface DatosReserva {
  espacioId: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  motivo: string;
  asistentes: number | null;
}

export interface FranjaHoraria {
  horaInicio: string;
  horaFin: string;
  disponible: boolean;
}

export interface DatosObservacion {
  observacion: string;
}

export const ESTADOS_RESERVA: Opcion<EstadoReserva | ''>[] = [
  { valor: '', texto: 'Todas' },
  { valor: 'PENDIENTE', texto: 'Pendientes' },
  { valor: 'APROBADA', texto: 'Aprobadas' },
  { valor: 'RECHAZADA', texto: 'Rechazadas' },
  { valor: 'CANCELADA', texto: 'Canceladas' },
];

const TEXTOS_ESTADO_RESERVA: Record<EstadoReserva, string> = {
  PENDIENTE: 'Pendiente',
  APROBADA: 'Aprobada',
  RECHAZADA: 'Rechazada',
  CANCELADA: 'Cancelada',
};

const CLASES_ESTADO_RESERVA: Record<EstadoReserva, string> = {
  PENDIENTE: 'pendiente',
  APROBADA: 'exito',
  RECHAZADA: 'peligro',
  CANCELADA: 'neutro',
};

export const REGLAS_RESERVA: ReglaValidacion<DatosReserva>[] = [
  {
    falla: (datos) => estaVacio(datos.horaInicio),
    mensaje: 'Elige al menos una franja horaria libre.',
  },
  { falla: (datos) => estaVacio(datos.motivo), mensaje: 'Cuéntanos el motivo de la reserva.' },
];

export const textoEstadoReserva = (estado: EstadoReserva): string => TEXTOS_ESTADO_RESERVA[estado];

export const claseEstadoReserva = (estado: EstadoReserva): string => CLASES_ESTADO_RESERVA[estado];

export const puedeCancelarReserva = (reserva: Reserva): boolean =>
  reserva.estado === 'PENDIENTE' || reserva.estado === 'APROBADA';

export const estaPendiente = (reserva: Reserva): boolean => reserva.estado === 'PENDIENTE';

export const fechaIso = (fecha: Date): string => {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
};

export const proximosDias = (cantidad: number): string[] => {
  const hoy = new Date();
  return Array.from({ length: cantidad }, (_valor, indice) =>
    fechaIso(new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + indice)),
  );
};
