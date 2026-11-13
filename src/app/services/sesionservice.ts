import { Injectable, signal } from '@angular/core';
import { RespuestaLogin, Rol } from '../models/authmodel';
import { Usuario } from '../models/usuariomodel';

const leerAlmacenamiento = (clave: string): string | null => {
  try {
    return localStorage.getItem(clave);
  } catch {
    return null;
  }
};

const escribirAlmacenamiento = (clave: string, valor: string): void => {
  try {
    localStorage.setItem(clave, valor);
  } catch {
    return;
  }
};

const borrarAlmacenamiento = (clave: string): void => {
  try {
    localStorage.removeItem(clave);
  } catch {
    return;
  }
};

const esRutaInterna = (ruta: string | null): ruta is string =>
  ruta !== null && ruta.startsWith('/') && !ruta.startsWith('//');

@Injectable({
  providedIn: 'root',
})
export class Sesionservice {
  private readonly CLAVE_TOKEN = 'greenbuilding-token';
  private readonly CLAVE_ROL = 'greenbuilding-rol';

  token = signal<string | null>(leerAlmacenamiento(this.CLAVE_TOKEN));
  rol = signal<Rol | null>(leerAlmacenamiento(this.CLAVE_ROL) as Rol | null);
  usuario = signal<Usuario | null>(null);

  haySesion(): boolean {
    return this.token() !== null;
  }

  esAdmin(): boolean {
    return this.rol() === 'ADMIN';
  }

  destinoInicial(): string {
    return this.esAdmin() ? '/admin' : '/mi-conjunto';
  }

  destinoSeguro(volverA: string | null): string {
    return esRutaInterna(volverA) ? volverA : this.destinoInicial();
  }

  guardar(respuesta: RespuestaLogin): void {
    this.token.set(respuesta.token);
    this.rol.set(respuesta.role);
    escribirAlmacenamiento(this.CLAVE_TOKEN, respuesta.token);
    escribirAlmacenamiento(this.CLAVE_ROL, respuesta.role);
  }

  limpiar(): void {
    this.token.set(null);
    this.rol.set(null);
    this.usuario.set(null);
    borrarAlmacenamiento(this.CLAVE_TOKEN);
    borrarAlmacenamiento(this.CLAVE_ROL);
  }
}
