import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Authservice } from '../../services/authservice';
import { SolicitudAdmin } from '../../models/sesionmodel';

@Component({
  selector: 'app-aprobaradmincomponent',
  standalone: false,
  templateUrl: './aprobaradmincomponent.html',
  styleUrl: './aprobaradmincomponent.css',
})
export class Aprobaradmincomponent implements OnInit {
  solicitud: SolicitudAdmin | null = null;
  cargando = true;
  procesando = false;
  error = '';
  resultado = '';
  mostrarConfirmacion = false;
  accionPendiente: 'aprobar' | 'rechazar' | null = null;
  private token = '';

  constructor(
    private auth: Authservice,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!this.token) {
      this.cargando = false;
      this.error = 'El enlace no es válido.';
      return;
    }
    this.auth.obtenerSolicitud(this.token).subscribe((respuesta) => {
      this.cargando = false;
      if (!respuesta.exito) {
        this.error = respuesta.mensaje;
        return;
      }
      this.solicitud = respuesta.datos;
    });
  }

  pedirConfirmacion(accion: 'aprobar' | 'rechazar'): void {
    this.accionPendiente = accion;
    this.mostrarConfirmacion = true;
  }

  cancelarConfirmacion(): void {
    this.mostrarConfirmacion = false;
    this.accionPendiente = null;
  }

  confirmar(): void {
    if (!this.accionPendiente) {
      return;
    }
    const peticion =
      this.accionPendiente === 'aprobar'
        ? this.auth.aprobarSolicitud(this.token)
        : this.auth.rechazarSolicitud(this.token);
    this.mostrarConfirmacion = false;
    this.procesando = true;
    peticion.subscribe((respuesta) => {
      this.procesando = false;
      if (!respuesta.exito) {
        this.error = respuesta.mensaje;
        return;
      }
      this.resultado = respuesta.datos.mensaje;
      this.solicitud = null;
    });
  }
}
