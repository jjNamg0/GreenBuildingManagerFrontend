import { Conjunto } from './conjuntomodel';
import { Espacio } from './espaciomodel';
import { Evento } from './eventomodel';
import { Opcion } from './opcionmodel';

export interface RecomendacionEvento {
  evento: Evento;
  puntaje: number;
  motivo: string;
}

export interface RecomendacionEspacio {
  espacio: Espacio;
  puntaje: number;
  motivo: string;
}

export interface RecomendacionConjunto {
  conjunto: Conjunto;
  distanciaKm: number;
  motivo: string;
}

export const INTERESES: Opcion[] = [
  { valor: 'FIESTAS', texto: 'Fiestas', icono: 'fa-champagne-glasses' },
  { valor: 'NINOS', texto: 'Planes para niños', icono: 'fa-children' },
  { valor: 'DEPORTE', texto: 'Deporte', icono: 'fa-futbol' },
  { valor: 'CULTURA', texto: 'Cultura', icono: 'fa-masks-theater' },
  { valor: 'ASAMBLEAS', texto: 'Asambleas', icono: 'fa-people-group' },
  { valor: 'PISCINA', texto: 'Piscina', icono: 'fa-person-swimming' },
  { valor: 'GIMNASIO', texto: 'Gimnasio', icono: 'fa-dumbbell' },
  { valor: 'BBQ', texto: 'Asados', icono: 'fa-fire-burner' },
  { valor: 'NATURALEZA', texto: 'Parques y naturaleza', icono: 'fa-tree' },
  { valor: 'MASCOTAS', texto: 'Mascotas', icono: 'fa-paw' },
];
