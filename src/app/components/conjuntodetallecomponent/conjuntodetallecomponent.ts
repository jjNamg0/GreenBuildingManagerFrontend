import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toastservice } from '../../services/toastservice';
import { Adminconjuntoservice } from '../../services/adminconjuntoservice';
import { Conjunto } from '../../models/conjuntomodel';
import { Unidad } from '../../models/unidadmodel';
import { Espacio } from '../../models/espaciomodel';
import { MODOS_RESERVA, TIPOS_CONJUNTO, TIPOS_ESPACIO, etiquetaDe } from '../../models/opcionesmodel';

@Component({
  selector: 'app-conjuntodetallecomponent',
  standalone: false,
  templateUrl: './conjuntodetallecomponent.html',
  styleUrl: './conjuntodetallecomponent.css',
})
export class Conjuntodetallecomponent implements OnInit {
  conjunto: Conjunto | null = null;
  unidades: Unidad[] = [];
  espacios: Espacio[] = [];
  cargando = true;
  error = '';

  torre = '';
  numero = '';
  unidadEditando: Unidad | null = null;
  guardandoUnidad = false;
  errorUnidad = '';

  mostrarFormularioEspacio = false;
  espacioEditando: Espacio | null = null;
  guardandoEspacio = false;
  errorEspacio = '';

  mostrarConfirmacion = false;
  unidadPendiente: Unidad | null = null;
  espacioPendiente: Espacio | null = null;
  procesando = false;

  private conjuntoId = 0;

  constructor(
    private adminConjuntoService: Adminconjuntoservice,
    private route: ActivatedRoute,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.conjuntoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargar();
  }

  get esDeCasas(): boolean {
    return this.conjunto?.tipo === 'CASAS';
  }

  get etiquetaGrupo(): string {
    return this.esDeCasas ? 'Manzana' : 'Torre';
  }

  get idConjunto(): number {
    return this.conjuntoId;
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.adminConjuntoService.obtenerConjunto(this.conjuntoId).subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.conjunto = resultado.datos;
      this.cargarUnidades();
      this.cargarEspacios();
    });
  }

  etiquetaTipoConjunto(tipo: string): string {
    return etiquetaDe(TIPOS_CONJUNTO, tipo);
  }

  etiquetaTipoEspacio(tipo: string): string {
    return etiquetaDe(TIPOS_ESPACIO, tipo);
  }

  etiquetaModo(modo: string): string {
    return etiquetaDe(MODOS_RESERVA, modo).split(':')[0];
  }

  hora(valor: string): string {
    return valor ? valor.slice(0, 5) : '';
  }

  editarUnidad(unidad: Unidad): void {
    this.unidadEditando = unidad;
    this.torre = unidad.torre ?? '';
    this.numero = unidad.numero;
    this.errorUnidad = '';
  }

  cancelarUnidad(): void {
    this.unidadEditando = null;
    this.torre = '';
    this.numero = '';
    this.errorUnidad = '';
  }

  guardarUnidad(): void {
    if (!this.numero.trim()) {
      this.errorUnidad = this.esDeCasas ? 'Escribe el número de la casa.' : 'Escribe el número del apartamento.';
      return;
    }
    const datos: Unidad = {
      id: this.unidadEditando?.id ?? 0,
      conjuntoId: this.conjuntoId,
      torre: this.torre.trim() || null,
      numero: this.numero.trim(),
      descripcion: '',
      activo: true,
    };
    this.guardandoUnidad = true;
    const peticion = this.unidadEditando
      ? this.adminConjuntoService.editarUnidad(this.unidadEditando.id, datos)
      : this.adminConjuntoService.crearUnidad(this.conjuntoId, datos);
    peticion.subscribe((resultado) => {
      this.guardandoUnidad = false;
      if (!resultado.exito) {
        this.errorUnidad = resultado.mensaje;
        return;
      }
      this.toastService.mostrar(this.unidadEditando ? 'Unidad actualizada' : 'Unidad creada');
      this.cancelarUnidad();
      this.cargarUnidades();
    });
  }

  nuevoEspacio(): void {
    this.espacioEditando = null;
    this.errorEspacio = '';
    this.mostrarFormularioEspacio = true;
  }

  editarEspacio(espacio: Espacio): void {
    this.espacioEditando = espacio;
    this.errorEspacio = '';
    this.mostrarFormularioEspacio = true;
  }

  cerrarFormularioEspacio(): void {
    this.mostrarFormularioEspacio = false;
    this.espacioEditando = null;
    this.errorEspacio = '';
  }

  guardarEspacio(espacio: Espacio): void {
    this.guardandoEspacio = true;
    this.errorEspacio = '';
    const peticion = this.espacioEditando
      ? this.adminConjuntoService.editarEspacio(this.espacioEditando.id, espacio)
      : this.adminConjuntoService.crearEspacio(this.conjuntoId, espacio);
    peticion.subscribe((resultado) => {
      this.guardandoEspacio = false;
      if (!resultado.exito) {
        this.errorEspacio = resultado.mensaje;
        return;
      }
      this.toastService.mostrar(this.espacioEditando ? 'Espacio actualizado' : 'Espacio creado');
      this.cerrarFormularioEspacio();
      this.cargarEspacios();
    });
  }

  pedirConfirmacionUnidad(unidad: Unidad): void {
    this.unidadPendiente = unidad;
    this.espacioPendiente = null;
    this.mostrarConfirmacion = true;
  }

  pedirConfirmacionEspacio(espacio: Espacio): void {
    this.espacioPendiente = espacio;
    this.unidadPendiente = null;
    this.mostrarConfirmacion = true;
  }

  cancelarConfirmacion(): void {
    this.mostrarConfirmacion = false;
    this.unidadPendiente = null;
    this.espacioPendiente = null;
  }

  get tituloConfirmacion(): string {
    const activo = this.unidadPendiente?.activo ?? this.espacioPendiente?.activo ?? false;
    const cosa = this.unidadPendiente ? 'unidad' : 'espacio';
    return `${activo ? 'Desactivar' : 'Activar'} ${cosa}`;
  }

  get mensajeConfirmacion(): string {
    if (this.unidadPendiente) {
      return this.unidadPendiente.activo
        ? `¿Seguro que quieres desactivar ${this.unidadPendiente.descripcion}? No se le podrán asignar residentes.`
        : `¿Seguro que quieres activar ${this.unidadPendiente.descripcion}?`;
    }
    if (this.espacioPendiente) {
      return this.espacioPendiente.activo
        ? `¿Seguro que quieres desactivar ${this.espacioPendiente.nombre}? Los residentes dejarán de verlo.`
        : `¿Seguro que quieres activar ${this.espacioPendiente.nombre}? Los residentes lo volverán a ver.`;
    }
    return '';
  }

  get confirmacionDesactiva(): boolean {
    return this.unidadPendiente?.activo ?? this.espacioPendiente?.activo ?? false;
  }

  confirmarCambioEstado(): void {
    this.procesando = true;
    if (this.unidadPendiente) {
      const unidad = this.unidadPendiente;
      this.adminConjuntoService.cambiarEstadoUnidad(unidad.id, !unidad.activo).subscribe((resultado) => {
        if (!resultado.exito) {
          this.fallarCambioEstado(resultado.mensaje);
          return;
        }
        const actualizada = resultado.datos;
        this.unidades = this.unidades.map((u) => (u.id === actualizada.id ? actualizada : u));
        this.terminarCambioEstado(actualizada.activo ? 'Unidad activada' : 'Unidad desactivada');
      });
      return;
    }
    if (this.espacioPendiente) {
      const espacio = this.espacioPendiente;
      this.adminConjuntoService.cambiarEstadoEspacio(espacio.id, !espacio.activo).subscribe((resultado) => {
        if (!resultado.exito) {
          this.fallarCambioEstado(resultado.mensaje);
          return;
        }
        const actualizado = resultado.datos;
        this.espacios = this.espacios.map((e) => (e.id === actualizado.id ? actualizado : e));
        this.terminarCambioEstado(actualizado.activo ? 'Espacio activado' : 'Espacio desactivado');
      });
    }
  }

  private terminarCambioEstado(mensaje: string): void {
    this.procesando = false;
    this.toastService.mostrar(mensaje);
    this.cancelarConfirmacion();
  }

  private fallarCambioEstado(mensaje: string): void {
    this.procesando = false;
    this.toastService.mostrar(mensaje, 'error');
    this.cancelarConfirmacion();
  }

  private cargarUnidades(): void {
    this.adminConjuntoService.obtenerUnidades(this.conjuntoId).subscribe((resultado) => {
      if (!resultado.exito) {
        this.toastService.mostrar(resultado.mensaje, 'error');
        return;
      }
      this.unidades = resultado.datos;
    });
  }

  private cargarEspacios(): void {
    this.adminConjuntoService.obtenerEspacios(this.conjuntoId).subscribe((resultado) => {
      if (!resultado.exito) {
        this.toastService.mostrar(resultado.mensaje, 'error');
        return;
      }
      this.espacios = resultado.datos;
    });
  }
}
