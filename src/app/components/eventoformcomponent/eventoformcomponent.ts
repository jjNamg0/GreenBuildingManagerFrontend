import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Adminconjuntoservice } from '../../services/adminconjuntoservice';
import { Conjunto } from '../../models/conjuntomodel';
import { Espacio } from '../../models/espaciomodel';
import { Evento, NuevoEvento } from '../../models/eventomodel';
import { CATEGORIAS_EVENTO, disenoSugerido } from '../../models/opcionesmodel';
import { hoy, minutosDe, sumarDias } from '../../services/fechas';

@Component({
  selector: 'app-eventoformcomponent',
  standalone: false,
  templateUrl: './eventoformcomponent.html',
  styleUrl: './eventoformcomponent.css',
})
export class Eventoformcomponent implements OnChanges {
  @Input() evento: Evento | null = null;
  @Input() conjuntos: Conjunto[] = [];
  @Input() conjuntoInicial = 0;
  @Input() guardando = false;
  @Input() errorServidor = '';
  @Output() guardar = new EventEmitter<NuevoEvento>();
  @Output() cancelar = new EventEmitter<void>();

  readonly categorias = CATEGORIAS_EVENTO;
  readonly fechaMinima = hoy();

  conjuntoId = 0;
  espacioId = 0;
  espacios: Espacio[] = [];
  nombre = '';
  descripcion = '';
  categoria = 'RECREATIVO';
  fecha = sumarDias(hoy(), 1);
  horaInicio = '16:00';
  horaFin = '20:00';
  fiestaNinos = false;
  edadMinima: number | null = null;
  edadMaxima: number | null = null;
  imagen = '';
  disenoInvitacion = 'CLASICO';
  enviarInvitacion = true;
  disenoManual = false;
  error = '';

  constructor(private adminConjuntoService: Adminconjuntoservice) {}

  ngOnChanges(cambios: SimpleChanges): void {
    if (!cambios['evento']) {
      return;
    }
    const e = this.evento;
    this.conjuntoId = e ? e.conjuntoId : this.conjuntoInicial;
    this.espacioId = e ? e.espacioId : 0;
    this.nombre = e?.nombre ?? '';
    this.descripcion = e?.descripcion ?? '';
    this.categoria = e?.categoria ?? 'RECREATIVO';
    this.fecha = e ? e.inicio.slice(0, 10) : sumarDias(hoy(), 1);
    this.horaInicio = e ? e.inicio.slice(11, 16) : '16:00';
    this.horaFin = e ? e.fin.slice(11, 16) : '20:00';
    this.fiestaNinos = e?.fiestaNinos ?? false;
    this.edadMinima = e?.edadMinima ?? null;
    this.edadMaxima = e?.edadMaxima ?? null;
    this.imagen = e?.imagen ?? '';
    this.disenoManual = !!e;
    this.disenoInvitacion = e ? e.disenoInvitacion : disenoSugerido(this.categoria, this.fiestaNinos);
    this.enviarInvitacion = !e;
    this.error = '';
    this.cargarEspacios(false);
  }

  cargarEspacios(reiniciar: boolean): void {
    if (reiniciar) {
      this.espacioId = 0;
    }
    this.espacios = [];
    if (!this.conjuntoId) {
      return;
    }
    this.adminConjuntoService
      .obtenerEspacios(this.conjuntoId)
      .subscribe((resultado) => (this.espacios = resultado.exito ? resultado.datos.filter((e) => e.activo) : []));
  }

  get datosVistaPrevia(): NuevoEvento {
    return {
      conjuntoId: this.conjuntoId,
      espacioId: this.espacioId,
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      categoria: this.categoria,
      inicio: `${this.fecha}T${this.horaInicio}:00`,
      fin: `${this.fecha}T${this.horaFin}:00`,
      fiestaNinos: this.fiestaNinos,
      edadMinima: this.fiestaNinos ? this.edadMinima : null,
      edadMaxima: this.fiestaNinos ? this.edadMaxima : null,
      imagen: this.imagen.trim(),
      disenoInvitacion: this.disenoInvitacion,
      enviarInvitacion: false,
    };
  }

  actualizarSugerencia(): void {
    if (!this.disenoManual) {
      this.disenoInvitacion = disenoSugerido(this.categoria, this.fiestaNinos);
    }
  }

  escogerDiseno(diseno: string): void {
    this.disenoInvitacion = diseno;
    this.disenoManual = true;
  }

  enviar(): void {
    this.error = this.validar();
    if (this.error) {
      return;
    }
    this.guardar.emit({
      conjuntoId: this.conjuntoId,
      espacioId: this.espacioId,
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      categoria: this.categoria,
      inicio: `${this.fecha}T${this.horaInicio}:00`,
      fin: `${this.fecha}T${this.horaFin}:00`,
      fiestaNinos: this.fiestaNinos,
      edadMinima: this.fiestaNinos ? this.edadMinima : null,
      edadMaxima: this.fiestaNinos ? this.edadMaxima : null,
      imagen: this.imagen.trim(),
      disenoInvitacion: this.disenoInvitacion,
      enviarInvitacion: !this.evento && this.enviarInvitacion,
    });
  }

  private validar(): string {
    if (!this.nombre.trim()) {
      return 'Escribe el nombre del evento.';
    }
    if (this.nombre.trim().length > 150) {
      return 'El nombre puede tener máximo 150 caracteres.';
    }
    if (!this.conjuntoId) {
      return 'Escoge el conjunto.';
    }
    if (!this.espacioId) {
      return 'Escoge el espacio donde se hace el evento.';
    }
    if (!this.fecha || this.fecha < this.fechaMinima) {
      return 'La fecha no puede ser anterior a hoy.';
    }
    if (!this.horaInicio || !this.horaFin || minutosDe(this.horaInicio) >= minutosDe(this.horaFin)) {
      return 'La hora de inicio debe ser antes de la hora de fin.';
    }
    if (this.fiestaNinos) {
      if (this.edadMinima === null || this.edadMaxima === null) {
        return 'Escribe el rango de edad de la fiesta para niños.';
      }
      if (this.edadMinima < 0 || this.edadMaxima > 17 || this.edadMinima > this.edadMaxima) {
        return 'El rango de edad debe estar entre 0 y 17 años, con la mínima menor que la máxima.';
      }
    }
    if (this.imagen && !/^[A-Za-z0-9]+\.(png|jpg|jpeg|webp)$/.test(this.imagen.trim())) {
      return 'La imagen debe ser el nombre de un archivo png, jpg o webp de la carpeta assets/images, solo con letras y números (ejemplo: salonSocial.png).';
    }
    return '';
  }
}
