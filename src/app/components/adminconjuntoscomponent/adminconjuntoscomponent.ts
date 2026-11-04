import { Component, OnInit } from '@angular/core';
import { Toastservice } from '../../services/toastservice';
import { Adminconjuntoservice } from '../../services/adminconjuntoservice';
import { Conjunto } from '../../models/conjuntomodel';
import { TIPOS_CONJUNTO, etiquetaDe } from '../../models/opcionesmodel';
import { normalizarTexto } from '../../services/validaciones';

@Component({
  selector: 'app-adminconjuntoscomponent',
  standalone: false,
  templateUrl: './adminconjuntoscomponent.html',
  styleUrl: './adminconjuntoscomponent.css',
})
export class Adminconjuntoscomponent implements OnInit {
  conjuntos: Conjunto[] = [];
  cargando = true;
  error = '';
  busqueda = '';
  estado = '';
  pagina = 1;
  readonly TAMANO_PAGINA = 10;

  mostrarConfirmacion = false;
  conjuntoPendiente: Conjunto | null = null;
  procesando = false;

  constructor(
    private adminConjuntoService: Adminconjuntoservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  get filtrados(): Conjunto[] {
    const texto = normalizarTexto(this.busqueda);
    return this.conjuntos.filter(
      (c) =>
        (!texto ||
          normalizarTexto(c.nombre).includes(texto) ||
          normalizarTexto(c.municipio).includes(texto) ||
          normalizarTexto(c.direccion).includes(texto)) &&
        (!this.estado || (this.estado === 'activos' ? c.activo : !c.activo)),
    );
  }

  get paginados(): Conjunto[] {
    const inicio = (this.pagina - 1) * this.TAMANO_PAGINA;
    return this.filtrados.slice(inicio, inicio + this.TAMANO_PAGINA);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.filtrados.length / this.TAMANO_PAGINA));
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  get activos(): number {
    return this.conjuntos.filter((c) => c.activo).length;
  }

  get municipiosCubiertos(): number {
    return new Set(this.conjuntos.map((c) => c.municipio)).size;
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.adminConjuntoService.obtenerConjuntos().subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.conjuntos = resultado.datos;
    });
  }

  alFiltrar(): void {
    this.pagina = 1;
  }

  etiquetaTipo(tipo: string): string {
    return etiquetaDe(TIPOS_CONJUNTO, tipo);
  }

  pedirConfirmacion(conjunto: Conjunto): void {
    this.conjuntoPendiente = conjunto;
    this.mostrarConfirmacion = true;
  }

  cancelarConfirmacion(): void {
    this.mostrarConfirmacion = false;
    this.conjuntoPendiente = null;
  }

  confirmarCambioEstado(): void {
    const conjunto = this.conjuntoPendiente;
    if (!conjunto) {
      return;
    }
    this.procesando = true;
    this.adminConjuntoService.cambiarEstadoConjunto(conjunto.id, !conjunto.activo).subscribe((resultado) => {
      this.procesando = false;
      if (!resultado.exito) {
        this.toastService.mostrar(resultado.mensaje, 'error');
        this.cancelarConfirmacion();
        return;
      }
      const actualizado = resultado.datos;
      this.conjuntos = this.conjuntos.map((c) => (c.id === actualizado.id ? actualizado : c));
      this.toastService.mostrar(actualizado.activo ? 'Conjunto activado' : 'Conjunto desactivado');
      this.cancelarConfirmacion();
    });
  }
}
