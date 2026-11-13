import { Injectable, signal } from '@angular/core';
import { TipoToast } from '../models/toastmodel';

/** Service que controla el aviso emergente. */
@Injectable({
  providedIn: 'root',
})
export class Toastservice {
  private readonly DURACION = 3500;
  private temporizador: ReturnType<typeof setTimeout> | null = null;

  mensaje = signal('');
  tipo = signal<TipoToast>('exito');

  /** Muestra un aviso y lo cierra solo después de unos segundos. */
  mostrar(mensaje: string, tipo: TipoToast = 'exito'): void {
    this.detenerTemporizador();
    this.mensaje.set(mensaje);
    this.tipo.set(tipo);
    this.temporizador = setTimeout(() => this.cerrar(), this.DURACION);
  }

  /** Cierra el aviso. */
  cerrar(): void {
    this.detenerTemporizador();
    this.mensaje.set('');
  }

  /** Cancela el temporizador del aviso. */
  private detenerTemporizador(): void {
    if (this.temporizador) {
      clearTimeout(this.temporizador);
      this.temporizador = null;
    }
  }
}
