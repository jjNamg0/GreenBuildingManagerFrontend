import { Injectable, signal } from '@angular/core';
import { RespuestaLogin, Rol } from '../models/authmodel';
import { Usuario } from '../models/usuariomodel';

/** Lee un valor del almacenamiento del navegador. */
const leerAlmacenamiento = (clave: string): string | null => {
  try {
    return localStorage.getItem(clave);
  } catch {
    return null;
  }
};

/** Guarda un valor en el almacenamiento del navegador. */
const escribirAlmacenamiento = (clave: string, valor: string): void => {
  try {
    localStorage.setItem(clave, valor);
  } catch {
    return;
  }
};

/** Borra un valor del almacenamiento del navegador. */
const borrarAlmacenamiento = (clave: string): void => {
  try {
    localStorage.removeItem(clave);
  } catch {
    return;
  }
};

/** Indica si la ruta es interna de la aplicación. */
const esRutaInterna = (ruta: string | null): ruta is string =>
  ruta !== null && ruta.startsWith('/') && !ruta.startsWith('//');

/** Service que guarda el token, el rol y el usuario de la sesión. */
@Injectable({
  providedIn: 'root',
})
export class Sesionservice {
  private readonly CLAVE_TOKEN = 'greenbuilding-token';
  private readonly CLAVE_ROL = 'greenbuilding-rol';

  token = signal<string | null>(leerAlmacenamiento(this.CLAVE_TOKEN));
  rol = signal<Rol | null>(leerAlmacenamiento(this.CLAVE_ROL) as Rol | null);
  usuario = signal<Usuario | null>(null);

  /** Indica si hay un token guardado. */
  haySesion(): boolean {
    return this.token() !== null;
  }

  /** Indica si el rol guardado es administrador. */
  esAdmin(): boolean {
    return this.rol() === 'ADMIN';
  }

  /** Devuelve la ruta inicial según el rol. */
  destinoInicial(): string {
    return this.esAdmin() ? '/admin' : '/mi-conjunto';
  }

  /** Devuelve la ruta pedida si es interna, o la ruta inicial. */
  destinoSeguro(volverA: string | null): string {
    return esRutaInterna(volverA) ? volverA : this.destinoInicial();
  }

  /** Guarda el token y el rol de la respuesta del login. */
  guardar(respuesta: RespuestaLogin): void {
    this.token.set(respuesta.token);
    this.rol.set(respuesta.role);
    escribirAlmacenamiento(this.CLAVE_TOKEN, respuesta.token);
    escribirAlmacenamiento(this.CLAVE_ROL, respuesta.role);
  }

  /** Borra el token, el rol y el usuario. */
  limpiar(): void {
    this.token.set(null);
    this.rol.set(null);
    this.usuario.set(null);
    borrarAlmacenamiento(this.CLAVE_TOKEN);
    borrarAlmacenamiento(this.CLAVE_ROL);
  }
}
