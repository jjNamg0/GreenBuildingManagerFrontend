import { Opcion, textoOpcion } from './opcionmodel';

export interface RegistroAuditoria {
  id: number;
  username: string;
  nombreUsuario: string;
  role: string;
  fecha: string;
  accion: string;
  entidad: string;
  motivo: string;
  ubicacion: string;
  latitud: number | null;
  longitud: number | null;
  ip: string;
}

export interface FiltrosAuditoria {
  usuario: string;
  accion: string;
  desde: string;
  hasta: string;
  pagina: number;
  tamano: number;
}

export const TAMANO_PAGINA_AUDITORIA = 20;

export const FILTROS_AUDITORIA_VACIOS: FiltrosAuditoria = {
  usuario: '',
  accion: '',
  desde: '',
  hasta: '',
  pagina: 0,
  tamano: TAMANO_PAGINA_AUDITORIA,
};

export const ACCIONES_AUDITORIA: Opcion[] = [
  { valor: '', texto: 'Todas las acciones' },
  { valor: 'LOGIN', texto: 'Inicio de sesión' },
  { valor: 'REGISTRO', texto: 'Registro' },
  { valor: 'VERIFICACION', texto: 'Verificación de correo' },
  { valor: 'RESTABLECER_PASSWORD', texto: 'Restablecer contraseña' },
  { valor: 'CREAR', texto: 'Creación' },
  { valor: 'ACTUALIZAR', texto: 'Actualización' },
  { valor: 'ELIMINAR', texto: 'Eliminación' },
  { valor: 'RESERVA', texto: 'Reservas' },
  { valor: 'EVENTO', texto: 'Eventos' },
];

const CLASES_ACCION: Record<string, string> = {
  ELIMINAR: 'peligro',
  CREAR: 'exito',
  REGISTRO: 'exito',
  LOGIN: 'info',
  VERIFICACION: 'info',
};

/** Devuelve el texto en español de una acción de auditoría. */
export const textoAccion = (accion: string): string => textoOpcion(ACCIONES_AUDITORIA, accion);

/** Devuelve la clase de estilo de una acción de auditoría. */
export const claseAccion = (accion: string): string => CLASES_ACCION[accion] ?? 'neutro';

/** Indica si el registro trae latitud y longitud. */
export const tieneCoordenadas = (registro: RegistroAuditoria): boolean =>
  registro.latitud !== null && registro.longitud !== null;

/** Arma el enlace al mapa con las coordenadas del registro. */
export const enlaceMapaAuditoria = (registro: RegistroAuditoria): string =>
  `https://www.openstreetmap.org/?mlat=${registro.latitud}&mlon=${registro.longitud}#map=17/${registro.latitud}/${registro.longitud}`;
