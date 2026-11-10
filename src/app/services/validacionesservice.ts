import { HttpErrorResponse } from '@angular/common/http';
import { RespuestaError } from '../models/sesionmodel';

const PATRON_CORREO = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{2,50}$/;

export function mensajeError(error: HttpErrorResponse, porDefecto: string): string {
  if (error.status === 0) {
    return 'No hay conexión con el servidor. Revisa tu internet o intenta más tarde.';
  }
  const cuerpo = error.error as RespuestaError | null;
  return cuerpo?.error || porDefecto;
}

export function validarEmail(email: string): string {
  if (!email.trim()) {
    return 'Escribe tu correo.';
  }
  if (!PATRON_CORREO.test(email.trim())) {
    return 'El correo no tiene un formato válido.';
  }
  return '';
}

export function validarNombre(valor: string, campo: string): string {
  if (!valor.trim()) {
    return `Escribe tu ${campo}.`;
  }
  if (!PATRON_NOMBRE.test(valor.trim())) {
    return `El ${campo} solo puede tener letras y espacios, entre 2 y 50 caracteres.`;
  }
  return '';
}

export function validarContrasena(password: string, confirmacion: string): string {
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }
  if (password.length > 72) {
    return 'La contraseña no puede tener más de 72 caracteres.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'La contraseña debe tener al menos una letra mayúscula.';
  }
  if (!/[a-z]/.test(password)) {
    return 'La contraseña debe tener al menos una letra minúscula.';
  }
  if (!/\d/.test(password)) {
    return 'La contraseña debe tener al menos un número.';
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return 'La contraseña debe tener al menos un carácter especial.';
  }
  if (password !== confirmacion) {
    return 'Las contraseñas no coinciden.';
  }
  return '';
}

export function soloDigitos(valor: string, maximo: number): string {
  return valor.replace(/\D/g, '').slice(0, maximo);
}

export function normalizarTexto(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}
