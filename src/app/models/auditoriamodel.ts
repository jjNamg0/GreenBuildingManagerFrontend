export interface Auditoria {
  id: number;
  persona: string;
  email: string | null;
  accion: string;
  motivo: string;
  ubicacion: string;
  fecha: string;
  exitoso: boolean;
}

export interface FiltrosAuditoria {
  accion: string;
  email: string;
  exitoso: string;
  desde: string;
  hasta: string;
}

export interface PaginaAuditoria {
  contenido: Auditoria[];
  paginaActual: number;
  totalPaginas: number;
  totalElementos: number;
}
