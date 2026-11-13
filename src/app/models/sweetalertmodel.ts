export type IconoSweetAlert = 'warning' | 'question' | 'success' | 'error' | 'info';

export interface ClasesSweetAlert {
  popup: string;
  confirmButton: string;
  cancelButton: string;
  input: string;
}

export interface SweetAlertOptions {
  buttonsStyling?: boolean;
  reverseButtons?: boolean;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  customClass?: ClasesSweetAlert;
  icon?: IconoSweetAlert;
  title?: string;
  text?: string;
  confirmButtonText?: string;
  input?: 'textarea' | 'text';
  inputPlaceholder?: string;
  inputValidator?: (valor: string) => string | null;
}

export interface SweetAlertResult {
  isConfirmed: boolean;
  value?: string;
}

export interface SweetAlert {
  fire: (opciones: SweetAlertOptions) => Promise<SweetAlertResult>;
}

export const sweetAlert = (): SweetAlert =>
  (globalThis as unknown as Record<string, SweetAlert>)['Swal'];
