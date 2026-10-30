import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toastservice } from '../../services/toastservice';
import { Residenteservice } from '../../services/residenteservice';
import { Reservaservice } from '../../services/reservaservice';
import { Eventoservice } from '../../services/eventoservice';
import { Conjuntoservice } from '../../services/conjuntoservice';
import { Evento } from '../../models/eventomodel';
import { Authservice } from '../../services/authservice';
import { ConjuntoOpcion } from '../../models/conjuntomodel';
import { MiConjunto } from '../../models/miconjuntomodel';
import { Espacio } from '../../models/espaciomodel';
import { Usuario } from '../../models/usuariomodel';
import { TIPOS_CONJUNTO, TIPOS_ESPACIO, etiquetaDe } from '../../models/opcionesmodel';

@Component({
  selector: 'app-miconjuntocomponent',
  standalone: false,
  templateUrl: './miconjuntocomponent.html',
  styleUrl: './miconjuntocomponent.css',
})
export class Miconjuntocomponent implements OnInit {
  readonly IMAGEN_RESPALDO = 'assets/images/respaldo.svg';

  miConjunto: MiConjunto | null = null;
  perfil: Usuario | null = null;
  opciones: ConjuntoOpcion[] = [];
  conjuntoElegido = 0;
  enviandoSolicitud = false;
  errorSolicitud = '';
  reservasActivas = 0;
  proximoEvento: Evento | null = null;
  cargando = true;
  error = '';
  filtro: 'todos' | 'EXCLUSIVO' | 'POR_CUPO' | 'NO_RESERVABLE' = 'todos';

  constructor(
    private residenteService: Residenteservice,
    private reservaService: Reservaservice,
    private eventoService: Eventoservice,
    private conjuntoService: Conjuntoservice,
    private router: Router,
    private toastService: Toastservice,
    public auth: Authservice,
  ) {}

  ngOnInit(): void {
    if (this.auth.isAdmin) {
      this.router.navigate(['/admin/conjuntos']);
      return;
    }
    this.cargar();
  }

  get espaciosFiltrados(): Espacio[] {
    const espacios = this.miConjunto?.espacios ?? [];
    return this.filtro === 'todos' ? espacios : espacios.filter((e) => e.modoReserva === this.filtro);
  }

  get espaciosDisponibles(): number {
    return (this.miConjunto?.espacios ?? []).filter((e) => e.modoReserva !== 'NO_RESERVABLE' && !e.enMantenimiento)
      .length;
  }

  get espaciosEnMantenimiento(): number {
    return (this.miConjunto?.espacios ?? []).filter((e) => e.enMantenimiento).length;
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.perfil = null;
    this.miConjunto = null;
    this.residenteService.obtenerPerfil().subscribe((resultado) => {
      if (!resultado.exito) {
        this.cargando = false;
        this.error = resultado.mensaje;
        return;
      }
      this.auth.actualizarUsuario(resultado.datos);
      this.perfil = resultado.datos;
      if (resultado.datos.unidadId) {
        this.cargarMiConjunto();
        return;
      }
      this.cargando = false;
      if (!resultado.datos.conjuntoSolicitadoId) {
        this.cargarOpciones();
      }
    });
  }

  solicitar(): void {
    if (!this.conjuntoElegido) {
      this.errorSolicitud = 'Escoge el conjunto al que quieres entrar.';
      return;
    }
    this.enviandoSolicitud = true;
    this.errorSolicitud = '';
    this.residenteService.solicitarConjunto(Number(this.conjuntoElegido)).subscribe((resultado) => {
      this.enviandoSolicitud = false;
      if (!resultado.exito) {
        this.errorSolicitud = resultado.mensaje;
        return;
      }
      this.auth.actualizarUsuario(resultado.datos);
      this.perfil = resultado.datos;
      this.toastService.mostrar('Enviamos tu solicitud a la administración.');
    });
  }

  private cargarMiConjunto(): void {
    this.residenteService.obtenerMiConjunto().subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.miConjunto = resultado.datos;
      this.contarReservas();
      this.buscarProximoEvento();
    });
  }

  private cargarOpciones(): void {
    this.conjuntoService.obtenerOpciones().subscribe((resultado) => {
      if (!resultado.exito) {
        this.errorSolicitud = resultado.mensaje;
        return;
      }
      this.opciones = resultado.datos;
    });
  }

  etiquetaTipoConjunto(tipo: string): string {
    return etiquetaDe(TIPOS_CONJUNTO, tipo);
  }

  etiquetaTipoEspacio(tipo: string): string {
    return etiquetaDe(TIPOS_ESPACIO, tipo);
  }

  etiquetaModo(modo: string): string {
    if (modo === 'POR_CUPO') {
      return 'Por cupo';
    }
    return modo === 'EXCLUSIVO' ? 'Exclusivo' : 'Uso libre';
  }

  hora(valor: string): string {
    return valor ? valor.slice(0, 5) : '';
  }

  imagenDe(espacio: Espacio): string {
    return espacio.imagen ? `assets/images/${espacio.imagen}` : this.IMAGEN_RESPALDO;
  }

  usarImagenRespaldo(evento: Event): void {
    const imagen = evento.target as HTMLImageElement;
    if (!imagen.src.endsWith(this.IMAGEN_RESPALDO)) {
      imagen.src = this.IMAGEN_RESPALDO;
    }
  }

  private buscarProximoEvento(): void {
    this.eventoService.obtenerEventos(false).subscribe((resultado) => {
      if (!resultado.exito) {
        this.proximoEvento = null;
        return;
      }
      const programados = resultado.datos
        .filter((e) => e.estado !== 'CANCELADO')
        .sort((a, b) => a.inicio.localeCompare(b.inicio));
      this.proximoEvento = programados[0] ?? null;
    });
  }

  private contarReservas(): void {
    this.reservaService.obtenerMisReservas().subscribe((resultado) => {
      if (!resultado.exito) {
        this.reservasActivas = 0;
        return;
      }
      const ahora = new Date();
      this.reservasActivas = resultado.datos.filter(
        (r) => (r.estado === 'PENDIENTE' || r.estado === 'CONFIRMADA') && new Date(r.fin) > ahora,
      ).length;
    });
  }
}
