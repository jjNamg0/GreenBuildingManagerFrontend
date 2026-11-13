import { Component, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { claseSpinner } from '../../models/opcionmodel';
import {
  INTERESES,
  RecomendacionEspacio,
  RecomendacionEvento,
} from '../../models/recomendacionmodel';
import { Authservice } from '../../services/authservice';
import { Errorservice } from '../../services/errorservice';
import { Recomendacionservice } from '../../services/recomendacionservice';
import { Toastservice } from '../../services/toastservice';
import { Usuarioservice } from '../../services/usuarioservice';

@Component({
  selector: 'app-paraticomponent',
  standalone: false,
  styleUrl: './paraticomponent.css',
  templateUrl: './paraticomponent.html',
})
export class Paraticomponent implements OnInit {
  readonly INTERESES = INTERESES;
  readonly claseSpinner = claseSpinner;

  intereses = signal<string[]>([]);
  eventos = signal<RecomendacionEvento[]>([]);
  espacios = signal<RecomendacionEspacio[]>([]);
  cargando = signal(true);
  error = signal('');
  guardando = signal(false);
  cambiosSinGuardar = signal(false);

  constructor(
    private authService: Authservice,
    private usuarioService: Usuarioservice,
    private recomendacionService: Recomendacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.authService.cargarUsuario().subscribe({
      next: (usuario) => this.intereses.set(usuario.intereses),
      error: () => this.intereses.set([]),
    });
    this.cargarRecomendaciones();
  }

  get listo(): boolean {
    return !this.cargando() && this.error() === '';
  }

  cargarRecomendaciones(): void {
    this.cargando.set(true);
    this.error.set('');
    forkJoin({
      eventos: this.recomendacionService.obtenerEventos(),
      espacios: this.recomendacionService.obtenerEspacios(),
    }).subscribe({
      next: ({ eventos, espacios }) => {
        this.eventos.set(eventos);
        this.espacios.set(espacios);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(
          this.errorService.obtenerMensaje(error, 'No pudimos cargar tus recomendaciones.'),
        );
      },
    });
  }

  estaElegido(valor: string): boolean {
    return this.intereses().includes(valor);
  }

  alternarInteres(valor: string): void {
    const actuales = this.intereses();
    this.intereses.set(
      this.estaElegido(valor)
        ? actuales.filter((interes) => interes !== valor)
        : [...actuales, valor],
    );
    this.cambiosSinGuardar.set(true);
  }

  guardarIntereses(): void {
    this.guardando.set(true);
    this.usuarioService.actualizarIntereses({ intereses: this.intereses() }).subscribe({
      next: (mensaje) => {
        this.guardando.set(false);
        this.cambiosSinGuardar.set(false);
        this.toastService.mostrar(
          mensaje || 'Guardamos tus intereses. Actualizamos tus recomendaciones.',
        );
        this.cargarRecomendaciones();
      },
      error: (error: unknown) => {
        this.guardando.set(false);
        this.toastService.mostrar(this.errorService.obtenerMensaje(error), 'error');
      },
    });
  }
}
