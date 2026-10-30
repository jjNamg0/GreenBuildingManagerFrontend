export interface Reserva {
  id: number;
  comprobante: string;
  espacioId: number;
  espacioNombre: string;
  espacioTipo: string;
  conjuntoId: number;
  conjuntoNombre: string;
  unidadDescripcion: string;
  residenteNombre: string;
  residenteEmail: string;
  inicio: string;
  fin: string;
  personas: number;
  costo: number;
  estado: string;
  observaciones: string | null;
  motivoRespuesta: string | null;
  fechaCreacion: string;
}

export interface NuevaReserva {
  espacioId: number;
  inicio: string;
  fin: string;
  personas: number;
  observaciones: string;
}

export interface BloqueHorario {
  inicio: string;
  fin: string;
  ocupadas: number;
  libre: boolean;
  pasado: boolean;
}

export interface Disponibilidad {
  bloques: BloqueHorario[];
  horasInicio: string[];
  duraciones: number[];
  duracion: number;
  horaFin: string;
  cuposLibres: number;
  conflicto: string;
}

export interface ConsultaDisponibilidad {
  horaInicio: string;
  duracion: number;
  personas: number;
}

export interface FiltrosReservas {
  conjuntoId: number;
  estado: string;
  desde: string;
  hasta: string;
}

export interface PaginaReservas {
  contenido: Reserva[];
  paginaActual: number;
  totalPaginas: number;
  totalElementos: number;
  pendientes: number;
}
