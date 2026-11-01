import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toastservice } from '../../services/toastservice';
import * as L from 'leaflet';
import { Adminconjuntoservice } from '../../services/adminconjuntoservice';
import { Anillo, Geografiaservice } from '../../services/geografiaservice';
import { Conjunto } from '../../models/conjuntomodel';
import { MUNICIPIOS, TIPOS_CONJUNTO } from '../../models/opcionesmodel';

const LIMITES_CUNDINAMARCA: L.LatLngTuple[] = [
  [3.7, -74.9],
  [5.85, -73.0],
];

const ICONO_CONJUNTO = L.divIcon({
  className: '',
  html: '<i class="bi bi-geo-alt-fill gb-marcador seleccionado"></i>',
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});

@Component({
  selector: 'app-conjuntoformcomponent',
  standalone: false,
  templateUrl: './conjuntoformcomponent.html',
  styleUrl: './conjuntoformcomponent.css',
})
export class Conjuntoformcomponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contenedorMapa') contenedorMapa!: ElementRef<HTMLDivElement>;

  readonly tiposConjunto = TIPOS_CONJUNTO;
  readonly municipios = MUNICIPIOS;

  conjunto: Conjunto = {
    id: 0,
    nombre: '',
    tipo: 'APARTAMENTOS',
    direccion: '',
    municipio: '',
    telefono: '',
    descripcion: '',
    latitud: null,
    longitud: null,
    imagen: '',
    activo: true,
  };
  idEditando: number | null = null;
  cargando = false;
  guardando = false;
  buscandoDireccion = false;
  error = '';

  private mapa: L.Map | null = null;
  private marcador: L.Marker | null = null;
  private contornos: Anillo[] = [];

  constructor(
    private adminConjuntoService: Adminconjuntoservice,
    private geografiaService: Geografiaservice,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idEditando = Number(id);
      this.cargando = true;
      this.adminConjuntoService.obtenerConjunto(this.idEditando).subscribe((resultado) => {
        this.cargando = false;
        if (!resultado.exito) {
          this.error = resultado.mensaje;
          return;
        }
        const conjunto = resultado.datos;
        this.conjunto = {
          ...conjunto,
          telefono: conjunto.telefono ?? '',
          descripcion: conjunto.descripcion ?? '',
          imagen: conjunto.imagen ?? '',
        };
        this.pintarMarcador(true);
      });
    }
  }

  ngAfterViewInit(): void {
    this.mapa = L.map(this.contenedorMapa.nativeElement);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      className: 'capa-oscura',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.mapa);
    this.mapa.fitBounds(LIMITES_CUNDINAMARCA);
    this.mapa.setMaxBounds(L.latLngBounds(LIMITES_CUNDINAMARCA).pad(0.15));
    this.mapa.on('click', (evento: L.LeafletMouseEvent) => {
      const latitud = Number(evento.latlng.lat.toFixed(6));
      const longitud = Number(evento.latlng.lng.toFixed(6));
      this.adminConjuntoService.validarUbicacion(latitud, longitud).subscribe((resultado) => {
        if (!resultado.exito) {
          this.toastService.mostrar(resultado.mensaje, 'error');
          return;
        }
        this.conjunto.latitud = latitud;
        this.conjunto.longitud = longitud;
        this.error = '';
        this.pintarMarcador(false);
      });
    });
    this.geografiaService.obtenerContornos().subscribe((contornos) => {
      this.contornos = contornos;
      this.pintarContorno();
    });
    setTimeout(() => {
      this.mapa?.invalidateSize();
      if (this.conjunto.latitud === null) {
        this.mapa?.fitBounds(LIMITES_CUNDINAMARCA);
      }
      if (this.mapa) {
        this.mapa.setMinZoom(this.mapa.getBoundsZoom(LIMITES_CUNDINAMARCA));
      }
      this.pintarMarcador(true);
    }, 0);
  }

  ngOnDestroy(): void {
    this.mapa?.remove();
    this.mapa = null;
  }

  get titulo(): string {
    return this.idEditando ? 'Editar conjunto' : 'Nuevo conjunto';
  }

  buscarDireccion(): void {
    if (!this.conjunto.direccion.trim() || !this.conjunto.municipio) {
      this.error = 'Escribe la dirección y escoge el municipio para buscarla en el mapa.';
      return;
    }
    this.buscandoDireccion = true;
    const municipio = this.conjunto.municipio === 'Bogotá D.C.' ? 'Bogotá' : this.conjunto.municipio;
    const consulta = `${this.conjunto.direccion}, ${municipio}, Cundinamarca, Colombia`;
    this.adminConjuntoService.obtenerCoordenadas(consulta).subscribe((resultado) => {
      this.buscandoDireccion = false;
      if (!resultado.exito) {
        this.toastService.mostrar(resultado.mensaje, 'error');
        return;
      }
      const coordenadas = resultado.datos;
      this.conjunto.latitud = Number(coordenadas.latitud.toFixed(6));
      this.conjunto.longitud = Number(coordenadas.longitud.toFixed(6));
      this.pintarMarcador(true);
      this.toastService.mostrar('Revisa que el punto quedó bien. Si no, haz clic en el lugar correcto.');
    });
  }

  guardar(): void {
    this.error = this.validar();
    if (this.error) {
      return;
    }
    this.guardando = true;
    const peticion = this.idEditando
      ? this.adminConjuntoService.editarConjunto(this.idEditando, this.conjunto)
      : this.adminConjuntoService.crearConjunto(this.conjunto);
    peticion.subscribe((resultado) => {
      this.guardando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.toastService.mostrar(this.idEditando ? 'Conjunto actualizado' : 'Conjunto creado');
      this.router.navigate(['/admin/conjuntos', resultado.datos.id]);
    });
  }

  private validar(): string {
    if (!this.conjunto.nombre.trim()) {
      return 'Escribe el nombre del conjunto.';
    }
    if (!this.conjunto.municipio) {
      return 'Escoge el municipio.';
    }
    if (!this.conjunto.direccion.trim()) {
      return 'Escribe la dirección.';
    }
    if (this.conjunto.telefono && !/^[0-9 +()-]{7,20}$/.test(this.conjunto.telefono.trim())) {
      return 'El teléfono solo puede tener números, espacios y los signos + ( ) -.';
    }
    if (this.conjunto.imagen && !/^[A-Za-z0-9]+\.(png|jpg|jpeg|webp)$/.test(this.conjunto.imagen.trim())) {
      return 'La imagen debe ser el nombre de un archivo png, jpg o webp de la carpeta assets/images, solo con letras y números (ejemplo: salonSocial.png).';
    }
    if (this.conjunto.latitud === null || this.conjunto.longitud === null) {
      return 'Marca la ubicación del conjunto en el mapa.';
    }
    return '';
  }

  private pintarContorno(): void {
    if (!this.mapa || this.contornos.length === 0) {
      return;
    }
    const anillos = this.contornos.map((anillo) => anillo.map(([lon, lat]) => L.latLng(lat, lon)));
    const mundo = [L.latLng(85, -180), L.latLng(85, 180), L.latLng(-85, 180), L.latLng(-85, -180)];
    L.polygon([mundo, ...anillos], { fillColor: '#0f1412', fillOpacity: 0.85, stroke: false, interactive: false, className: 'gb-mascara' }).addTo(this.mapa);
    L.polygon(anillos, { color: '#3dbe7a', weight: 2, opacity: 0.8, fill: false, interactive: false, className: 'gb-contorno' }).addTo(this.mapa);
  }

  private pintarMarcador(centrar: boolean): void {
    if (!this.mapa || this.conjunto.latitud === null || this.conjunto.longitud === null) {
      return;
    }
    const punto: L.LatLngExpression = [this.conjunto.latitud, this.conjunto.longitud];
    if (this.marcador) {
      this.marcador.setLatLng(punto);
    } else {
      this.marcador = L.marker(punto, { icon: ICONO_CONJUNTO }).addTo(this.mapa);
    }
    if (centrar) {
      this.mapa.setView(punto, 16);
    }
  }
}
