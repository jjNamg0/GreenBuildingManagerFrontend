export interface ReglaValidacion<T> {
  falla: (datos: T) => boolean;
  mensaje: string;
}

export const PATRON_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/;

export const MENSAJE_PASSWORD =
  'La contraseña no cumple con el estándar (mínimo 8 caracteres, al menos una letra minúscula, ' +
  'al menos una letra mayúscula, al menos un número y al menos un símbolo).';

/** Indica si la contraseña no cumple el estándar de seguridad. */
export const esPasswordInsegura = (password: string): boolean => !PATRON_PASSWORD.test(password);

export const LONGITUD_CODIGO = 6;

export const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const DOMINIOS_PERMITIDOS = [
  'gmail.com',
  'hotmail.com',
  'hotmail.es',
  'outlook.com',
  'outlook.es',
  'live.com',
  'msn.com',
  'yahoo.com',
  'yahoo.es',
  'icloud.com',
  'me.com',
  'aol.com',
  'protonmail.com',
  'proton.me',
  'unbosque.edu.co',
];

export const MENSAJE_DOMINIO =
  'Usa un correo de un proveedor conocido, como Gmail, Hotmail, Outlook, Yahoo o iCloud.';

/** Indica si lo que va después del @ es uno de los dominios permitidos. */
export const dominioPermitido = (correo: string): boolean =>
  DOMINIOS_PERMITIDOS.includes(correo.trim().toLowerCase().split('@').pop() ?? '');

/** Indica si el correo tiene formato válido y es de un dominio permitido. */
export const esCorreoValido = (correo: string): boolean =>
  PATRON_CORREO.test(correo.trim()) && dominioPermitido(correo);

export const PATRON_TELEFONO = /^\d{10}$/;

export const MENSAJE_TELEFONO = 'Escribe un teléfono válido de 10 dígitos.';

/** Quita todos los espacios del teléfono, por ejemplo "300 123 4567" queda "3001234567". */
export const limpiarTelefono = (telefono: string): string => telefono.replace(/\s+/g, '');

/** Indica si el teléfono, sin espacios, no tiene exactamente 10 dígitos. */
export const esTelefonoInvalido = (telefono: string): boolean =>
  !PATRON_TELEFONO.test(limpiarTelefono(telefono));

/** Indica si el texto es nulo o está vacío. */
export const estaVacio = (valor: string | null): boolean => (valor ?? '').trim() === '';

/** Devuelve el mensaje de la primera regla que falla, o vacío si todas pasan. */
export const primerError = <T>(reglas: ReglaValidacion<T>[], datos: T): string =>
  reglas.find((regla) => regla.falla(datos))?.mensaje ?? '';
