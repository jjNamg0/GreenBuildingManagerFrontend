import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Evento,
  FiltrosEvento,
  TIPOS_EVENTO,
  TipoEvento,
  mensajeAsistencia,
} from '../../models/eventomodel';
import { Usuario, tieneUnidad } from '../../models/usuariomodel';
import { Authservice } from '../../services/authservice';
import { Errorservice } from '../../services/errorservice';
import { Eventoservice } from '../../services/eventoservice';
import { Toastservice } from '../../services/toastservice';

/** Pantalla del residente con los eventos de su conjunto, filtros y confirmación de asistencia. */
@Component({
  selector: 'app-eventoscomponent',
  standalone: false,
  styleUrl: './eventoscomponent.css',
  templateUrl: './eventoscomponent.html',
})
export class Eventoscomponent implements OnInit {
  readonly TIPOS = TIPOS_EVENTO;

  private conjuntoId: number | null = null;
  filtros: FiltrosEvento = { tipo: '', paraNinos: false };
  eventos = signal<Evento[]>([]);
  cargando = signal(true);
  error = signal('');
  sinConjunto = signal(false);
  procesando = signal<number | null>(null);

  constructor(
    private authService: Authservice,
    private eventoService: Eventoservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  /** Carga el usuario y, si tiene unidad, sus eventos. */
  ngOnInit(): void {
    this.authService.cargarUsuario().subscribe({
      next: (usuario) => this.alCargarUsuario(usuario),
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error));
      },
    });
  }

  get sinEventos(): boolean {
    return !this.cargando() && this.error() === '' && this.eventos().length === 0;
  }

  /** Pide al back los eventos del conjunto con los filtros actuales. */
  cargar(): void {
    if (this.conjuntoId === null) {
      return;
    }
    this.cargando.set(true);
    this.error.set('');
    this.eventoService.obtenerPorConjunto(this.conjuntoId, this.filtros).subscribe({
      next: (eventos) => {
        this.eventos.set(eventos);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos cargar los eventos.'));
      },
    });
  }

  /** Filtra los eventos por tipo. */
  elegirTipo(tipo: TipoEvento | ''): void {
    this.filtros.tipo = tipo;
    this.cargar();
  }

  /** Activa o desactiva el filtro de planes para niños. */
  alternarNinos(): void {
    this.filtros.paraNinos = !this.filtros.paraNinos;
    this.cargar();
  }

  /** Inscribe o retira al residente del evento. */
  alternarAsistencia(evento: Evento): void {
    this.procesando.set(evento.id);
    this.peticionAsistencia(evento).subscribe({
      next: (mensaje) => {
        this.procesando.set(null);
        this.toastService.mostrar(mensaje || mensajeAsistencia(evento));
        this.cargar();
      },
      error: (error: unknown) => {
        this.procesando.set(null);
        this.toastService.mostrar(this.errorService.obtenerMensaje(error), 'error');
      },
    });
  }

  /** Guarda el conjunto del usuario y carga los eventos si tiene unidad. */
  private alCargarUsuario(usuario: Usuario): void {
    this.conjuntoId = usuario.conjuntoId;
    if (!tieneUnidad(usuario)) {
      this.sinConjunto.set(true);
      this.cargando.set(false);
      return;
    }
    this.cargar();
  }

  /** Elige entre inscribirse o cancelar la asistencia. */
  private peticionAsistencia(evento: Evento): Observable<string> {
    return evento.asistire
      ? this.eventoService.noAsistir(evento.id)
      : this.eventoService.asistir(evento.id);
  }
}
