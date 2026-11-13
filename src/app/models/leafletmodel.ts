export type LatLngTuple = [number, number];

export type Punto = [number, number];

export interface EventoClicMapa {
  latlng: { lat: number; lng: number };
}

export interface OpcionesMapa {
  zoomControl?: boolean;
}

export interface OpcionesTeselas {
  maxZoom: number;
  className: string;
  attribution: string;
}

export interface OpcionesIcono {
  className: string;
  html: string;
  iconSize: Punto;
  iconAnchor: Punto;
  tooltipAnchor: Punto;
}

export interface DivIcon {
  options: OpcionesIcono;
}

export interface OpcionesMarcador {
  icon: DivIcon;
  title?: string;
}

export interface OpcionesTooltip {
  className: string;
  permanent?: boolean;
  direction?: string;
}

export interface OpcionesTrazo {
  color?: string;
  weight?: number;
  opacity?: number;
  fill?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  stroke?: boolean;
  interactive?: boolean;
  className?: string;
  radius?: number;
}

export interface OpcionesAjuste {
  padding: Punto;
}

export interface LatLngBounds {
  pad: (proporcion: number) => LatLngBounds;
}

export interface Capa {
  addTo: (destino: MapaLeaflet | LayerGroup) => this;
  remove: () => this;
}

export interface LayerGroup extends Capa {
  clearLayers: () => this;
}

export interface Marker extends Capa {
  setLatLng: (posicion: LatLngTuple) => this;
  bindTooltip: (texto: string, opciones: OpcionesTooltip) => this;
  on: (evento: 'click', accion: () => void) => this;
}

export type CircleMarker = Marker;

export interface Polyline extends Capa {
  getBounds: () => LatLngBounds;
}

export interface MapaLeaflet {
  setView: (centro: LatLngTuple, zoom: number) => this;
  panTo: (centro: LatLngTuple) => this;
  fitBounds: (limites: LatLngTuple[] | LatLngBounds, opciones?: OpcionesAjuste) => this;
  setMaxBounds: (limites: LatLngBounds) => this;
  setMinZoom: (zoom: number) => this;
  getZoom: () => number;
  zoomIn: () => this;
  zoomOut: () => this;
  invalidateSize: () => this;
  on: (evento: 'click', accion: (evento: EventoClicMapa) => void) => this;
  remove: () => this;
}

export interface Leaflet {
  map: (contenedor: HTMLElement, opciones?: OpcionesMapa) => MapaLeaflet;
  tileLayer: (url: string, opciones: OpcionesTeselas) => Capa;
  marker: (posicion: LatLngTuple, opciones: OpcionesMarcador) => Marker;
  circleMarker: (posicion: LatLngTuple, opciones: OpcionesTrazo) => CircleMarker;
  divIcon: (opciones: OpcionesIcono) => DivIcon;
  layerGroup: () => LayerGroup;
  polygon: (anillos: LatLngTuple[][], opciones: OpcionesTrazo) => Capa;
  polyline: (puntos: LatLngTuple[], opciones: OpcionesTrazo) => Polyline;
  latLngBounds: (puntos: LatLngTuple[]) => LatLngBounds;
}

/** Devuelve la librería Leaflet cargada por CDN, ya tipada. */
export const leaflet = (): Leaflet => (globalThis as unknown as Record<string, Leaflet>)['L'];
