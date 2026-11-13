import { IMAGEN_RESPALDO, Opcion, iconoOpcion, textoOpcion } from './opcionmodel';
import { ReglaValidacion, estaVacio } from './validacionmodel';

export type TipoConjunto = 'APARTAMENTOS' | 'CASAS';

export interface Conjunto {
  id: number;
  nombre: string;
  tipo: TipoConjunto;
  direccion: string;
  municipio: string;
  latitud: number;
  longitud: number;
  descripcion: string;
  imagenUrl: string | null;
  totalUnidades: number;
  totalEspacios: number;
}

export interface DatosConjunto {
  nombre: string;
  tipo: TipoConjunto;
  direccion: string;
  municipio: string;
  latitud: number | null;
  longitud: number | null;
  descripcion: string;
  imagenUrl: string | null;
}

export const TIPOS_CONJUNTO: Opcion<TipoConjunto>[] = [
  { valor: 'APARTAMENTOS', texto: 'Apartamentos', icono: 'fa-building' },
  { valor: 'CASAS', texto: 'Casas', icono: 'fa-house-chimney' },
];

export const REGLAS_CONJUNTO: ReglaValidacion<DatosConjunto>[] = [
  { falla: (datos) => estaVacio(datos.nombre), mensaje: 'Escribe el nombre del conjunto.' },
  { falla: (datos) => estaVacio(datos.municipio), mensaje: 'Escribe el municipio.' },
  { falla: (datos) => estaVacio(datos.direccion), mensaje: 'Escribe la dirección.' },
  {
    falla: (datos) => datos.latitud === null || datos.longitud === null,
    mensaje: 'Marca la ubicación del conjunto en el mapa.',
  },
];

export const textoTipoConjunto = (tipo: TipoConjunto): string => textoOpcion(TIPOS_CONJUNTO, tipo);

export const iconoTipoConjunto = (tipo: TipoConjunto): string =>
  iconoOpcion(TIPOS_CONJUNTO, tipo, 'fa-building');

export const imagenConjunto = (conjunto: Conjunto): string => conjunto.imagenUrl || IMAGEN_RESPALDO;

export const textoAgrupacionConjunto = (tipo: TipoConjunto): string =>
  tipo === 'CASAS' ? 'Casas por manzana' : 'Apartamentos por torre';

export const datosDeConjunto = (conjunto: Conjunto): DatosConjunto => ({
  nombre: conjunto.nombre,
  tipo: conjunto.tipo,
  direccion: conjunto.direccion,
  municipio: conjunto.municipio,
  latitud: conjunto.latitud,
  longitud: conjunto.longitud,
  descripcion: conjunto.descripcion,
  imagenUrl: conjunto.imagenUrl,
});

export const limpiarDatosConjunto = (datos: DatosConjunto): DatosConjunto => ({
  ...datos,
  nombre: datos.nombre.trim(),
  direccion: datos.direccion.trim(),
  municipio: datos.municipio.trim(),
  descripcion: datos.descripcion.trim(),
  imagenUrl: datos.imagenUrl?.trim() || null,
});
