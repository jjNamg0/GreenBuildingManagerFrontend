import { Component, OnInit, signal } from '@angular/core';
import { ResumenAdmin } from '../../models/resumenmodel';
import { Errorservice } from '../../services/errorservice';
import { Resumenservice } from '../../services/resumenservice';
import { Sesionservice } from '../../services/sesionservice';

/** Panel de inicio del administrador con los totales del sistema y accesos rápidos. */
@Component({
  selector: 'app-admininiciocomponent',
  standalone: false,
  styleUrl: './admininiciocomponent.css',
  templateUrl: './admininiciocomponent.html',
})
export class Admininiciocomponent implements OnInit {
  resumen = signal<ResumenAdmin | null>(null);
  cargando = signal(true);
  error = signal('');

  readonly ACCESOS = [
    {
      texto: 'Crear conjunto',
      detalle: 'Registra un conjunto y ubícalo en el mapa',
      ruta: '/admin/conjuntos',
      icono: 'fa-city',
    },
    {
      texto: 'Programar evento',
      detalle: 'Fiestas, asambleas y planes para niños',
      ruta: '/admin/eventos',
      icono: 'fa-calendar-plus',
    },
    {
      texto: 'Revisar reservas',
      detalle: 'Aprueba o rechaza solicitudes',
      ruta: '/admin/reservas',
      icono: 'fa-calendar-check',
    },
    {
      texto: 'Ver auditoría',
      detalle: 'Todo lo que pasa en el sistema',
      ruta: '/admin/auditoria',
      icono: 'fa-clipboard-list',
    },
  ];

  constructor(
    private resumenService: Resumenservice,
    private sesionService: Sesionservice,
    private errorService: Errorservice,
  ) {}

  /** Carga los totales del panel. */
  ngOnInit(): void {
    this.cargar();
  }

  /** Devuelve el nombre del administrador con la sesión iniciada. */
  nombre(): string {
    return this.sesionService.usuario()?.nombre ?? '';
  }

  /** Pide al back el resumen del panel. */
  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.resumenService.obtenerResumenAdmin().subscribe({
      next: (resumen) => {
        this.resumen.set(resumen);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos cargar el resumen.'));
      },
    });
  }
}
