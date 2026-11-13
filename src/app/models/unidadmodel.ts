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

/** Devuelve el texto del tipo de unidad. */
export const textoTipoUnidad = (tipo: TipoUnidad): string => textoOpcion(TIPOS_UNIDAD, tipo);

/** Devuelve la etiqueta del campo de agrupación según el tipo de unidad. */
export const etiquetaAgrupacion = (tipo: TipoUnidad): string =>
  tipo === 'CASA' ? 'Manzana o etapa' : 'Torre o bloque';

/** Devuelve un ejemplo de agrupación según el tipo de unidad. */
export const ejemploAgrupacion = (tipo: TipoUnidad): string =>
  tipo === 'CASA' ? 'Manzana B' : 'Torre 2';

/** Devuelve un ejemplo de número según el tipo de unidad. */
export const ejemploNumero = (tipo: TipoUnidad): string => (tipo === 'CASA' ? '14' : '301');

/** Devuelve el texto con los residentes de la unidad. */
export const textoResidentes = (unidad: Unidad): string =>
  unidad.residentes.length > 0 ? unidad.residentes.join(', ') : 'Desocupada';

/** Devuelve el texto de la unidad para un selector. */
export const textoOpcionUnidad = (unidad: Unidad): string =>
  unidad.residentes.length > 0
    ? `${unidad.descripcion} · ${unidad.residentes.length} residente(s)`
    : unidad.descripcion;

/** Quita los espacios sobrantes de los datos de la unidad. */
export const limpiarDatosUnidad = (datos: DatosUnidad): DatosUnidad => ({
  ...datos,
  agrupacion: datos.agrupacion.trim(),
  numero: datos.numero.trim(),
});
