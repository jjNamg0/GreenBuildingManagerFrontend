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

/** Indica si el texto es nulo o está vacío. */
export const estaVacio = (valor: string | null): boolean => (valor ?? '').trim() === '';

/** Devuelve el mensaje de la primera regla que falla, o vacío si todas pasan. */
export const primerError = <T>(reglas: ReglaValidacion<T>[], datos: T): string =>
  reglas.find((regla) => regla.falla(datos))?.mensaje ?? '';
