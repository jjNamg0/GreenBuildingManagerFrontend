import { Conjunto } from './conjuntomodel';
import { Espacio } from './espaciomodel';
import { Unidad } from './unidadmodel';

export interface MiConjunto {
  unidad: Unidad;
  conjunto: Conjunto;
  espacios: Espacio[];
}
