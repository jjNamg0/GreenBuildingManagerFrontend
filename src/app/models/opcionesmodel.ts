export interface Opcion {
  valor: string;
  etiqueta: string;
}

export const TIPOS_CONJUNTO: Opcion[] = [
  { valor: 'APARTAMENTOS', etiqueta: 'Apartamentos' },
  { valor: 'CASAS', etiqueta: 'Casas' },
];

export const MODOS_RESERVA: Opcion[] = [
  { valor: 'EXCLUSIVO', etiqueta: 'Exclusivo: una reserva a la vez' },
  { valor: 'POR_CUPO', etiqueta: 'Por cupo: varias personas hasta llenar el aforo' },
  { valor: 'NO_RESERVABLE', etiqueta: 'No se reserva, solo se muestra' },
];

export const TIPOS_ESPACIO: Opcion[] = [
  { valor: 'SALON_SOCIAL', etiqueta: 'Salón social' },
  { valor: 'ZONA_ASADOS', etiqueta: 'Zona de asados' },
  { valor: 'KIOSCO', etiqueta: 'Kiosco' },
  { valor: 'SALON_INFANTIL', etiqueta: 'Salón infantil o ludoteca' },
  { valor: 'SALA_REUNIONES', etiqueta: 'Sala de reuniones' },
  { valor: 'COWORKING', etiqueta: 'Coworking' },
  { valor: 'SALA_JUEGOS', etiqueta: 'Sala de juegos' },
  { valor: 'SALA_CINE', etiqueta: 'Sala de cine' },
  { valor: 'TERRAZA', etiqueta: 'Terraza social' },
  { valor: 'CANCHA_TENIS', etiqueta: 'Cancha de tenis, squash o pádel' },
  { valor: 'CANCHA_MULTIPLE', etiqueta: 'Cancha múltiple' },
  { valor: 'SALON_YOGA', etiqueta: 'Salón de yoga o spinning' },
  { valor: 'ASCENSOR_CARGA', etiqueta: 'Ascensor de carga o trasteos' },
  { valor: 'PARQUEADERO_VISITANTES', etiqueta: 'Parqueadero de visitantes' },
  { valor: 'LAVADO_CARROS', etiqueta: 'Zona de lavado de carros' },
  { valor: 'GIMNASIO', etiqueta: 'Gimnasio' },
  { valor: 'PISCINA', etiqueta: 'Piscina' },
  { valor: 'JACUZZI_TURCO', etiqueta: 'Jacuzzi, turco o sauna' },
  { valor: 'SALA_ESTUDIO', etiqueta: 'Sala de estudio o biblioteca' },
  { valor: 'PARQUE_INFANTIL', etiqueta: 'Parque infantil' },
  { valor: 'PARQUE_CANINO', etiqueta: 'Parque canino' },
  { valor: 'ZONA_VERDE', etiqueta: 'Zona verde' },
];

export const CATEGORIAS_EVENTO: Opcion[] = [
  { valor: 'RECREATIVO', etiqueta: 'Recreativo' },
  { valor: 'DEPORTIVO', etiqueta: 'Deportivo' },
  { valor: 'CULTURAL', etiqueta: 'Cultural' },
  { valor: 'ASAMBLEA', etiqueta: 'Asamblea' },
  { valor: 'OTRO', etiqueta: 'Otro' },
];

export interface DisenoInvitacion {
  valor: string;
  etiqueta: string;
  descripcion: string;
  fondo: string;
  acento: string;
  imagen: string;
}

export const DISENOS_INVITACION: DisenoInvitacion[] = [
  { valor: 'CLASICO', etiqueta: 'Clásico', descripcion: 'El conjunto de noche con la marca Green Building.', fondo: '#0f1412', acento: '#3dbe7a', imagen: 'assets/images/invitaciones/clasicoCabecera.png' },
  { valor: 'FIESTA', etiqueta: 'Fiesta', descripcion: 'Cartel con globos, confeti y la fecha como boleta.', fondo: '#fde7ef', acento: '#ff4f8b', imagen: 'assets/images/invitaciones/fiestaCabecera.png' },
  { valor: 'INFANTIL', etiqueta: 'Fiesta infantil', descripcion: 'Tarjeta de cumpleaños con torta, globos y edades.', fondo: '#fff8e7', acento: '#4d96ff', imagen: 'assets/images/invitaciones/infantilCabecera.png' },
  { valor: 'ELEGANTE', etiqueta: 'Elegante', descripcion: 'Tarjeta formal dorada con copas para brindar.', fondo: '#000000', acento: '#c9a227', imagen: 'assets/images/invitaciones/eleganteArriba.png' },
  { valor: 'DEPORTIVO', etiqueta: 'Deportivo', descripcion: 'Cartel de partido con estadio, trofeo y marcador.', fondo: '#061226', acento: '#b6f500', imagen: 'assets/images/invitaciones/deportivoCabecera.png' },
  { valor: 'ASAMBLEA', etiqueta: 'Comunicado oficial', descripcion: 'Carta formal con sello y orden del día.', fondo: '#eef1f6', acento: '#1f3864', imagen: 'assets/images/invitaciones/asambleaSello.png' },
];

export function disenoSugerido(categoria: string, fiestaNinos: boolean): string {
  if (fiestaNinos) {
    return 'INFANTIL';
  }
  const porCategoria: Record<string, string> = {
    RECREATIVO: 'FIESTA',
    DEPORTIVO: 'DEPORTIVO',
    CULTURAL: 'ELEGANTE',
    ASAMBLEA: 'ASAMBLEA',
  };
  return porCategoria[categoria] ?? 'CLASICO';
}

export const MUNICIPIOS: string[] = [
  'Bogotá D.C.', 'Agua de Dios', 'Albán', 'Anapoima', 'Anolaima', 'Apulo', 'Arbeláez', 'Beltrán', 'Bituima',
  'Bojacá', 'Cabrera', 'Cachipay', 'Cajicá', 'Caparrapí', 'Cáqueza', 'Carmen de Carupa', 'Chaguaní', 'Chía',
  'Chipaque', 'Choachí', 'Chocontá', 'Cogua', 'Cota', 'Cucunubá', 'El Colegio', 'El Peñón', 'El Rosal',
  'Facatativá', 'Fómeque', 'Fosca', 'Funza', 'Fúquene', 'Fusagasugá', 'Gachalá', 'Gachancipá', 'Gachetá',
  'Gama', 'Girardot', 'Granada', 'Guachetá', 'Guaduas', 'Guasca', 'Guataquí', 'Guatavita', 'Guayabal de Síquima',
  'Guayabetal', 'Gutiérrez', 'Jerusalén', 'Junín', 'La Calera', 'La Mesa', 'La Palma', 'La Peña', 'La Vega',
  'Lenguazaque', 'Machetá', 'Madrid', 'Manta', 'Medina', 'Mosquera', 'Nariño', 'Nemocón', 'Nilo', 'Nimaima',
  'Nocaima', 'Pacho', 'Paime', 'Pandi', 'Paratebueno', 'Pasca', 'Puerto Salgar', 'Pulí', 'Quebradanegra',
  'Quetame', 'Quipile', 'Ricaurte', 'San Antonio del Tequendama', 'San Bernardo', 'San Cayetano', 'San Francisco',
  'San Juan de Rioseco', 'Sasaima', 'Sesquilé', 'Sibaté', 'Silvania', 'Simijaca', 'Soacha', 'Sopó', 'Subachoque',
  'Suesca', 'Supatá', 'Susa', 'Sutatausa', 'Tabio', 'Tausa', 'Tena', 'Tenjo', 'Tibacuy', 'Tibirita', 'Tocaima',
  'Tocancipá', 'Topaipí', 'Ubalá', 'Ubaque', 'Ubaté', 'Une', 'Útica', 'Venecia', 'Vergara', 'Vianí',
  'Villagómez', 'Villapinzón', 'Villeta', 'Viotá', 'Yacopí', 'Zipacón', 'Zipaquirá',
];

export function etiquetaDe(opciones: Opcion[], valor: string | null | undefined): string {
  const opcion = opciones.find((o) => o.valor === valor);
  return opcion ? opcion.etiqueta : (valor ?? '');
}
