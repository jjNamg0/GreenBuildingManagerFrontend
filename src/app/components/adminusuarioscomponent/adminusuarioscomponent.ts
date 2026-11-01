import { Component, OnInit } from '@angular/core';
import { Toastservice } from '../../services/toastservice';
import { Adminservice } from '../../services/adminservice';
import { Adminconjuntoservice } from '../../services/adminconjuntoservice';
import { Authservice } from '../../services/authservice';
import { Usuario } from '../../models/usuariomodel';
import { Conjunto } from '../../models/conjuntomodel';
import { Unidad } from '../../models/unidadmodel';
import { normalizarTexto } from '../../services/validaciones';

@Component({
  selector: 'app-adminusuarioscomponent',
  standalone: false,
  templateUrl: './adminusuarioscomponent.html',
  styleUrl: './adminusuarioscomponent.css',
})
export class Adminusuarioscomponent implements OnInit {
  usuarios: Usuario[] = [];
  cargando = true;
  error = '';
  busqueda = '';
  rol = '';
  pagina = 1;
  readonly TAMANO_PAGINA = 15;

  mostrarConfirmacion = false;
  usuarioPendiente: Usuario | null = null;
  procesando = false;

  mostrarAsignacion = false;
  usuarioAsignando: Usuario | null = null;
  conjuntos: Conjunto[] = [];
  unidades: Unidad[] = [];
  conjuntoElegido = 0;
  unidadElegida = 0;
  errorAsignacion = '';
  guardandoAsignacion = false;

  mostrarRechazo = false;
  usuarioRechazando: Usuario | null = null;
  motivoRechazo = '';
  errorRechazo = '';
  rechazando = false;

  constructor(
    private adminService: Adminservice,
    private adminConjuntoService: Adminconjuntoservice,
    private auth: Authservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  get filtrados(): Usuario[] {
    const texto = normalizarTexto(this.busqueda);
    return this.usuarios.filter(
      (u) =>
        (!texto ||
          normalizarTexto(`${u.nombre} ${u.apellido}`).includes(texto) ||
          normalizarTexto(u.email).includes(texto) ||
          normalizarTexto(u.conjuntoNombre ?? '').includes(texto)) &&
        (!this.rol || (this.rol === 'SOLICITUD' ? !!u.conjuntoSolicitadoId : u.rol === this.rol)),
    );
  }

  get paginados(): Usuario[] {
    const inicio = (this.pagina - 1) * this.TAMANO_PAGINA;
    return this.filtrados.slice(inicio, inicio + this.TAMANO_PAGINA);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.filtrados.length / this.TAMANO_PAGINA));
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  get sinVerificar(): number {
    return this.usuarios.filter((u) => !u.verificado).length;
  }

  get sinUnidad(): number {
    return this.usuarios.filter((u) => u.rol === 'RESIDENTE' && !u.unidadId && !u.conjuntoSolicitadoId).length;
  }

  get solicitudes(): number {
    return this.usuarios.filter((u) => !!u.conjuntoSolicitadoId).length;
  }

  get aceptando(): boolean {
    return !!this.usuarioAsignando?.conjuntoSolicitadoId;
  }

  verSolicitudes(): void {
    this.rol = 'SOLICITUD';
    this.alFiltrar();
  }

  esYo(usuario: Usuario): boolean {
    return this.auth.usuario?.id === usuario.id;
  }

  iniciales(usuario: Usuario): string {
    return `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.adminService.obtenerUsuarios().subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.usuarios = resultado.datos;
    });
  }

  alFiltrar(): void {
    this.pagina = 1;
  }

  pedirConfirmacion(usuario: Usuario): void {
    this.usuarioPendiente = usuario;
    this.mostrarConfirmacion = true;
  }

  cancelarConfirmacion(): void {
    this.mostrarConfirmacion = false;
    this.usuarioPendiente = null;
  }

  confirmarCambioEstado(): void {
    const usuario = this.usuarioPendiente;
    if (!usuario) {
      return;
    }
    this.procesando = true;
    this.adminService.cambiarEstadoUsuario(usuario.id, !usuario.activo).subscribe((resultado) => {
      this.procesando = false;
      if (!resultado.exito) {
        this.toastService.mostrar(resultado.mensaje, 'error');
        this.cancelarConfirmacion();
        return;
      }
      this.reemplazar(resultado.datos);
      this.toastService.mostrar(resultado.datos.activo ? 'Usuario activado' : 'Usuario desactivado');
      this.cancelarConfirmacion();
    });
  }

  abrirAsignacion(usuario: Usuario): void {
    this.usuarioAsignando = usuario;
    this.conjuntoElegido = usuario.conjuntoId ?? usuario.conjuntoSolicitadoId ?? 0;
    this.unidadElegida = usuario.unidadId ?? 0;
    this.errorAsignacion = '';
    this.unidades = [];
    this.mostrarAsignacion = true;
    this.adminConjuntoService.obtenerConjuntos().subscribe((resultado) => {
      if (!resultado.exito) {
        this.errorAsignacion = resultado.mensaje;
        return;
      }
      this.conjuntos = resultado.datos.filter((c) => c.activo);
      if (this.conjuntoElegido) {
        this.cargarUnidades(false);
      }
    });
  }

  cerrarAsignacion(): void {
    this.mostrarAsignacion = false;
    this.usuarioAsignando = null;
  }

  cargarUnidades(reiniciar: boolean): void {
    if (reiniciar) {
      this.unidadElegida = 0;
    }
    this.unidades = [];
    this.errorAsignacion = '';
    if (!this.conjuntoElegido) {
      return;
    }
    this.adminConjuntoService.obtenerUnidades(this.conjuntoElegido).subscribe((resultado) => {
      if (!resultado.exito) {
        this.errorAsignacion = resultado.mensaje;
        return;
      }
      this.unidades = resultado.datos.filter((u) => u.activo);
    });
  }

  guardarAsignacion(quitar: boolean): void {
    const usuario = this.usuarioAsignando;
    if (!usuario) {
      return;
    }
    if (!quitar && !this.unidadElegida) {
      this.errorAsignacion = 'Escoge el conjunto y la unidad.';
      return;
    }
    const aceptaba = this.aceptando;
    this.guardandoAsignacion = true;
    this.adminService.asignarUnidad(usuario.id, quitar ? null : Number(this.unidadElegida)).subscribe((resultado) => {
      this.guardandoAsignacion = false;
      if (!resultado.exito) {
        this.errorAsignacion = resultado.mensaje;
        return;
      }
      this.reemplazar(resultado.datos);
      this.toastService.mostrar(quitar ? 'Se quitó la unidad' : aceptaba ? 'Solicitud aceptada' : 'Unidad asignada');
      this.cerrarAsignacion();
    });
  }

  abrirRechazo(usuario: Usuario): void {
    this.usuarioRechazando = usuario;
    this.motivoRechazo = '';
    this.errorRechazo = '';
    this.mostrarRechazo = true;
  }

  cerrarRechazo(): void {
    this.mostrarRechazo = false;
    this.usuarioRechazando = null;
  }

  confirmarRechazo(): void {
    const usuario = this.usuarioRechazando;
    if (!usuario) {
      return;
    }
    if (!this.motivoRechazo.trim()) {
      this.errorRechazo = 'Escribe el motivo. Le llegará al residente por correo.';
      return;
    }
    this.rechazando = true;
    this.adminService.rechazarSolicitudConjunto(usuario.id, this.motivoRechazo.trim()).subscribe((resultado) => {
      this.rechazando = false;
      if (!resultado.exito) {
        this.errorRechazo = resultado.mensaje;
        return;
      }
      this.reemplazar(resultado.datos);
      this.toastService.mostrar('Solicitud rechazada');
      this.cerrarRechazo();
    });
  }

  private reemplazar(actualizado: Usuario): void {
    this.usuarios = this.usuarios.map((u) => (u.id === actualizado.id ? actualizado : u));
  }
}
