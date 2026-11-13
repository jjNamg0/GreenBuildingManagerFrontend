export type Anillo = [number, number][];

export interface GeometriaContorno {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: Anillo[] | Anillo[][];
}

export interface ContornoGeografico {
  type: 'FeatureCollection';
  features: { geometry: GeometriaContorno }[];
}
