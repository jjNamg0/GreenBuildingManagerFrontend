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

export interface Coordenadas {
  latitud: number;
  longitud: number;
}
