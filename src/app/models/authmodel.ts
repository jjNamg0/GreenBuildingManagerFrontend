import {
  LONGITUD_CODIGO,
  MENSAJE_PASSWORD,
  esPasswordInsegura,
  PATRON_CORREO,
  ReglaValidacion,
  estaVacio,
} from './validacionmodel';

export type Rol = 'USER' | 'ADMIN';

export interface DatosLogin {
  username: string;
  password: string;
}

export interface RespuestaLogin {
  token: string;
  role: Rol;
}

export interface DatosRegistro {
  nombre: string;
  apellido: string;
  username: string;
  telefono: string;
  password: string;
  conjuntoId: number | null;
  unidadSolicitada: string;
}

export interface FormularioRegistro {
  datos: DatosRegistro;
  confirmarPassword: string;
  aceptaTerminos: boolean;
}

export interface DatosVerificacion {
  username: string;
  codigo: string;
}

export interface DatosCorreo {
  username: string;
}

export interface DatosRestablecer {
  username: string;
  codigo: string;
  nuevaPassword: string;
}

export interface FormularioRestablecer {
  datos: DatosRestablecer;
  confirmarPassword: string;
}

export const REGLAS_LOGIN: ReglaValidacion<DatosLogin>[] = [
  {
    falla: (datos) => estaVacio(datos.username) || datos.password === '',
    mensaje: 'Ingresa tu correo y tu contraseña.',
  },
];

export const REGLAS_REGISTRO: ReglaValidacion<FormularioRegistro>[] = [
  {
    falla: ({ datos }) => estaVacio(datos.nombre) || estaVacio(datos.apellido),
    mensaje: 'Completa tu nombre y apellido.',
  },
  {
    falla: ({ datos }) => estaVacio(datos.username) || estaVacio(datos.telefono),
    mensaje: 'Completa tu correo y tu teléfono.',
  },
  {
    falla: ({ datos }) => !PATRON_CORREO.test(datos.username.trim()),
    mensaje: 'Escribe un correo electrónico válido.',
  },
  {
    falla: ({ datos }) => datos.conjuntoId === null || estaVacio(datos.unidadSolicitada),
    mensaje: 'Elige tu conjunto y escribe tu torre/bloque y número de unidad.',
  },
  {
    falla: ({ datos }) => esPasswordInsegura(datos.password),
    mensaje: MENSAJE_PASSWORD,
  },
  {
    falla: (formulario) => formulario.datos.password !== formulario.confirmarPassword,
    mensaje: 'Las contraseñas no coinciden.',
  },
  {
    falla: (formulario) => !formulario.aceptaTerminos,
    mensaje: 'Debes aceptar los términos de uso y la política de privacidad.',
  },
];

export const REGLAS_VERIFICACION: ReglaValidacion<DatosVerificacion>[] = [
  {
    falla: (datos) => estaVacio(datos.username),
    mensaje: 'Escribe el correo con el que te registraste.',
  },
  {
    falla: (datos) => datos.codigo.length !== LONGITUD_CODIGO,
    mensaje: `El código tiene ${LONGITUD_CODIGO} dígitos.`,
  },
];

export const REGLAS_CORREO: ReglaValidacion<DatosCorreo>[] = [
  { falla: (datos) => estaVacio(datos.username), mensaje: 'Escribe el correo de tu cuenta.' },
];

export const REGLAS_RESTABLECER: ReglaValidacion<FormularioRestablecer>[] = [
  {
    falla: ({ datos }) => datos.codigo.trim().length !== LONGITUD_CODIGO,
    mensaje: `Escribe el código de ${LONGITUD_CODIGO} dígitos que llegó a tu correo.`,
  },
  {
    falla: ({ datos }) => esPasswordInsegura(datos.nuevaPassword),
    mensaje: MENSAJE_PASSWORD,
  },
  {
    falla: (formulario) => formulario.datos.nuevaPassword !== formulario.confirmarPassword,
    mensaje: 'Las contraseñas no coinciden.',
  },
];

export const limpiarDatosRegistro = (datos: DatosRegistro): DatosRegistro => ({
  ...datos,
  nombre: datos.nombre.trim(),
  apellido: datos.apellido.trim(),
  username: datos.username.trim(),
  telefono: datos.telefono.trim(),
  unidadSolicitada: datos.unidadSolicitada.trim(),
});
