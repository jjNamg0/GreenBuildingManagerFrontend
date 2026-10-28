export interface Espacio {
  id: number;
  conjuntoId: number;
  nombre: string;
  tipo: string;
  modoReserva: string;
  capacidad: number;
  horaApertura: string;
  horaCierre: string;
  duracionMinimaMinutos: number;
  duracionMaximaMinutos: number;
  anticipacionMaximaDias: number;
  requiereAprobacion: boolean;
  costo: number;
  edadMinima: number;
  reglas: string | null;
  imagen: string | null;
  enMantenimiento: boolean;
  activo: boolean;
}
