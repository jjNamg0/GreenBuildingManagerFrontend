import { Component, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Conjunto, imagenConjunto, textoTipoConjunto } from '../../models/conjuntomodel';
import { Espacio } from '../../models/espaciomodel';
import { Usuario, tieneUnidad } from '../../models/usuariomodel';
import { Authservice } from '../../services/authservice';
import { Conjuntoservice } from '../../services/conjuntoservice';
import { Errorservice } from '../../services/errorservice';
import { Espacioservice } from '../../services/espacioservice';

/** Pantalla del residente con la información de su conjunto, su unidad y sus espacios. */
@Component({
  selector: 'app-miconjuntocomponent',
  standalone: false,
  styleUrl: './miconjuntocomponent.css',
  templateUrl: './miconjuntocomponent.html',
})
export class Miconjuntocomponent implements OnInit {
  readonly textoTipoConjunto = textoTipoConjunto;
  readonly imagenConjunto = imagenConjunto;

  usuario = signal<Usuario | null>(null);
  conjunto = signal<Conjunto | null>(null);
  espacios = signal<Espacio[]>([]);
  cargando = signal(true);
  error = signal('');

  constructor(
    private authService: Authservice,
    private conjuntoService: Conjuntoservice,
    private espacioService: Espacioservice,
    private errorService: Errorservice,
  ) {}

  /** Carga el usuario y su conjunto. */
  ngOnInit(): void {
    this.cargar();
  }

  get pendienteDeUnidad(): boolean {
    const usuario = this.usuario();
    return !this.cargando() && usuario !== null && !tieneUnidad(usuario);
  }

  get sinEspacios(): boolean {
    return this.espacios().length === 0;
  }

  /** Carga la información del conjunto del residente. */
  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.authService.cargarUsuario().subscribe({
      next: (usuario) => this.alCargarUsuario(usuario),
      error: (error: unknown) => this.mostrarError(error),
    });
  }

  /** Guarda el usuario y carga su conjunto si ya tiene unidad. */
  private alCargarUsuario(usuario: Usuario): void {
    this.usuario.set(usuario);
    if (usuario.conjuntoId === null || !tieneUnidad(usuario)) {
      this.cargando.set(false);
      return;
    }
    this.cargarConjunto(usuario.conjuntoId);
  }

  /** Pide al back los datos del conjunto indicado. */
  private cargarConjunto(conjuntoId: number): void {
    forkJoin({
      conjunto: this.conjuntoService.obtenerPorId(conjuntoId),
      espacios: this.espacioService.obtenerPorConjunto(conjuntoId),
    }).subscribe({
      next: ({ conjunto, espacios }) => {
        this.conjunto.set(conjunto);
        this.espacios.set(espacios);
        this.cargando.set(false);
      },
      error: (error: unknown) => this.mostrarError(error),
    });
  }

  /** Muestra el error de carga. */
  private mostrarError(error: unknown): void {
    this.cargando.set(false);
    this.error.set(
      this.errorService.obtenerMensaje(error, 'No pudimos cargar la información de tu conjunto.'),
    );
  }
}
