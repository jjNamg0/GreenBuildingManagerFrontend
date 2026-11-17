import { Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Invitacion,
  avisoEstadoInvitacion,
  imagenInvitacion,
  lugarInvitacion,
  mensajeErrorInvitacion,
} from '../../models/invitacionmodel';
import { MapaLeaflet, leaflet } from '../../models/leafletmodel';
import { OPCIONES_TESELAS, URL_TESELAS, crearIconoMarcador } from '../../models/mapamodel';
import { Errorservice } from '../../services/errorservice';
import { Invitacionservice } from '../../services/invitacionservice';

const ZOOM_INVITACION = 16;

/** Página pública que ve un invitado: el plan, el mapa del conjunto y el acceso a la ruta. */
@Component({
  selector: 'app-invitacioncomponent',
  standalone: false,
  styleUrl: './invitacioncomponent.css',
  templateUrl: './invitacioncomponent.html',
})
export class Invitacioncomponent implements OnInit, OnDestroy {
  readonly imagenInvitacion = imagenInvitacion;
  readonly lugarInvitacion = lugarInvitacion;
  readonly avisoEstadoInvitacion = avisoEstadoInvitacion;

  invitacion = signal<Invitacion | null>(null);
  cargando = signal(true);
  error = signal('');

  private mapa: MapaLeaflet | null = null;

  constructor(
    private rutaActiva: ActivatedRoute,
    private invitacionService: Invitacionservice,
    private errorService: Errorservice,
  ) {}

  @ViewChild('contenedorMapa') set contenedorMapa(contenedor: ElementRef<HTMLDivElement> | undefined) {
    if (contenedor) {
      this.crearMapa(contenedor.nativeElement);
    }
  }

  /** Pide al back la invitación del enlace. */
  ngOnInit(): void {
    const codigo = this.rutaActiva.snapshot.paramMap.get('codigo') ?? '';
    this.invitacionService.obtenerPorCodigo(codigo).subscribe({
      next: (invitacion) => {
        this.invitacion.set(invitacion);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(mensajeErrorInvitacion(error, this.errorService.obtenerMensaje(error)));
      },
    });
  }

  /** Destruye el mapa. */
  ngOnDestroy(): void {
    this.mapa?.remove();
  }

  /** Crea el mapa centrado en el conjunto de la invitación, con su marcador. */
  private crearMapa(contenedor: HTMLElement): void {
    const invitacion = this.invitacion();
    if (!invitacion || this.mapa) {
      return;
    }
    const mapa = leaflet().map(contenedor);
    leaflet().tileLayer(URL_TESELAS, OPCIONES_TESELAS).addTo(mapa);
    mapa.setView([invitacion.latitud, invitacion.longitud], ZOOM_INVITACION);
    leaflet()
      .marker([invitacion.latitud, invitacion.longitud], {
        icon: crearIconoMarcador(true),
        title: invitacion.conjuntoNombre,
      })
      .bindTooltip(invitacion.conjuntoNombre, {
        permanent: true,
        direction: 'right',
        className: 'gb-etiqueta-mapa',
      })
      .addTo(mapa);
    this.mapa = mapa;
    setTimeout(() => mapa.invalidateSize());
  }
}
