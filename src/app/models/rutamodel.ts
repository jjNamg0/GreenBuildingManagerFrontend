import { Opcion } from './opcionmodel';

export type ModoRuta = 'CARRO' | 'CAMINANDO' | 'BICICLETA';

export interface ConsultaRuta {
  origenLatitud: number;
  origenLongitud: number;
  destinoLatitud: number;
  destinoLongitud: number;
  modo: ModoRuta;
}

export interface PasoRuta {
  instruccion: string;
  distanciaMetros: number;
  duracionSegundos: number;
}

export interface Ruta {
  distanciaMetros: number;
  duracionSegundos: number;
  puntos: [number, number][];
  pasos: PasoRuta[];
}

export const MODOS_RUTA: Opcion<ModoRuta>[] = [
  { valor: 'CARRO', texto: 'Carro', icono: 'fa-car-side' },
  { valor: 'CAMINANDO', texto: 'A pie', icono: 'fa-person-walking' },
  { valor: 'BICICLETA', texto: 'Bicicleta', icono: 'fa-bicycle' },
];
