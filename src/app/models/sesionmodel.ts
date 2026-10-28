import { Usuario } from './usuariomodel';

export interface RespuestaSesion {
  token: string;
  refreshToken: string;
  usuario: Usuario;
}

export interface RespuestaRefresco {
  token: string;
  refreshToken: string;
}

export interface RespuestaLogin {
  token?: string;
  refreshToken?: string;
  usuario?: Usuario;
  requiereCodigo?: boolean;
  email?: string;
  mensaje?: string;
}

export interface RespuestaMensaje {
  mensaje: string;
  email?: string;
}

export interface RespuestaError {
  error?: string;
  requiereVerificacion?: boolean;
  email?: string;
}

export interface SolicitudAdmin {
  nombre: string;
  apellido: string;
  email: string;
  fechaSolicitud: string;
  expiraEn: string;
}
