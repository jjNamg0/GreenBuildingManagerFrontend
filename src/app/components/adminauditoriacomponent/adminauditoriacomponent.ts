import { Component, OnInit, signal } from '@angular/core';
import {
  ACCIONES_AUDITORIA,
  FILTROS_AUDITORIA_VACIOS,
  FiltrosAuditoria,
  RegistroAuditoria,
} from '../../models/auditoriamodel';
import { Pagina } from '../../models/paginamodel';
import { Auditoriaservice } from '../../services/auditoriaservice';
import { Errorservice } from '../../services/errorservice';

/** Pantalla de auditoría: lista paginada y filtrable de las acciones registradas en el sistema. */
@Component({
  selector: 'app-adminauditoriacomponent',
  standalone: false,
  styleUrl: './adminauditoriacomponent.css',
  templateUrl: './adminauditoriacomponent.html',
})
export class Adminauditoriacomponent implements OnInit {
  readonly ACCIONES = ACCIONES_AUDITORIA;

  filtros: FiltrosAuditoria = { ...FILTROS_AUDITORIA_VACIOS };
  pagina = signal<Pagina<RegistroAuditoria> | null>(null);
  cargando = signal(true);
  error = signal('');

  constructor(
    private auditoriaService: Auditoriaservice,
    private errorService: Errorservice,
  ) {}

  /** Carga la primera página de registros. */
  ngOnInit(): void {
    this.cargar();
  }

  get registros(): RegistroAuditoria[] {
    return this.pagina()?.content ?? [];
  }

  get sinRegistros(): boolean {
    return !this.cargando() && this.error() === '' && this.registros.length === 0;
  }

  get hayRegistros(): boolean {
    return !this.cargando() && this.registros.length > 0;
  }

  get numeroPagina(): number {
    return this.pagina()?.number ?? 0;
  }

  get totalPaginas(): number {
    return this.pagina()?.totalPages ?? 0;
  }

  get totalRegistros(): number {
    return this.pagina()?.totalElements ?? 0;
  }

  /** Aplica los filtros y vuelve a la primera página. */
  buscar(): void {
    this.filtros.pagina = 0;
    this.cargar();
  }

  /** Borra los filtros y recarga la lista. */
  limpiar(): void {
    this.filtros = { ...FILTROS_AUDITORIA_VACIOS };
    this.cargar();
  }

  /** Cambia a la página indicada y recarga los registros. */
  irAPagina(numero: number): void {
    this.filtros.pagina = numero;
    this.cargar();
  }

  /** Pide al back la página de registros con los filtros actuales. */
  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.auditoriaService
      .obtenerRegistros({ ...this.filtros, usuario: this.filtros.usuario.trim() })
      .subscribe({
        next: (pagina) => {
          this.pagina.set(pagina);
          this.cargando.set(false);
        },
        error: (error: unknown) => {
          this.cargando.set(false);
          this.error.set(
            this.errorService.obtenerMensaje(error, 'No pudimos cargar la auditoría.'),
          );
        },
      });
  }
}
