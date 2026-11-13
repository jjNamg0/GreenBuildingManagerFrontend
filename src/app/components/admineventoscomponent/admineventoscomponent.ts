import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Conjunto } from '../../models/conjuntomodel';
import { Evento } from '../../models/eventomodel';
import { Confirmacionservice } from '../../services/confirmacionservice';
import { Conjuntoservice } from '../../services/conjuntoservice';
import { Errorservice } from '../../services/errorservice';
import { Eventoservice } from '../../services/eventoservice';
import { Toastservice } from '../../services/toastservice';

@Component({
  selector: 'app-admineventoscomponent',
  standalone: false,
  styleUrl: './admineventoscomponent.css',
  templateUrl: './admineventoscomponent.html',
})
export class Admineventoscomponent implements OnInit {
  conjuntos = signal<Conjunto[]>([]);
  conjuntoFiltro: number | null = null;
  eventos = signal<Evento[]>([]);
  cargando = signal(true);
  error = signal('');
  enviando = signal<number | null>(null);
  formularioAbierto = signal(false);
  eventoEditado = signal<Evento | null>(null);

  constructor(
    private eventoService: Eventoservice,
    private conjuntoService: Conjuntoservice,
    private confirmacionService: Confirmacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.conjuntoService.obtenerTodos().subscribe({
      next: (conjuntos) => this.conjuntos.set(conjuntos),
      error: () => this.conjuntos.set([]),
    });
    this.cargar();
  }

  get sinEventos(): boolean {
    return !this.cargando() && this.error() === '' && this.eventos().length === 0;
  }

  get hayEventos(): boolean {
    return !this.cargando() && this.eventos().length > 0;
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.eventoService.obtenerTodos(this.conjuntoFiltro).subscribe({
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

  filtrarPorConjunto(conjuntoId: number | null): void {
    this.conjuntoFiltro = conjuntoId;
    this.cargar();
  }

  abrirFormulario(evento: Evento | null): void {
    this.eventoEditado.set(evento);
    this.formularioAbierto.set(true);
  }

  alGuardar(): void {
    this.formularioAbierto.set(false);
    this.cargar();
  }

  async enviarInvitacion(evento: Evento): Promise<void> {
    const confirmado = await this.confirmacionService.confirmar({
      titulo: 'Enviar invitación por correo',
      texto: `Se enviará "${evento.titulo}" a todos los residentes de ${evento.conjuntoNombre}.`,
      textoConfirmar: 'Enviar invitación',
    });
    if (!confirmado) {
      return;
    }
    this.enviando.set(evento.id);
    this.eventoService.enviarInvitacion(evento.id).subscribe({
      next: (mensaje) => {
        this.enviando.set(null);
        this.toastService.mostrar(mensaje || 'Invitaciones enviadas a los residentes.');
      },
      error: (error: unknown) => {
        this.enviando.set(null);
        this.toastService.mostrar(
          this.errorService.obtenerMensaje(error, 'No pudimos enviar las invitaciones.'),
          'error',
        );
      },
    });
  }

  async cancelar(evento: Evento): Promise<void> {
    const motivo = await this.confirmacionService.pedirTexto({
      titulo: `¿Cancelar "${evento.titulo}"?`,
      texto: 'Los residentes verán el motivo y recibirán un aviso por correo.',
      placeholder: 'Motivo de la cancelación',
      textoConfirmar: 'Cancelar evento',
      obligatorio: true,
    });
    if (motivo !== null) {
      this.enviar(this.eventoService.cancelar(evento.id, { motivo }), 'Evento cancelado.');
    }
  }

  async eliminar(evento: Evento): Promise<void> {
    const confirmado = await this.confirmacionService.confirmar({
      titulo: `¿Eliminar "${evento.titulo}"?`,
      texto: 'Esta acción no se puede deshacer.',
      textoConfirmar: 'Sí, eliminar',
      peligro: true,
    });
    if (confirmado) {
      this.enviar(this.eventoService.eliminar(evento.id), 'Evento eliminado.');
    }
  }

  private enviar(peticion: Observable<string>, porDefecto: string): void {
    peticion.subscribe({
      next: (mensaje) => {
        this.toastService.mostrar(mensaje || porDefecto);
        this.cargar();
      },
      error: (error: unknown) =>
        this.toastService.mostrar(this.errorService.obtenerMensaje(error), 'error'),
    });
  }
}
