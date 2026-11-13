import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  Conjunto,
  DatosConjunto,
  REGLAS_CONJUNTO,
  TIPOS_CONJUNTO,
  datosDeConjunto,
  limpiarDatosConjunto,
} from '../../models/conjuntomodel';
import {
  CENTRO_CUNDINAMARCA,
  OPCIONES_TESELAS,
  URL_TESELAS,
  crearIconoMarcador,
} from '../../models/mapamodel';
import {
  EventoClicMapa,
  LatLngTuple,
  MapaLeaflet,
  Marker,
  leaflet,
} from '../../models/leafletmodel';
import { claseSpinner } from '../../models/opcionmodel';
import { primerError } from '../../models/validacionmodel';
import { Conjuntoservice } from '../../services/conjuntoservice';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';
import { Ubicacionservice } from '../../services/ubicacionservice';

const ZOOM_GENERAL = 9;
const ZOOM_CERCANO = 15;
const DECIMALES_COORDENADA = 6;

@Component({
  selector: 'app-conjuntoformcomponent',
  standalone: false,
  styleUrl: './conjuntoformcomponent.css',
  templateUrl: './conjuntoformcomponent.html',
})
export class Conjuntoformcomponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() conjunto: Conjunto | null = null;
  @Output() readonly cerrar = new EventEmitter<void>();
  @Output() readonly guardado = new EventEmitter<void>();
  @ViewChild('contenedorMapa') contenedorMapa!: ElementRef<HTMLDivElement>;

  readonly TIPOS = TIPOS_CONJUNTO;
  readonly claseSpinner = claseSpinner;

  private mapa: MapaLeaflet | null = null;
  private marcador: Marker | null = null;

  datos: DatosConjunto = {
    nombre: '',
    tipo: 'APARTAMENTOS',
    direccion: '',
    municipio: '',
    latitud: null,
    longitud: null,
    descripcion: '',
    imagenUrl: null,
  };
  error = signal('');
  guardando = signal(false);

  constructor(
    private conjuntoService: Conjuntoservice,
    private ubicacionService: Ubicacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
    private cambios: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.conjunto) {
      this.datos = datosDeConjunto(this.conjunto);
    }
  }

  ngAfterViewInit(): void {
    const posicion = this.posicionGuardada();
    const mapa = leaflet().map(this.contenedorMapa.nativeElement).setView(
      posicion ?? CENTRO_CUNDINAMARCA,
      posicion ? ZOOM_CERCANO : ZOOM_GENERAL,
    );
    leaflet().tileLayer(URL_TESELAS, OPCIONES_TESELAS).addTo(mapa);
    mapa.on('click', (evento: EventoClicMapa) =>
      this.ubicar([evento.latlng.lat, evento.latlng.lng]),
    );
    this.mapa = mapa;
    if (posicion) {
      this.ubicar(posicion);
    }
    setTimeout(() => mapa.invalidateSize());
  }

  ngOnDestroy(): void {
    this.mapa?.remove();
  }

  get titulo(): string {
    return this.conjunto ? 'Editar conjunto' : 'Nuevo conjunto';
  }

  get textoBoton(): string {
    return this.conjunto ? 'Guardar cambios' : 'Crear conjunto';
  }

  usarMiUbicacion(): void {
    this.ubicacionService.obtenerUbicacion().subscribe({
      next: (coordenadas) => {
        const posicion: LatLngTuple = [coordenadas.latitud, coordenadas.longitud];
        this.ubicar(posicion);
        this.mapa?.setView(posicion, ZOOM_CERCANO);
      },
      error: (error: unknown) => this.error.set(this.errorService.obtenerMensaje(error)),
    });
  }

  actualizarMarcadorDesdeCampos(): void {
    const posicion = this.posicionGuardada();
    if (posicion) {
      this.ubicar(posicion);
      this.mapa?.setView(posicion, ZOOM_CERCANO);
    }
  }

  guardar(): void {
    const problema = primerError(REGLAS_CONJUNTO, this.datos);
    this.error.set(problema);
    if (problema) {
      return;
    }
    this.guardando.set(true);
    this.peticionGuardar(limpiarDatosConjunto(this.datos)).subscribe({
      next: (mensaje) => {
        this.guardando.set(false);
        this.toastService.mostrar(mensaje || 'Conjunto guardado.');
        this.guardado.emit();
      },
      error: (error: unknown) => {
        this.guardando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos guardar el conjunto.'));
      },
    });
  }

  private peticionGuardar(datos: DatosConjunto): Observable<string> {
    return this.conjunto
      ? this.conjuntoService.actualizar(this.conjunto.id, datos)
      : this.conjuntoService.crear(datos);
  }

  private posicionGuardada(): LatLngTuple | null {
    const { latitud, longitud } = this.datos;
    return latitud !== null && longitud !== null ? [latitud, longitud] : null;
  }

  private ubicar(posicion: LatLngTuple): void {
    const [latitud, longitud] = posicion;
    this.datos.latitud = Number(latitud.toFixed(DECIMALES_COORDENADA));
    this.datos.longitud = Number(longitud.toFixed(DECIMALES_COORDENADA));
    this.cambios.markForCheck();
    if (this.marcador) {
      this.marcador.setLatLng(posicion);
      return;
    }
    if (this.mapa) {
      this.marcador = leaflet().marker(posicion, { icon: crearIconoMarcador(true) }).addTo(this.mapa);
    }
  }
}
