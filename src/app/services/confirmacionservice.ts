import { Injectable } from '@angular/core';
import { OpcionesConfirmacion, OpcionesTexto } from '../models/confirmacionmodel';
import { SweetAlertOptions, SweetAlertResult, sweetAlert } from '../models/sweetalertmodel';

/** Devuelve el estilo común de las confirmaciones. */
const estiloConfirmacion = (peligro: boolean): SweetAlertOptions => ({
  buttonsStyling: false,
  reverseButtons: true,
  showCancelButton: true,
  cancelButtonText: 'Volver',
  customClass: {
    popup: 'gb-swal',
    confirmButton: peligro ? 'btn-gb-peligro-lleno' : 'btn-gb',
    cancelButton: 'btn-gb-borde',
    input: 'form-control',
  },
});

/** Crea el validador que exige texto cuando el campo es obligatorio. */
const validarObligatorio =
  (obligatorio: boolean) =>
  (valor: string): string | null =>
    obligatorio && valor.trim() === '' ? 'Este campo es obligatorio.' : null;

/** Devuelve el texto escrito si se confirmó, o null. */
const textoConfirmado = (resultado: SweetAlertResult): string | null =>
  resultado.isConfirmed ? String(resultado.value ?? '').trim() : null;

/** Service que muestra confirmaciones con SweetAlert2. */
@Injectable({
  providedIn: 'root',
})
export class Confirmacionservice {
  private readonly ICONOS = { peligro: 'warning', normal: 'question' } as const;

  /** Muestra una confirmación y devuelve true si se acepta. */
  confirmar(opciones: OpcionesConfirmacion): Promise<boolean> {
    const peligro = opciones.peligro === true;
    return sweetAlert().fire({
      ...estiloConfirmacion(peligro),
      icon: peligro ? this.ICONOS.peligro : this.ICONOS.normal,
      title: opciones.titulo,
      text: opciones.texto,
      confirmButtonText: opciones.textoConfirmar,
    }).then((resultado) => resultado.isConfirmed);
  }

  /** Muestra una confirmación con un campo de texto y devuelve lo escrito. */
  pedirTexto(opciones: OpcionesTexto): Promise<string | null> {
    return sweetAlert().fire({
      ...estiloConfirmacion(true),
      icon: this.ICONOS.peligro,
      title: opciones.titulo,
      text: opciones.texto,
      input: 'textarea',
      inputPlaceholder: opciones.placeholder,
      confirmButtonText: opciones.textoConfirmar,
      inputValidator: validarObligatorio(opciones.obligatorio),
    }).then(textoConfirmado);
  }
}
