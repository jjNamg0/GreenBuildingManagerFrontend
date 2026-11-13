export interface OpcionesConfirmacion {
  titulo: string;
  texto: string;
  textoConfirmar: string;
  peligro?: boolean;
}

export interface OpcionesTexto {
  titulo: string;
  texto: string;
  placeholder: string;
  textoConfirmar: string;
  obligatorio: boolean;
}
