export interface Conjunto {
  id: number;
  nombre: string;
  tipo: string;
  direccion: string;
  municipio: string;
  telefono: string | null;
  descripcion: string | null;
  latitud: number | null;
  longitud: number | null;
  imagen: string | null;
  activo: boolean;
}

export interface ConjuntoOpcion {
  id: number;
  nombre: string;
  tipo: string;
  municipio: string;
}
