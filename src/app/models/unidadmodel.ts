import { Opcion, textoOpcion } from './opcionmodel';
import { ReglaValidacion, estaVacio } from './validacionmodel';

export type TipoUnidad = 'APARTAMENTO' | 'CASA';

export interface Unidad {
  id: number;
  conjuntoId: number;
  tipo: TipoUnidad;
  agrupacion: string;
  numero: string;
  descripcion: string;
  residentes: string[];
}

export interface DatosUnidad {
  conjuntoId: number;
  tipo: TipoUnidad;
  agrupacion: string;
  numero: string;
}

export const TIPOS_UNIDAD: Opcion<TipoUnidad>[] = [
  { valor: 'APARTAMENTO', texto: 'Apartamento', icono: 'fa-building' },
  { valor: 'CASA', texto: 'Casa', icono: 'fa-house' },
];

export const REGLAS_UNIDAD: ReglaValidacion<DatosUnidad>[] = [
  {
    falla: (datos) => estaVacio(datos.agrupacion) || estaVacio(datos.numero),
    mensaje: 'Completa la torre o manzana y el número.',
  },
];

export const textoTipoUnidad = (tipo: TipoUnidad): string => textoOpcion(TIPOS_UNIDAD, tipo);

export const etiquetaAgrupacion = (tipo: TipoUnidad): string =>
  tipo === 'CASA' ? 'Manzana o etapa' : 'Torre o bloque';

export const ejemploAgrupacion = (tipo: TipoUnidad): string =>
  tipo === 'CASA' ? 'Manzana B' : 'Torre 2';

export const ejemploNumero = (tipo: TipoUnidad): string => (tipo === 'CASA' ? '14' : '301');

export const textoResidentes = (unidad: Unidad): string =>
  unidad.residentes.length > 0 ? unidad.residentes.join(', ') : 'Desocupada';

export const textoOpcionUnidad = (unidad: Unidad): string =>
  unidad.residentes.length > 0
    ? `${unidad.descripcion} · ${unidad.residentes.length} residente(s)`
    : unidad.descripcion;

export const limpiarDatosUnidad = (datos: DatosUnidad): DatosUnidad => ({
  ...datos,
  agrupacion: datos.agrupacion.trim(),
  numero: datos.numero.trim(),
});
