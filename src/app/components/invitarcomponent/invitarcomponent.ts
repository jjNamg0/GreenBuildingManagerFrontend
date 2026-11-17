import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import {
  DestinoInvitacion,
  Invitado,
  MAX_CORREOS_INVITACION,
  enlaceWhatsapp,
  errorCorreos,
  separarCorreos,
} from '../../models/invitacionmodel';
import { claseSpinner } from '../../models/opcionmodel';
import { Errorservice } from '../../services/errorservice';
import { Invitacionservice } from '../../services/invitacionservice';
import { Toastservice } from '../../services/toastservice';

/** Modal para compartir el enlace de una invitación y enviarla por correo a varios invitados. */
@Component({
  selector: 'app-invitarcomponent',
  standalone: false,
  styleUrl: './invitarcomponent.css',
  templateUrl: './invitarcomponent.html',
})
export class Invitarcomponent implements OnInit {
  @Input() destino!: DestinoInvitacion;
  @Output() readonly cerrar = new EventEmitter<void>();

  readonly claseSpinner = claseSpinner;
  readonly MAX_CORREOS = MAX_CORREOS_INVITACION;

  texto = '';
  enlace = signal('');
  invitados = signal<Invitado[]>([]);
  enviando = signal(false);
  error = signal('');

  constructor(
    private invitacionService: Invitacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  /** Pide el enlace y los invitados anteriores. */
  ngOnInit(): void {
    this.invitacionService.obtenerEnlace(this.destino).subscribe({
      next: (enlace) => this.enlace.set(enlace),
      error: (error: unknown) =>
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos generar el enlace.')),
    });
    this.cargarInvitados();
  }

  get correos(): string[] {
    return separarCorreos(this.texto);
  }

  get textoContador(): string {
    return `${this.correos.length} de ${this.MAX_CORREOS} correos`;
  }

  get enlaceWhatsapp(): string {
    return enlaceWhatsapp(this.destino, this.enlace());
  }

  get sinInvitados(): boolean {
    return this.invitados().length === 0;
  }

  /** Copia el enlace en el portapapeles; si el navegador no lo permite, lo deja seleccionado. */
  async copiarEnlace(campo: HTMLInputElement): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.enlace());
      this.toastService.mostrar('Enlace copiado. Pégalo donde quieras compartirlo.');
    } catch {
      campo.select();
      this.toastService.mostrar('Tu navegador no dejó copiar. El enlace quedó seleccionado: presiona Ctrl+C.', 'error');
    }
  }

  /** Revisa los correos y envía la invitación. */
  enviar(): void {
    const correos = this.correos;
    const problema = errorCorreos(correos);
    this.error.set(problema);
    if (problema !== '') {
      return;
    }
    this.enviando.set(true);
    this.invitacionService.enviar(this.destino, { correos }).subscribe({
      next: (mensaje) => {
        this.enviando.set(false);
        this.texto = '';
        this.toastService.mostrar(mensaje || 'Invitaciones enviadas.');
        this.cargarInvitados();
      },
      error: (error: unknown) => {
        this.enviando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos enviar las invitaciones.'));
      },
    });
  }

  /** Pide al back los correos ya invitados. */
  private cargarInvitados(): void {
    this.invitacionService.obtenerInvitados(this.destino).subscribe({
      next: (invitados) => this.invitados.set(invitados),
      error: () => this.invitados.set([]),
    });
  }
}
