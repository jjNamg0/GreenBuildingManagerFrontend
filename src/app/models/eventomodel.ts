import { IMAGEN_RESPALDO, Insignia, Opcion, iconoOpcion, textoOpcion } from './opcionmodel';
import { ReglaValidacion, estaVacio } from './validacionmodel';

export type TipoEvento = 'FIESTA' | 'INFANTIL' | 'DEPORTIVO' | 'CULTURAL' | 'ASAMBLEA' | 'OTRO';

export type EstadoEvento = 'PROGRAMADO' | 'CANCELADO' | 'FINALIZADO';

export type PlantillaInvitacion =
  'CLASICO' | 'ELEGANTE' | 'FIESTA' | 'INFANTIL' | 'DEPORTIVO' | 'ASAMBLEA';

export interface Evento {
  id: number;
  conjuntoId: number;
  conjuntoNombre: string;
  espacioId: number | null;
  espacioNombre: string | null;
  titulo: string;
  descripcion: string;
  tipo: TipoEvento;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  paraNinos: boolean;
  cupoMaximo: number | null;
  totalAsistentes: number;
  asistire: boolean;
  estado: EstadoEvento;
  motivoCancelacion: string | null;
  plantilla: PlantillaInvitacion;
}

export interface DatosEvento {
  conjuntoId: number | null;
  espacioId: number | null;
  titulo: string;
  descripcion: string;
  tipo: TipoEvento;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  paraNinos: boolean;
  cupoMaximo: number | null;
  plantilla: PlantillaInvitacion;
}

export interface FiltrosEvento {
  tipo: TipoEvento | '';
  paraNinos: boolean;
}

export interface DatosCancelacion {
  motivo: string;
}

export interface OpcionPlantilla extends Opcion<PlantillaInvitacion> {
  imagen: string;
}

export const TIPOS_EVENTO: Opcion<TipoEvento>[] = [
  { valor: 'FIESTA', texto: 'Fiesta', icono: 'fa-champagne-glasses' },
  { valor: 'INFANTIL', texto: 'Infantil', icono: 'fa-children' },
  { valor: 'DEPORTIVO', texto: 'Deportivo', icono: 'fa-futbol' },
  { valor: 'CULTURAL', texto: 'Cultural', icono: 'fa-masks-theater' },
  { valor: 'ASAMBLEA', texto: 'Asamblea', icono: 'fa-people-group' },
  { valor: 'OTRO', texto: 'Otro', icono: 'fa-calendar-day' },
];

export const PLANTILLAS_INVITACION: OpcionPlantilla[] = [
  { valor: 'CLASICO', texto: 'Clásico', imagen: 'assets/images/invitaciones/clasicoCabecera.png' },
  { valor: 'ELEGANTE', texto: 'Elegante', imagen: 'assets/images/invitaciones/eleganteArriba.png' },
  { valor: 'FIESTA', texto: 'Fiesta', imagen: 'assets/images/invitaciones/fiestaCabecera.png' },
  {
    valor: 'INFANTIL',
    texto: 'Infantil',
    imagen: 'assets/images/invitaciones/infantilCabecera.png',
  },
  {
    valor: 'DEPORTIVO',
    texto: 'Deportivo',
    imagen: 'assets/images/invitaciones/deportivoCabecera.png',
  },
  { valor: 'ASAMBLEA', texto: 'Asamblea', imagen: 'assets/images/invitaciones/asambleaSello.png' },
];

export const DATOS_EVENTO_VACIO: DatosEvento = {
  conjuntoId: null,
  espacioId: null,
  titulo: '',
  descripcion: '',
  tipo: 'FIESTA',
  fecha: '',
  horaInicio: '18:00',
  horaFin: '22:00',
  paraNinos: false,
  cupoMaximo: null,
  plantilla: 'FIESTA',
};

const TEXTOS_ESTADO_EVENTO: Record<EstadoEvento, string> = {
  PROGRAMADO: 'Programado',
  CANCELADO: 'Cancelado',
  FINALIZADO: 'Finalizado',
};

const CLASES_ESTADO_EVENTO: Record<EstadoEvento, string> = {
  PROGRAMADO: 'exito',
  CANCELADO: 'peligro',
  FINALIZADO: 'neutro',
};

const INSIGNIAS_EVENTO: Record<EstadoEvento, Insignia | null> = {
  PROGRAMADO: null,
  CANCELADO: { texto: 'Cancelado', clase: 'peligro punto', icono: '' },
  FINALIZADO: { texto: 'Finalizado', clase: 'neutro', icono: '' },
};

const INSIGNIA_ASISTIRE: Insignia = { texto: 'Asistirás', clase: 'exito', icono: 'fa-check' };

export const REGLAS_EVENTO: ReglaValidacion<DatosEvento>[] = [
  {
    falla: (datos) => datos.conjuntoId === null,
    mensaje: 'Elige el conjunto donde será el evento.',
  },
  { falla: (datos) => estaVacio(datos.titulo), mensaje: 'Escribe el título del evento.' },
  {
    falla: (datos) => estaVacio(datos.fecha) || estaVacio(datos.horaInicio),
    mensaje: 'Indica la fecha y la hora de inicio.',
  },
  { falla: (datos) => estaVacio(datos.horaFin), mensaje: 'Indica la hora en que termina.' },
];

/** Devuelve el texto del tipo de evento. */
export const textoTipoEvento = (tipo: TipoEvento): string => textoOpcion(TIPOS_EVENTO, tipo);

/** Devuelve el ícono del tipo de evento. */
export const iconoTipoEvento = (tipo: TipoEvento): string =>
  iconoOpcion(TIPOS_EVENTO, tipo, 'fa-calendar-day');

/** Busca la plantilla de invitación que corresponde a un tipo de evento. */
export const buscarPlantilla = (tipo: TipoEvento): PlantillaInvitacion | undefined =>
  PLANTILLAS_INVITACION.find((opcion) => opcion.valor === tipo)?.valor;

/** Devuelve la imagen de una plantilla de invitación. */
export const imagenPlantilla = (plantilla: PlantillaInvitacion): string =>
  PLANTILLAS_INVITACION.find((opcion) => opcion.valor === plantilla)?.imagen ?? IMAGEN_RESPALDO;

/** Devuelve el texto del estado del evento. */
export const textoEstadoEvento = (estado: EstadoEvento): string => TEXTOS_ESTADO_EVENTO[estado];

/** Devuelve la clase de estilo del estado del evento. */
export const claseEstadoEvento = (estado: EstadoEvento): string => CLASES_ESTADO_EVENTO[estado];

/** Indica si el evento está programado. */
export const estaProgramado = (evento: Evento): boolean => evento.estado === 'PROGRAMADO';

/** Devuelve la insignia del evento según su estado. */
export const insigniaEvento = (evento: Evento): Insignia | null =>
  estaProgramado(evento) && evento.asistire ? INSIGNIA_ASISTIRE : INSIGNIAS_EVENTO[evento.estado];

/** Devuelve el texto de asistentes y cupo del evento. */
export const textoAsistentes = (evento: Evento): string =>
  evento.cupoMaximo
    ? `${evento.totalAsistentes} de ${evento.cupoMaximo}`
    : `${evento.totalAsistentes}`;

/** Devuelve el lugar del evento: el espacio o las zonas comunes. */
export const textoLugarEvento = (evento: Evento): string => evento.espacioNombre ?? 'Zonas comunes';

/** Convierte un evento en los datos del formulario. */
export const datosDeEvento = (evento: Evento): DatosEvento => ({
  conjuntoId: evento.conjuntoId,
  espacioId: evento.espacioId,
  titulo: evento.titulo,
  descripcion: evento.descripcion,
  tipo: evento.tipo,
  fecha: evento.fecha,
  horaInicio: evento.horaInicio,
  horaFin: evento.horaFin,
  paraNinos: evento.paraNinos,
  cupoMaximo: evento.cupoMaximo,
  plantilla: evento.plantilla,
});

/** Quita los espacios sobrantes de los datos del evento. */
export const limpiarDatosEvento = (datos: DatosEvento): DatosEvento => ({
  ...datos,
  titulo: datos.titulo.trim(),
  descripcion: datos.descripcion.trim(),
});

/** Devuelve el mensaje de confirmación o cancelación de la asistencia. */
export const mensajeAsistencia = (evento: Evento): string =>
  evento.asistire ? 'Quitamos tu asistencia.' : '¡Listo! Te esperamos en el evento.';
