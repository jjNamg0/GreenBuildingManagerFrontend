import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Conjunto } from '../../models/conjuntomodel';
import { Anillo } from '../../models/geografiamodel';
import {
  AZUL_RUTA,
  LIMITES_CUNDINAMARCA,
  MUNDO,
  OPCIONES_TESELAS,
  URL_TESELAS,
  crearIconoMarcador,
} from '../../models/mapamodel';
import {
  CircleMarker,
  LatLngTuple,
  LayerGroup,
  MapaLeaflet,
  Polyline,
  leaflet,
} from '../../models/leafletmodel';
import { claseSpinner } from '../../models/opcionmodel';
import { RecomendacionConjunto } from '../../models/recomendacionmodel';
import { ModoRuta, Ruta } from '../../models/rutamodel';
import { Coordenadas } from '../../models/ubicacionmodel';
import { Conjuntoservice } from '../../services/conjuntoservice';
import { Errorservice } from '../../services/errorservice';
import { Geografiaservice } from '../../services/geografiaservice';
import { Recomendacionservice } from '../../services/recomendacionservice';
import { Rutaservice } from '../../services/rutaservice';
import { Sesionservice } from '../../services/sesionservice';
import { Ubicacionservice } from '../../services/ubicacionservice';

/** Mapa público de Cundinamarca con los conjuntos, la ubicación del visitante y las rutas. */
@Component({
  selector: 'app-mapacomponent',
  standalone: false,
  styleUrl: './mapacomponent.css',
  templateUrl: './mapacomponent.html',
})
export class Mapacomponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contenedorMapa') contenedorMapa!: ElementRef<HTMLDivElement>;

  readonly claseSpinner = claseSpinner;

  private mapa: MapaLeaflet | null = null;
  private capaMarcadores: LayerGroup | null = null;
  private lineaRuta: Polyline | null = null;
  private brilloRuta: Polyline | null = null;
  private puntoUbicacion: CircleMarker | null = null;
  private haloUbicacion: CircleMarker | null = null;
  private seguimiento: Subscription | null = null;
  private suscripciones = new Subscription();

  conjuntos = signal<Conjunto[]>([]);
  cercanos = signal<RecomendacionConjunto[]>([]);
  seleccionado = signal<Conjunto | null>(null);
  ruta = signal<Ruta | null>(null);
  modo = signal<ModoRuta>('CARRO');
  busqueda = '';
  tipo = '';

  cargandoConjuntos = signal(true);
  errorConjuntos = signal('');
  buscandoUbicacion = signal(false);
  avisoUbicacion = signal('');
  calculandoRuta = signal(false);
  errorRuta = signal('');
  siguiendo = signal(false);

  constructor(
    private conjuntoService: Conjuntoservice,
    private recomendacionService: Recomendacionservice,
    private rutaService: Rutaservice,
    private ubicacionService: Ubicacionservice,
    private geografiaService: Geografiaservice,
    private sesionService: Sesionservice,
    private errorService: Errorservice,
  ) {}

  /** Carga los conjuntos. */
  ngOnInit(): void {
    this.cargarConjuntos();
  }

  /** Crea el mapa. */
  ngAfterViewInit(): void {
    this.crearMapa();
  }

  /** Cancela las suscripciones, detiene el seguimiento y destruye el mapa. */
  ngOnDestroy(): void {
    this.suscripciones.unsubscribe();
    this.detenerSeguimiento();
    this.mapa?.remove();
  }

  /** Indica si hay una sesión iniciada. */
  haySesion(): boolean {
    return this.sesionService.haySesion();
  }

  /** Pide al back los conjuntos con la búsqueda y el tipo actuales. */
  cargarConjuntos(): void {
    this.cargandoConjuntos.set(true);
    this.errorConjuntos.set('');
    this.suscripciones.add(
      this.conjuntoService.obtenerTodos(this.busqueda.trim(), this.tipo).subscribe({
        next: (conjuntos) => this.mostrarConjuntos(conjuntos),
        error: (error: unknown) => {
          this.mostrarConjuntos([]);
          this.errorConjuntos.set(
            this.errorService.obtenerMensaje(error, 'No pudimos cargar los conjuntos.'),
          );
        },
      }),
    );
  }

  /** Borra la búsqueda y el tipo, y recarga los conjuntos. */
  limpiarFiltros(): void {
    this.busqueda = '';
    this.tipo = '';
    this.cargarConjuntos();
  }

  /** Selecciona un conjunto, borra la ruta y centra el mapa en él. */
  seleccionar(conjunto: Conjunto): void {
    this.seleccionado.set(conjunto);
    this.borrarRuta();
    this.pintarMarcadores();
    this.mapa?.setView([conjunto.latitud, conjunto.longitud], 15);
    this.ajustarTamanoMapa();
  }

  /** Cierra el detalle y vuelve a mostrar todo Cundinamarca. */
  cerrarDetalle(): void {
    this.seleccionado.set(null);
    this.borrarRuta();
    this.pintarMarcadores();
    this.mapa?.fitBounds(LIMITES_CUNDINAMARCA);
    this.ajustarTamanoMapa();
  }

  /** Obtiene la ubicación del visitante, la dibuja y carga los conjuntos cercanos. */
  dondeEstoy(): void {
    this.buscandoUbicacion.set(true);
    this.avisoUbicacion.set('');
    this.ubicacionService.obtenerUbicacion().subscribe({
      next: (coordenadas) => {
        this.buscandoUbicacion.set(false);
        this.pintarUbicacion(coordenadas);
        this.mapa?.setView([coordenadas.latitud, coordenadas.longitud], 14);
        this.cargarCercanos(coordenadas);
      },
      error: (error: unknown) => {
        this.buscandoUbicacion.set(false);
        this.avisoUbicacion.set(this.errorService.obtenerMensaje(error));
      },
    });
  }

  /** Cambia el modo de transporte y recalcula la ruta si ya había una. */
  cambiarModo(modo: ModoRuta): void {
    this.modo.set(modo);
    if (this.ruta()) {
      this.comoLlegar();
    }
  }

  /** Calcula la ruta desde la ubicación del visitante hasta el conjunto elegido. */
  comoLlegar(): void {
    const ubicacion = this.ubicacionService.ultimaUbicacion();
    if (ubicacion) {
      this.calcularRuta(ubicacion);
      return;
    }
    this.calculandoRuta.set(true);
    this.errorRuta.set('');
    this.ubicacionService.obtenerUbicacion().subscribe({
      next: (coordenadas) => {
        this.pintarUbicacion(coordenadas);
        this.calcularRuta(coordenadas);
      },
      error: (error: unknown) => {
        this.calculandoRuta.set(false);
        this.errorRuta.set(this.errorService.obtenerMensaje(error));
      },
    });
  }

  /** Inicia o detiene el seguimiento de la ubicación en tiempo real. */
  alternarSeguimiento(): void {
    if (this.seguimiento) {
      this.detenerSeguimiento();
      return;
    }
    this.siguiendo.set(true);
    this.seguimiento = this.ubicacionService.seguirUbicacion().subscribe({
      next: (coordenadas) => {
        this.pintarUbicacion(coordenadas);
        this.mapa?.panTo([coordenadas.latitud, coordenadas.longitud]);
      },
      error: (error: unknown) => {
        this.detenerSeguimiento();
        this.avisoUbicacion.set(this.errorService.obtenerMensaje(error));
      },
    });
  }

  /** Acerca el mapa. */
  acercar(): void {
    this.mapa?.zoomIn();
  }

  /** Aleja el mapa. */
  alejar(): void {
    this.mapa?.zoomOut();
  }

  /** Guarda los conjuntos y los dibuja en el mapa. */
  private mostrarConjuntos(conjuntos: Conjunto[]): void {
    this.conjuntos.set(conjuntos);
    this.cargandoConjuntos.set(false);
    this.pintarMarcadores();
  }

  /** Cancela el seguimiento de la ubicación. */
  private detenerSeguimiento(): void {
    this.seguimiento?.unsubscribe();
    this.seguimiento = null;
    this.siguiendo.set(false);
  }

  /** Pide al back los conjuntos más cercanos a las coordenadas. */
  private cargarCercanos(coordenadas: Coordenadas): void {
    this.recomendacionService.obtenerConjuntosCercanos(coordenadas).subscribe({
      next: (cercanos) => this.cercanos.set(cercanos),
      error: () => this.cercanos.set([]),
    });
  }

  /** Pide al back la ruta desde el origen hasta el conjunto elegido y la dibuja. */
  private calcularRuta(origen: Coordenadas): void {
    const destino = this.seleccionado();
    if (!destino) {
      return;
    }
    this.calculandoRuta.set(true);
    this.errorRuta.set('');
    this.rutaService
      .calcular({
        origenLatitud: origen.latitud,
        origenLongitud: origen.longitud,
        destinoLatitud: destino.latitud,
        destinoLongitud: destino.longitud,
        modo: this.modo(),
      })
      .subscribe({
        next: (ruta) => {
          this.calculandoRuta.set(false);
          this.ruta.set(ruta);
          this.pintarRuta(ruta);
        },
        error: (error: unknown) => {
          this.calculandoRuta.set(false);
          this.errorRuta.set(
            this.errorService.obtenerMensaje(error, 'No pudimos calcular la ruta.'),
          );
        },
      });
  }

  /** Crea el mapa de Leaflet con las teselas, los límites y el contorno de Cundinamarca. */
  private crearMapa(): void {
    const mapa = leaflet().map(this.contenedorMapa.nativeElement, { zoomControl: false });
    leaflet().tileLayer(URL_TESELAS, OPCIONES_TESELAS).addTo(mapa);
    mapa.fitBounds(LIMITES_CUNDINAMARCA);
    mapa.setMaxBounds(leaflet().latLngBounds(LIMITES_CUNDINAMARCA).pad(0.15));
    this.capaMarcadores = leaflet().layerGroup().addTo(mapa);
    this.mapa = mapa;
    this.suscripciones.add(
      this.geografiaService
        .obtenerContornos()
        .subscribe((contornos) => this.pintarContorno(contornos)),
    );
    this.pintarMarcadores();
    setTimeout(() => this.ajustarLimites());
  }

  /** Ajusta el tamaño, el encuadre y el zoom mínimo del mapa. */
  private ajustarLimites(): void {
    if (!this.mapa) {
      return;
    }
    this.mapa.invalidateSize();
    this.mapa.fitBounds(LIMITES_CUNDINAMARCA);
    this.mapa.setMinZoom(this.mapa.getZoom());
  }

  /** Dibuja el contorno de Cundinamarca y oscurece lo que queda afuera. */
  private pintarContorno(contornos: Anillo[]): void {
    if (!this.mapa || contornos.length === 0) {
      return;
    }
    const anillos = contornos.map((anillo) =>
      anillo.map(([longitud, latitud]): LatLngTuple => [latitud, longitud]),
    );
    leaflet().polygon([MUNDO, ...anillos], {
      fillOpacity: 0.85,
      stroke: false,
      interactive: false,
      className: 'gb-mascara',
    }).addTo(this.mapa);
    leaflet().polygon(anillos, {
      weight: 2,
      opacity: 0.8,
      fill: false,
      interactive: false,
      className: 'gb-contorno',
    }).addTo(this.mapa);
  }

  /** Redibuja un marcador por cada conjunto. */
  private pintarMarcadores(): void {
    const capa = this.capaMarcadores;
    if (!capa) {
      return;
    }
    capa.clearLayers();
    const idSeleccionado = this.seleccionado()?.id;
    this.conjuntos().forEach((conjunto) =>
      this.agregarMarcador(capa, conjunto, conjunto.id === idSeleccionado),
    );
  }

  /** Agrega a la capa el marcador de un conjunto. */
  private agregarMarcador(capa: LayerGroup, conjunto: Conjunto, elegido: boolean): void {
    leaflet().marker([conjunto.latitud, conjunto.longitud], {
      icon: crearIconoMarcador(elegido),
      title: conjunto.nombre,
    })
      .bindTooltip(conjunto.nombre, {
        permanent: true,
        direction: 'right',
        className: 'gb-etiqueta-mapa',
      })
      .on('click', () => this.seleccionar(conjunto))
      .addTo(capa);
  }

  /** Dibuja o mueve el punto de la ubicación del visitante. */
  private pintarUbicacion(coordenadas: Coordenadas): void {
    if (!this.mapa) {
      return;
    }
    const punto: LatLngTuple = [coordenadas.latitud, coordenadas.longitud];
    if (this.puntoUbicacion && this.haloUbicacion) {
      this.puntoUbicacion.setLatLng(punto);
      this.haloUbicacion.setLatLng(punto);
      return;
    }
    this.haloUbicacion = leaflet().circleMarker(punto, {
      radius: 20,
      stroke: false,
      fillColor: AZUL_RUTA,
      fillOpacity: 0.2,
    }).addTo(this.mapa);
    this.puntoUbicacion = leaflet().circleMarker(punto, {
      radius: 8,
      color: '#ffffff',
      weight: 3,
      fillColor: AZUL_RUTA,
      fillOpacity: 1,
    })
      .bindTooltip('Estás aquí', { className: 'gb-etiqueta-mapa' })
      .addTo(this.mapa);
  }

  /** Dibuja la ruta en el mapa y la encuadra. */
  private pintarRuta(ruta: Ruta): void {
    if (!this.mapa) {
      return;
    }
    this.quitarLineasRuta();
    this.brilloRuta = leaflet().polyline(ruta.puntos, { color: AZUL_RUTA, weight: 14, opacity: 0.18 }).addTo(
      this.mapa,
    );
    const linea = leaflet().polyline(ruta.puntos, { color: AZUL_RUTA, weight: 5, opacity: 0.95 }).addTo(
      this.mapa,
    );
    this.lineaRuta = linea;
    this.mapa.fitBounds(linea.getBounds(), { padding: [50, 50] });
  }

  /** Borra la ruta y sus errores. */
  private borrarRuta(): void {
    this.ruta.set(null);
    this.errorRuta.set('');
    this.quitarLineasRuta();
  }

  /** Quita las líneas de la ruta del mapa. */
  private quitarLineasRuta(): void {
    this.lineaRuta?.remove();
    this.brilloRuta?.remove();
    this.lineaRuta = null;
    this.brilloRuta = null;
  }

  /** Recalcula el tamaño del mapa después de un cambio de diseño. */
  private ajustarTamanoMapa(): void {
    setTimeout(() => this.mapa?.invalidateSize());
  }
}
