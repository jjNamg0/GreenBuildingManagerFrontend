export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  activo: boolean;
  verificado: boolean;
  unidadId: number | null;
  unidadDescripcion: string | null;
  conjuntoId: number | null;
  conjuntoNombre: string | null;
  conjuntoSolicitadoId: number | null;
  conjuntoSolicitadoNombre: string | null;
}
