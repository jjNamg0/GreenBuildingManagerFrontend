import { Rol } from './authmodel';
import { OpcionesConfirmacion } from './confirmacionmodel';
import { Insignia, Opcion } from './opcionmodel';
import { MENSAJE_PASSWORD, ReglaValidacion, esPasswordInsegura, estaVacio } from './validacionmodel';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  telefono: string;
  role: Rol;
  verificado: boolean;
  activo: boolean;
  conjuntoId: number | null;
  conjuntoNombre: string | null;
  unidadId: number | null;
  unidadDescripcion: string | null;
  unidadSolicitada: string | null;
  intereses: string[];
}

export interface DatosPerfil {
  nombre: string;
  apellido: string;
  telefono: string;
}

export interface DatosCambioPassword {
  passwordActual: string;
  passwordNueva: string;
}

export interface FormularioCambioPassword {
  datos: DatosCambioPassword;
  confirmarPassword: string;
}

export interface DatosIntereses {
  intereses: string[];
}

export type FiltroUsuarios = 'TODOS' | 'SIN_UNIDAD' | 'RESIDENTES' | 'INACTIVOS';

export const FILTROS_USUARIOS: Opcion<FiltroUsuarios>[] = [
  { valor: 'TODOS', texto: 'Todos' },
  { valor: 'SIN_UNIDAD', texto: 'Sin unidad asignada' },
  { valor: 'RESIDENTES', texto: 'Residentes' },
  { valor: 'INACTIVOS', texto: 'Inactivos' },
];

const INSIGNIAS_ROL: Record<Rol, Insignia> = {
  ADMIN: { texto: 'Administrador', clase: 'exito', icono: 'fa-shield-halved' },
  USER: { texto: 'Residente', clase: 'info', icono: 'fa-house-user' },
};

export const REGLAS_PERFIL: ReglaValidacion<DatosPerfil>[] = [
  {
    falla: (datos) => estaVacio(datos.nombre) || estaVacio(datos.apellido),
    mensaje: 'Completa tu nombre y apellido.',
  },
  { falla: (datos) => estaVacio(datos.telefono), mensaje: 'Completa tu teléfono.' },
];

export const REGLAS_CAMBIO_PASSWORD: ReglaValidacion<FormularioCambioPassword>[] = [
  { falla: ({ datos }) => datos.passwordActual === '', mensaje: 'Escribe tu contraseña actual.' },
  {
    falla: ({ datos }) => esPasswordInsegura(datos.passwordNueva),
    mensaje: MENSAJE_PASSWORD,
  },
  {
    falla: (formulario) => formulario.datos.passwordNueva !== formulario.confirmarPassword,
    mensaje: 'Las contraseñas nuevas no coinciden.',
  },
];

/** Indica si el usuario es administrador. */
export const esAdministrador = (usuario: Usuario): boolean => usuario.role === 'ADMIN';

/** Indica si el usuario ya tiene una unidad asignada. */
export const tieneUnidad = (usuario: Usuario | null): boolean =>
  usuario !== null && usuario.unidadId !== null;

/** Devuelve el nombre y el apellido del usuario. */
export const nombreCompleto = (usuario: Usuario): string => `${usuario.nombre} ${usuario.apellido}`;

/** Devuelve las iniciales del usuario. */
export const inicialesUsuario = (usuario: Usuario): string =>
  `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase();

/** Devuelve la insignia del rol. */
export const insigniaRol = (rol: Rol): Insignia => INSIGNIAS_ROL[rol];

/** Devuelve el texto del estado del usuario. */
export const textoEstadoUsuario = (usuario: Usuario): string =>
  usuario.activo ? 'Activo' : 'Inactivo';

/** Devuelve la clase de estilo del estado del usuario. */
export const claseEstadoUsuario = (usuario: Usuario): string =>
  usuario.activo ? 'exito' : 'neutro';

/** Devuelve el ícono de la acción de activar o desactivar. */
export const iconoCambioEstado = (usuario: Usuario): string =>
  usuario.activo ? 'fa-user-slash' : 'fa-user-check';

/** Devuelve el texto de la acción de activar o desactivar. */
export const textoAccionEstado = (usuario: Usuario): string =>
  usuario.activo ? 'Desactivar' : 'Activar';

/** Devuelve la unidad del usuario o un texto si aún no tiene. */
export const textoUnidadUsuario = (usuario: Usuario): string =>
  usuario.unidadDescripcion ?? 'Sin unidad asignada';

/** Devuelve la unidad que el usuario pidió al registrarse. */
export const textoSolicitudUsuario = (usuario: Usuario): string =>
  usuario.unidadSolicitada ? `Solicita: ${usuario.unidadSolicitada}` : 'Sin solicitud';

/** Arma los textos de la confirmación para activar o desactivar al usuario. */
export const opcionesCambioEstado = (usuario: Usuario): OpcionesConfirmacion =>
  usuario.activo
    ? {
        titulo: `¿Desactivar a ${usuario.nombre}?`,
        texto: 'No podrá iniciar sesión hasta que lo actives de nuevo.',
        textoConfirmar: 'Sí, desactivar',
        peligro: true,
      }
    : {
        titulo: `¿Activar a ${usuario.nombre}?`,
        texto: 'Podrá volver a iniciar sesión y usar el sistema.',
        textoConfirmar: 'Sí, activar',
        peligro: false,
      };
