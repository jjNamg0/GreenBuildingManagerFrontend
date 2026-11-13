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

  buscar(): void {
    this.filtros.pagina = 0;
    this.cargar();
  }

  limpiar(): void {
    this.filtros = { ...FILTROS_AUDITORIA_VACIOS };
    this.cargar();
  }

  irAPagina(numero: number): void {
    this.filtros.pagina = numero;
    this.cargar();
  }

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
