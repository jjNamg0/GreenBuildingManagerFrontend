import { DivIcon, LatLngTuple, OpcionesTeselas, leaflet } from './leafletmodel';

export const LIMITES_CUNDINAMARCA: LatLngTuple[] = [
  [3.7, -74.9],
  [5.85, -73.0],
];

export const CENTRO_CUNDINAMARCA: LatLngTuple = [4.75, -74.1];

export const AZUL_RUTA = '#4c9aff';

export const URL_TESELAS = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export const OPCIONES_TESELAS: OpcionesTeselas = {
  maxZoom: 19,
  className: 'capa-oscura',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
};

export const MUNDO: LatLngTuple[] = [
  [85, -180],
  [85, 180],
  [-85, 180],
  [-85, -180],
];

const TAMANO_MARCADOR = 34;
const TAMANO_MARCADOR_ELEGIDO = 42;

/** Crea el ícono de un marcador de conjunto, más grande si está elegido. */
export const crearIconoMarcador = (elegido: boolean): DivIcon => {
  const tamano = elegido ? TAMANO_MARCADOR_ELEGIDO : TAMANO_MARCADOR;
  const clase = elegido ? 'gb-marcador seleccionado' : 'gb-marcador';
  return leaflet().divIcon({
    className: '',
    html: `<i class="fa-solid fa-location-dot ${clase}"></i>`,
    iconSize: [tamano, tamano],
    iconAnchor: [tamano / 2, tamano],
    tooltipAnchor: [tamano / 2, -tamano / 2],
  });
};
