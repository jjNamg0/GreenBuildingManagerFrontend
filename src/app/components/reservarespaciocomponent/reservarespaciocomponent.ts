import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toastservice } from '../../services/toastservice';
import { Residenteservice } from '../../services/residenteservice';
import { Reservaservice } from '../../services/reservaservice';
import { Espacio } from '../../models/espaciomodel';
import { BloqueHorario, Disponibilidad } from '../../models/reservamodel';
import { TIPOS_ESPACIO, etiquetaDe } from '../../models/opcionesmodel';
import { duracionLegible, horaLegible, hoy, sumarDias } from '../../services/fechas';

@Component({
  selector: 'app-reservarespaciocomponent',
  standalone: false,
  templateUrl: './reservarespaciocomponent.html',
  styleUrl: './reservarespaciocomponent.css',
})
export class Reservarespaciocomponent implements OnInit {
  espacio: Espacio | null = null;
  conjuntoNombre = '';
  unidadDescripcion = '';
  cargando = true;
  error = '';

  fecha = hoy();
  fechaMinima = hoy();
  fechaMaxima = hoy();
  disponibilidad: Disponibilidad | null = null;
  cargandoDisponibilidad = false;

  horaInicio = '';
  duracion = 0;
  personas = 1;
  observaciones = '';
  errorFormulario = '';
  guardando = false;
  mostrarConfirmacion = false;

  private consultaActual = 0;

  constructor(
    private residenteService: Residenteservice,
    private reservaService: Reservaservice,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    const espacioId = Number(this.route.snapshot.paramMap.get('espacioId'));
    this.residenteService.obtenerMiConjunto().subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      const datos = resultado.datos;
      const espacio = datos.espacios.find((e) => e.id === espacioId) ?? null;
      if (!espacio) {
        this.error = 'Este espacio no existe en tu conjunto.';
        return;
      }
      if (espacio.modoReserva === 'NO_RESERVABLE') {
        this.error = 'Este espacio no se reserva. Puedes usarlo libremente según sus reglas.';
        return;
      }
      if (espacio.enMantenimiento) {
        this.error = 'Este espacio está en mantenimiento. Intenta más adelante.';
        return;
      }
      this.espacio = espacio;
      this.conjuntoNombre = datos.conjunto.nombre;
      this.unidadDescripcion = datos.unidad.descripcion;
      this.fechaMaxima = sumarDias(this.fechaMinima, espacio.anticipacionMaximaDias);
      this.duracion = espacio.duracionMinimaMinutos;
      this.consultar(true);
    });
  }

  get diasCercanos(): string[] {
    const dias: string[] = [];
    for (let i = 0; i < 7; i++) {
      const dia = sumarDias(this.fechaMinima, i);
      if (dia <= this.fechaMaxima) {
        dias.push(dia);
      }
    }
    return dias;
  }

  get bloques(): BloqueHorario[] {
    return this.disponibilidad?.bloques ?? [];
  }

  get opcionesHora(): string[] {
    return this.disponibilidad?.horasInicio ?? [];
  }

  get opcionesDuracion(): number[] {
    return this.disponibilidad?.duraciones ?? [];
  }

  get horaFin(): string {
    return this.disponibilidad?.horaFin ?? '';
  }

  get cuposLibres(): number {
    return this.disponibilidad?.cuposLibres ?? this.espacio?.capacidad ?? 0;
  }

  get conflicto(): string {
    return this.disponibilidad?.conflicto ?? '';
  }

  get esPorCupo(): boolean {
    return this.espacio?.modoReserva === 'POR_CUPO';
  }

  get etiquetaTipo(): string {
    return etiquetaDe(TIPOS_ESPACIO, this.espacio?.tipo);
  }

  elegirDia(fecha: string): void {
    this.fecha = fecha;
    this.cambiarFecha();
  }

  textoHora(hora: string): string {
    return hora ? horaLegible(hora) : '';
  }

  textoDuracion(minutos: number): string {
    return duracionLegible(minutos);
  }

  cambiarFecha(): void {
    this.horaInicio = '';
    this.errorFormulario = '';
    if (!this.fecha) {
      this.errorFormulario = 'Escoge una fecha.';
      return;
    }
    this.consultar(true);
  }

  cambiarDetalle(): void {
    this.errorFormulario = '';
    if (this.horaInicio) {
      this.consultar(false);
    }
  }

  elegirBloque(bloque: BloqueHorario): void {
    if (!bloque.libre || bloque.pasado || !this.opcionesHora.includes(bloque.inicio)) {
      return;
    }
    this.horaInicio = bloque.inicio;
    this.cambiarDetalle();
  }

  estaSeleccionado(bloque: BloqueHorario): boolean {
    return !!this.horaInicio && !!this.horaFin && bloque.inicio >= this.horaInicio && bloque.inicio < this.horaFin;
  }

  pedirConfirmacion(): void {
    if (!this.horaInicio) {
      this.errorFormulario = 'Escoge la hora de inicio tocando un bloque libre o en la lista.';
      return;
    }
    this.errorFormulario = this.conflicto;
    if (!this.errorFormulario) {
      this.mostrarConfirmacion = true;
    }
  }

  cancelarConfirmacion(): void {
    this.mostrarConfirmacion = false;
  }

  confirmar(): void {
    if (!this.espacio) {
      return;
    }
    this.mostrarConfirmacion = false;
    this.guardando = true;
    this.reservaService
      .crear({
        espacioId: this.espacio.id,
        inicio: `${this.fecha}T${this.horaInicio}:00`,
        fin: `${this.fecha}T${this.horaFin}:00`,
        personas: this.personas,
        observaciones: this.observaciones.trim(),
      })
      .subscribe((resultado) => {
        this.guardando = false;
        if (!resultado.exito) {
          this.errorFormulario = resultado.mensaje;
          this.consultar(false);
          return;
        }
        const reserva = resultado.datos;
        this.toastService.mostrar(
          reserva.estado === 'PENDIENTE'
            ? 'Reserva enviada. Te avisaremos cuando la administración la revise.'
            : `Reserva confirmada. Comprobante ${reserva.comprobante}`,
        );
        this.router.navigate(['/mis-reservas']);
      });
  }

  private consultar(mostrarCarga: boolean): void {
    if (!this.espacio) {
      return;
    }
    const numero = ++this.consultaActual;
    this.cargandoDisponibilidad = mostrarCarga;
    const consulta = this.horaInicio
      ? { horaInicio: this.horaInicio, duracion: this.duracion, personas: Number(this.personas) || 0 }
      : null;
    this.reservaService.obtenerDisponibilidad(this.espacio.id, this.fecha, consulta).subscribe((resultado) => {
      if (numero !== this.consultaActual) {
        return;
      }
      this.cargandoDisponibilidad = false;
      if (!resultado.exito) {
        this.disponibilidad = null;
        this.errorFormulario = resultado.mensaje;
        return;
      }
      this.disponibilidad = resultado.datos;
      this.duracion = resultado.datos.duracion;
    });
  }
}
