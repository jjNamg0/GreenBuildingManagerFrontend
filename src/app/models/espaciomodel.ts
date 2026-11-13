import { IMAGEN_RESPALDO, Opcion, iconoOpcion, textoOpcion } from './opcionmodel';
import { ReglaValidacion, estaVacio } from './validacionmodel';

export type TipoEspacio =
  | 'SALON_SOCIAL'
  | 'PARQUE'
  | 'PISCINA'
  | 'GIMNASIO'
  | 'BBQ'
  | 'CANCHA'
  | 'ZONA_INFANTIL'
  | 'ZONA_HUMEDA'
  | 'OTRO';

export interface Espacio {
  id: number;
  conjuntoId: number;
  nombre: string;
  tipo: TipoEspacio;
  descripcion: string;
  capacidad: number;
  horaApertura: string;
  horaCierre: string;
  requiereReserva: boolean;
  disponible: boolean;
  imagenUrl: string | null;
}

export interface DatosEspacio {
  conjuntoId: number;
  nombre: string;
  tipo: TipoEspacio;
  descripcion: string;
  capacidad: number | null;
  horaApertura: string;
  horaCierre: string;
  requiereReserva: boolean;
  disponible: boolean;
  imagenUrl: string | null;
}

export const TIPOS_ESPACIO: Opcion<TipoEspacio>[] = [
  { valor: 'SALON_SOCIAL', texto: 'Salón social', icono: 'fa-champagne-glasses' },
  { valor: 'PARQUE', texto: 'Parque', icono: 'fa-tree' },
  { valor: 'PISCINA', texto: 'Piscina', icono: 'fa-person-swimming' },
  { valor: 'GIMNASIO', texto: 'Gimnasio', icono: 'fa-dumbbell' },
  { valor: 'BBQ', texto: 'Zona BBQ', icono: 'fa-fire-burner' },
  { valor: 'CANCHA', texto: 'Cancha', icono: 'fa-futbol' },
  { valor: 'ZONA_INFANTIL', texto: 'Zona infantil', icono: 'fa-children' },
  { valor: 'ZONA_HUMEDA', texto: 'Zona húmeda', icono: 'fa-hot-tub-person' },
  { valor: 'OTRO', texto: 'Otro', icono: 'fa-shapes' },
];

export const DATOS_ESPACIO_VACIO: DatosEspacio = {
  conjuntoId: 0,
  nombre: '',
  tipo: 'SALON_SOCIAL',
  descripcion: '',
  capacidad: null,
  horaApertura: '08:00',
  horaCierre: '22:00',
  requiereReserva: true,
  disponible: true,
  imagenUrl: null,
};

export const REGLAS_ESPACIO: ReglaValidacion<DatosEspacio>[] = [
  { falla: (datos) => estaVacio(datos.nombre), mensaje: 'Escribe el nombre del espacio.' },
  {
    falla: (datos) => (datos.capacidad ?? 0) < 1,
    mensaje: 'La capacidad debe ser de al menos 1 persona.',
  },
  {
    falla: (datos) => estaVacio(datos.horaApertura) || estaVacio(datos.horaCierre),
    mensaje: 'Indica el horario de apertura y cierre.',
  },
];

export const textoTipoEspacio = (tipo: TipoEspacio): string => textoOpcion(TIPOS_ESPACIO, tipo);

export const iconoTipoEspacio = (tipo: TipoEspacio): string =>
  iconoOpcion(TIPOS_ESPACIO, tipo, 'fa-shapes');

export const imagenEspacio = (espacio: Espacio): string => espacio.imagenUrl || IMAGEN_RESPALDO;

export const textoUsoEspacio = (espacio: Espacio): string =>
  espacio.requiereReserva ? 'Con reserva' : 'Uso libre';

export const textoEstadoEspacio = (espacio: Espacio): string =>
  espacio.disponible ? 'Disponible' : 'Mantenimiento';

export const claseEstadoEspacio = (espacio: Espacio): string =>
  espacio.disponible ? 'exito' : 'pendiente';

export const sePuedeReservar = (espacio: Espacio): boolean =>
  espacio.disponible && espacio.requiereReserva;

export const textoNoReservable = (espacio: Espacio): string =>
  espacio.disponible ? 'Uso libre, no necesita reserva' : 'No disponible por ahora';

export const iconoNoReservable = (espacio: Espacio): string =>
  espacio.disponible ? 'fa-door-open' : 'fa-ban';

export const datosDeEspacio = (espacio: Espacio): DatosEspacio => ({
  conjuntoId: espacio.conjuntoId,
  nombre: espacio.nombre,
  tipo: espacio.tipo,
  descripcion: espacio.descripcion,
  capacidad: espacio.capacidad,
  horaApertura: espacio.horaApertura,
  horaCierre: espacio.horaCierre,
  requiereReserva: espacio.requiereReserva,
  disponible: espacio.disponible,
  imagenUrl: espacio.imagenUrl,
});

export const limpiarDatosEspacio = (datos: DatosEspacio): DatosEspacio => ({
  ...datos,
  nombre: datos.nombre.trim(),
  descripcion: datos.descripcion.trim(),
  imagenUrl: datos.imagenUrl?.trim() || null,
});
