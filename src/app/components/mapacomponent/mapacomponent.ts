import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Adminconjuntoservice } from '../../services/adminconjuntoservice';
import { Invitacionservice } from '../../services/invitacionservice';
import { Rutaservice } from '../../services/rutaservice';
import { Ubicacionservice } from '../../services/ubicacionservice';
import { Anillo, Geografiaservice } from '../../services/geografiaservice';
import { Conjunto } from '../../models/conjuntomodel';
import { Evento } from '../../models/eventomodel';
import { Coordenadas, Ruta } from '../../models/rutamodel';
import { TIPOS_CONJUNTO, etiquetaDe } from '../../models/opcionesmodel';
import { normalizarTexto } from '../../services/validaciones';

const LIMITES_CUNDINAMARCA: L.LatLngTuple[] = [
  [3.7, -74.9],
  [5.85, -73.0],
];

const AZUL_RUTA = '#4c9aff';

@Component({
  selector: 'app-mapacomponent',
  standalone: false,
  templateUrl: './mapacomponent.html',
  styleUrl: './mapacomponent.css',
})
export class Mapacomponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contenedorMapa') contenedorMapa!: ElementRef<HTMLDivElement>;

  readonly tiposConjunto = TIPOS_CONJUNTO;
  readonly IMAGEN_RESPALDO = 'assets/images/respaldo.svg';

  esInvitacion = false;
  evento: Evento | null = null;
  conjuntos: Conjunto[] = [];
  cargandoConjuntos = true;
  errorConjuntos = '';
  busqueda = '';
  municipio = '';
  tipo = '';

  seleccionado: Conjunto | null = null;
  ubicacion: Coordenadas | null = null;
  buscandoUbicacion = false;
  errorUbicacion = '';

  modo = 'carro';
  ruta: Ruta | null = null;
  calculandoRuta = false;
  errorRuta = '';
  siguiendo = false;

  private mapa: L.Map | null = null;
  private capaMarcadores = L.layerGroup();
  private marcadores = new Map<number, L.Marker>();
  private puntoUbicacion: L.CircleMarker | null = null;
  private haloUbicacion: L.CircleMarker | null = null;
  private lineaRuta: L.Polyline | null = null;
  private brilloRuta: L.Polyline | null = null;
  private idSeguimiento: number | null = null;

  private token = '';

  constructor(
    private adminConjuntoService: Adminconjuntoservice,
    private invitacionService: Invitacionservice,
    private route: ActivatedRoute,
    private rutaService: Rutaservice,
    private ubicacionService: Ubicacionservice,
    private geografiaService: Geografiaservice,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.esInvitacion = this.token !== '';
  }

  ngAfterViewInit(): void {
    this.crearMapa();
    this.cargarConjuntos();
  }

  ngOnDestroy(): void {
    this.ubicacionService.dejarDeSeguir(this.idSeguimiento);
    this.mapa?.remove();
    this.mapa = null;
  }

  get conjuntosFiltrados(): Conjunto[] {
    const texto = normalizarTexto(this.busqueda);
    return this.conjuntos.filter(
      (c) =>
        (!texto || normalizarTexto(c.nombre).includes(texto) || normalizarTexto(c.direccion).includes(texto)) &&
        (!this.municipio || c.municipio === this.municipio) &&
        (!this.tipo || c.tipo === this.tipo),
    );
  }

  get municipiosConConjuntos(): string[] {
    return [...new Set(this.conjuntos.map((c) => c.municipio))].sort((a, b) => a.localeCompare(b, 'es'));
  }

  etiquetaTipo(tipo: string): string {
    return etiquetaDe(TIPOS_CONJUNTO, tipo);
  }

  imagenDe(conjunto: Conjunto): string {
    return conjunto.imagen ? `assets/images/${conjunto.imagen}` : this.IMAGEN_RESPALDO;
  }

  usarImagenRespaldo(evento: Event): void {
    const imagen = evento.target as HTMLImageElement;
    if (!imagen.src.endsWith(this.IMAGEN_RESPALDO)) {
      imagen.src = this.IMAGEN_RESPALDO;
    }
  }

  aplicarFiltros(): void {
    this.pintarMarcadores();
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.municipio = '';
    this.tipo = '';
    this.pintarMarcadores();
  }

  cargarConjuntos(): void {
    this.cargandoConjuntos = true;
    this.errorConjuntos = '';
    if (this.esInvitacion) {
      this.cargarInvitacion();
      return;
    }
    this.adminConjuntoService.obtenerConjuntos().subscribe((resultado) => {
      this.cargandoConjuntos = false;
      if (!resultado.exito) {
        this.errorConjuntos = resultado.mensaje;
        return;
      }
      this.conjuntos = resultado.datos;
      this.pintarMarcadores();
    });
  }

  private cargarInvitacion(): void {
    this.invitacionService.obtenerUbicacion(this.token).subscribe((resultado) => {
      this.cargandoConjuntos = false;
      if (!resultado.exito) {
        this.errorConjuntos = resultado.mensaje;
        return;
      }
      this.evento = resultado.datos.evento;
      this.conjuntos = [resultado.datos.conjunto];
      this.pintarMarcadores();
      this.seleccionar(resultado.datos.conjunto);
    });
  }

  seleccionar(conjunto: Conjunto): void {
    this.seleccionado = conjunto;
    this.ruta = null;
    this.errorRuta = '';
    this.quitarRuta();
    this.resaltarMarcador();
    if (this.mapa && conjunto.latitud !== null && conjunto.longitud !== null) {
      this.mapa.setView([conjunto.latitud, conjunto.longitud], 15);
    }
    this.ajustarTamanoMapa();
  }

  cerrarDetalle(): void {
    this.seleccionado = null;
    this.ruta = null;
    this.errorRuta = '';
    this.quitarRuta();
    this.resaltarMarcador();
    this.ajustarTamanoMapa();
  }

  dondeEstoy(): void {
    this.buscarUbicacion(() => {
      if (this.mapa && this.ubicacion) {
        this.mapa.setView([this.ubicacion.latitud, this.ubicacion.longitud], 15);
      }
    });
  }

  comoLlegar(): void {
    if (!this.seleccionado) {
      return;
    }
    this.errorRuta = '';
    if (this.ubicacion) {
      this.calcularRuta();
      return;
    }
    this.buscarUbicacion(() => this.calcularRuta());
  }

  cambiarModo(modo: string): void {
    this.modo = modo;
    if (this.ruta) {
      this.calcularRuta();
    }
  }

  alternarSeguimiento(): void {
    if (this.siguiendo) {
      this.ubicacionService.dejarDeSeguir(this.idSeguimiento);
      this.idSeguimiento = null;
      this.siguiendo = false;
      return;
    }
    this.idSeguimiento = this.ubicacionService.seguirUbicacion(
      (coordenadas) => {
        this.ubicacion = coordenadas;
        this.pintarUbicacion();
        this.mapa?.panTo([coordenadas.latitud, coordenadas.longitud]);
      },
      (mensaje) => {
        this.errorUbicacion = mensaje;
        this.siguiendo = false;
      },
    );
    this.siguiendo = this.idSeguimiento !== null;
  }

  acercar(): void {
    this.mapa?.zoomIn();
  }

  alejar(): void {
    this.mapa?.zoomOut();
  }

  formatearDistancia(metros: number): string {
    return metros < 1000 ? `${Math.round(metros)}` : `${(metros / 1000).toFixed(1).replace('.', ',')}`;
  }

  unidadDistancia(metros: number): string {
    return metros < 1000 ? 'm' : 'km';
  }

  formatearDuracion(segundos: number): string {
    const minutos = Math.max(1, Math.round(segundos / 60));
    return minutos < 60 ? `${minutos}` : `${Math.floor(minutos / 60)} h ${minutos % 60}`;
  }

  textoPaso(metros: number): string {
    return metros < 1000 ? `${Math.round(metros)} m` : `${(metros / 1000).toFixed(1).replace('.', ',')} km`;
  }

  private crearMapa(): void {
    this.mapa = L.map(this.contenedorMapa.nativeElement, { zoomControl: false });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      className: 'capa-oscura',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.mapa);
    this.mapa.fitBounds(LIMITES_CUNDINAMARCA);
    this.mapa.setMaxBounds(L.latLngBounds(LIMITES_CUNDINAMARCA).pad(0.15));
    this.mapa.setMinZoom(this.mapa.getZoom());
    this.capaMarcadores.addTo(this.mapa);
    this.geografiaService.obtenerContornos().subscribe((contornos) => this.pintarContorno(contornos));
    setTimeout(() => {
      this.mapa?.invalidateSize();
      this.mapa?.fitBounds(LIMITES_CUNDINAMARCA);
      if (this.mapa) {
        this.mapa.setMinZoom(this.mapa.getZoom());
      }
    }, 0);
  }

  private pintarContorno(contornos: Anillo[]): void {
    if (!this.mapa || contornos.length === 0) {
      return;
    }
    const anillos = contornos.map((anillo) => anillo.map(([lon, lat]) => L.latLng(lat, lon)));
    const mundo = [L.latLng(85, -180), L.latLng(85, 180), L.latLng(-85, 180), L.latLng(-85, -180)];
    L.polygon([mundo, ...anillos], { fillColor: '#0f1412', fillOpacity: 0.85, stroke: false, interactive: false, className: 'gb-mascara' }).addTo(this.mapa);
    L.polygon(anillos, { color: '#3dbe7a', weight: 2, opacity: 0.8, fill: false, interactive: false, className: 'gb-contorno' }).addTo(this.mapa);
  }

  private icono(seleccionado: boolean): L.DivIcon {
    const tamano = seleccionado ? 42 : 34;
    return L.divIcon({
      className: '',
      html: `<i class="bi bi-geo-alt-fill gb-marcador${seleccionado ? ' seleccionado' : ''}"></i>`,
      iconSize: [tamano, tamano],
      iconAnchor: [tamano / 2, tamano],
      tooltipAnchor: [tamano / 2, -tamano / 2],
    });
  }

  private pintarMarcadores(): void {
    this.capaMarcadores.clearLayers();
    this.marcadores.clear();
    for (const conjunto of this.conjuntosFiltrados) {
      if (conjunto.latitud === null || conjunto.longitud === null) {
        continue;
      }
      const marcador = L.marker([conjunto.latitud, conjunto.longitud], {
        icon: this.icono(this.seleccionado?.id === conjunto.id),
        title: conjunto.nombre,
      })
        .bindTooltip(conjunto.nombre, { permanent: true, direction: 'right', className: 'gb-etiqueta-mapa' })
        .on('click', () => this.seleccionar(conjunto))
        .addTo(this.capaMarcadores);
      this.marcadores.set(conjunto.id, marcador);
    }
  }

  private resaltarMarcador(): void {
    this.marcadores.forEach((marcador, id) => marcador.setIcon(this.icono(this.seleccionado?.id === id)));
  }

  private buscarUbicacion(despues: () => void): void {
    this.buscandoUbicacion = true;
    this.errorUbicacion = '';
    this.ubicacionService.obtenerUbicacion().subscribe({
      next: (coordenadas) => {
        this.buscandoUbicacion = false;
        this.ubicacion = coordenadas;
        this.pintarUbicacion();
        despues();
      },
      error: (mensaje: string) => {
        this.buscandoUbicacion = false;
        this.errorUbicacion = mensaje;
      },
    });
  }

  private calcularRuta(): void {
    if (!this.seleccionado || !this.ubicacion || this.seleccionado.latitud === null || this.seleccionado.longitud === null) {
      return;
    }
    this.calculandoRuta = true;
    this.errorRuta = '';
    const destino = { latitud: this.seleccionado.latitud, longitud: this.seleccionado.longitud };
    this.rutaService.calcularRuta(this.ubicacion, destino, this.modo).subscribe((resultado) => {
      this.calculandoRuta = false;
      if (!resultado.exito) {
        this.ruta = null;
        this.quitarRuta();
        this.errorRuta = resultado.mensaje;
        return;
      }
      this.ruta = resultado.datos;
      this.dibujarRuta(resultado.datos);
    });
  }

  private dibujarRuta(ruta: Ruta): void {
    this.quitarRuta();
    if (!this.mapa || ruta.puntos.length === 0) {
      return;
    }
    this.brilloRuta = L.polyline(ruta.puntos, { color: AZUL_RUTA, weight: 14, opacity: 0.18 }).addTo(this.mapa);
    this.lineaRuta = L.polyline(ruta.puntos, { color: AZUL_RUTA, weight: 5, opacity: 0.95 }).addTo(this.mapa);
    this.mapa.fitBounds(this.lineaRuta.getBounds(), { padding: [50, 50] });
  }

  private quitarRuta(): void {
    this.lineaRuta?.remove();
    this.brilloRuta?.remove();
    this.lineaRuta = null;
    this.brilloRuta = null;
  }

  private pintarUbicacion(): void {
    if (!this.mapa || !this.ubicacion) {
      return;
    }
    const punto: L.LatLngExpression = [this.ubicacion.latitud, this.ubicacion.longitud];
    if (this.puntoUbicacion && this.haloUbicacion) {
      this.puntoUbicacion.setLatLng(punto);
      this.haloUbicacion.setLatLng(punto);
      return;
    }
    this.haloUbicacion = L.circleMarker(punto, { radius: 20, stroke: false, fillColor: AZUL_RUTA, fillOpacity: 0.2 }).addTo(
      this.mapa,
    );
    this.puntoUbicacion = L.circleMarker(punto, {
      radius: 8,
      color: '#ffffff',
      weight: 3,
      fillColor: AZUL_RUTA,
      fillOpacity: 1,
    })
      .bindTooltip('Estás aquí', { className: 'gb-etiqueta-mapa' })
      .addTo(this.mapa);
  }

  private ajustarTamanoMapa(): void {
    setTimeout(() => this.mapa?.invalidateSize(), 0);
  }
}
