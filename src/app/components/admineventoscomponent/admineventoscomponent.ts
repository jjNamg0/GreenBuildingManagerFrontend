import { Component, OnInit } from '@angular/core';
import { Toastservice } from '../../services/toastservice';
import { Eventoservice } from '../../services/eventoservice';
import { Adminconjuntoservice } from '../../services/adminconjuntoservice';
import { Conjunto } from '../../models/conjuntomodel';
import { Evento, NuevoEvento } from '../../models/eventomodel';
import { CATEGORIAS_EVENTO, DISENOS_INVITACION, etiquetaDe } from '../../models/opcionesmodel';

@Component({
  selector: 'app-admineventoscomponent',
  standalone: false,
  templateUrl: './admineventoscomponent.html',
  styleUrl: './admineventoscomponent.css',
})
export class Admineventoscomponent implements OnInit {
  readonly IMAGEN_RESPALDO = 'assets/images/respaldo.svg';

  eventos: Evento[] = [];
  conjuntos: Conjunto[] = [];
  conjuntoId = 0;
  pasados = false;
  cargando = true;
  error = '';

  mostrarFormulario = false;
  eventoEditando: Evento | null = null;
  guardando = false;
  errorEvento = '';

  eventoPendiente: Evento | null = null;
  motivo = '';
  errorMotivo = '';
  procesando = false;

  eventoInvitacion: Evento | null = null;
  datosInvitacion: NuevoEvento | null = null;
  disenoInvitacion = 'CLASICO';
  enviandoInvitacion = false;
  errorInvitacion = '';

  constructor(
    private eventoService: Eventoservice,
    private adminConjuntoService: Adminconjuntoservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.adminConjuntoService
      .obtenerConjuntos()
      .subscribe((resultado) => (this.conjuntos = resultado.exito ? resultado.datos.filter((c) => c.activo) : []));
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.eventoService.obtenerEventosAdmin(this.conjuntoId, this.pasados).subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.eventos = resultado.datos;
    });
  }

  cambiarVista(pasados: boolean): void {
    if (this.pasados !== pasados) {
      this.pasados = pasados;
      this.cargar();
    }
  }

  nuevoEvento(): void {
    this.eventoEditando = null;
    this.errorEvento = '';
    this.mostrarFormulario = true;
  }

  editar(evento: Evento): void {
    this.eventoEditando = evento;
    this.errorEvento = '';
    this.mostrarFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.eventoEditando = null;
    this.errorEvento = '';
  }

  guardar(datos: NuevoEvento): void {
    this.guardando = true;
    this.errorEvento = '';
    const peticion = this.eventoEditando
      ? this.eventoService.editar(this.eventoEditando.id, datos)
      : this.eventoService.crear(datos);
    peticion.subscribe((resultado) => {
      this.guardando = false;
      if (!resultado.exito) {
        this.errorEvento = resultado.mensaje;
        return;
      }
      this.toastService.mostrar(this.eventoEditando ? 'Evento actualizado' : 'Evento creado');
      this.cerrarFormulario();
      this.cargar();
    });
  }

  pedirCancelacion(evento: Evento): void {
    this.eventoPendiente = evento;
    this.motivo = '';
    this.errorMotivo = '';
  }

  cerrarCancelacion(): void {
    this.eventoPendiente = null;
  }

  confirmarCancelacion(): void {
    const evento = this.eventoPendiente;
    if (!evento) {
      return;
    }
    if (!this.motivo.trim()) {
      this.errorMotivo = 'Escribe el motivo. Les llegará a los residentes por correo.';
      return;
    }
    this.procesando = true;
    this.eventoService.cancelar(evento.id, this.motivo.trim()).subscribe((resultado) => {
      this.procesando = false;
      if (!resultado.exito) {
        this.errorMotivo = resultado.mensaje;
        return;
      }
      this.toastService.mostrar('Evento cancelado');
      this.cerrarCancelacion();
      this.cargar();
    });
  }

  abrirInvitacion(evento: Evento): void {
    this.eventoInvitacion = evento;
    this.disenoInvitacion = evento.disenoInvitacion;
    this.errorInvitacion = '';
    this.datosInvitacion = {
      conjuntoId: evento.conjuntoId,
      espacioId: evento.espacioId,
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      categoria: evento.categoria,
      inicio: evento.inicio,
      fin: evento.fin,
      fiestaNinos: evento.fiestaNinos,
      edadMinima: evento.edadMinima,
      edadMaxima: evento.edadMaxima,
      imagen: evento.imagen ?? '',
      disenoInvitacion: evento.disenoInvitacion,
      enviarInvitacion: false,
    };
  }

  cerrarInvitacion(): void {
    this.eventoInvitacion = null;
    this.datosInvitacion = null;
  }

  confirmarInvitacion(): void {
    const evento = this.eventoInvitacion;
    if (!evento) {
      return;
    }
    this.enviandoInvitacion = true;
    this.errorInvitacion = '';
    this.eventoService.enviarInvitacion(evento.id, this.disenoInvitacion).subscribe((resultado) => {
      this.enviandoInvitacion = false;
      if (!resultado.exito) {
        this.errorInvitacion = resultado.mensaje;
        return;
      }
      const respuesta = resultado.datos;
      this.toastService.mostrar(respuesta.mensaje);
      this.eventos = this.eventos.map((e) => (e.id === respuesta.evento.id ? respuesta.evento : e));
      this.cerrarInvitacion();
    });
  }

  etiquetaDiseno(diseno: string): string {
    return etiquetaDe(DISENOS_INVITACION, diseno);
  }

  esFuturo(evento: Evento): boolean {
    return new Date(evento.inicio) > new Date();
  }

  etiquetaCategoria(categoria: string): string {
    return etiquetaDe(CATEGORIAS_EVENTO, categoria);
  }

  imagenDe(evento: Evento): string {
    return evento.imagen ? `assets/images/${evento.imagen}` : this.IMAGEN_RESPALDO;
  }

  usarImagenRespaldo(evento: Event): void {
    const imagen = evento.target as HTMLImageElement;
    if (!imagen.src.endsWith(this.IMAGEN_RESPALDO)) {
      imagen.src = this.IMAGEN_RESPALDO;
    }
  }
}
