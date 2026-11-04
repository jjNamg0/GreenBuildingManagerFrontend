import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Espacio } from '../../models/espaciomodel';
import { MODOS_RESERVA, TIPOS_ESPACIO } from '../../models/opcionesmodel';

@Component({
  selector: 'app-espacioformcomponent',
  standalone: false,
  templateUrl: './espacioformcomponent.html',
  styleUrl: './espacioformcomponent.css',
})
export class Espacioformcomponent implements OnChanges {
  @Input() espacio: Espacio | null = null;
  @Input() conjuntoId = 0;
  @Input() guardando = false;
  @Input() errorServidor = '';
  @Output() guardar = new EventEmitter<Espacio>();
  @Output() cancelar = new EventEmitter<void>();

  readonly tiposEspacio = TIPOS_ESPACIO;
  readonly modosReserva = MODOS_RESERVA;

  formulario: Espacio = this.espacioVacio();
  error = '';

  ngOnChanges(cambios: SimpleChanges): void {
    if (!cambios['espacio']) {
      return;
    }
    this.formulario = this.espacio
      ? {
          ...this.espacio,
          horaApertura: this.espacio.horaApertura.slice(0, 5),
          horaCierre: this.espacio.horaCierre.slice(0, 5),
          reglas: this.espacio.reglas ?? '',
          imagen: this.espacio.imagen ?? '',
        }
      : this.espacioVacio();
    this.error = '';
  }

  get esReservable(): boolean {
    return this.formulario.modoReserva !== 'NO_RESERVABLE';
  }

  enviar(): void {
    this.error = this.validar();
    if (this.error) {
      return;
    }
    this.guardar.emit({ ...this.formulario, conjuntoId: this.conjuntoId });
  }

  private validar(): string {
    const f = this.formulario;
    if (!f.nombre.trim()) {
      return 'Escribe el nombre del espacio.';
    }
    if (!f.capacidad || f.capacidad < 1) {
      return 'La capacidad debe ser de al menos 1 persona.';
    }
    if (!f.horaApertura || !f.horaCierre) {
      return 'Escribe la hora de apertura y la de cierre.';
    }
    if (f.horaApertura >= f.horaCierre) {
      return 'La hora de apertura debe ser antes de la hora de cierre.';
    }
    if (f.costo < 0) {
      return 'El costo no puede ser negativo.';
    }
    if (f.edadMinima < 0 || f.edadMinima > 100) {
      return 'La edad mínima debe estar entre 0 y 100 años.';
    }
    if (f.imagen && !/^[A-Za-z0-9]+\.(png|jpg|jpeg|webp)$/.test(f.imagen.trim())) {
      return 'La imagen debe ser el nombre de un archivo png, jpg o webp de la carpeta assets/images, solo con letras y números (ejemplo: salonSocial.png).';
    }
    if (this.esReservable) {
      const minutosAbierto = this.minutos(f.horaCierre) - this.minutos(f.horaApertura);
      if (f.duracionMinimaMinutos < 15) {
        return 'La duración mínima de una reserva debe ser de al menos 15 minutos.';
      }
      if (f.duracionMaximaMinutos < f.duracionMinimaMinutos) {
        return 'La duración máxima no puede ser menor que la mínima.';
      }
      if (f.duracionMaximaMinutos > minutosAbierto) {
        return 'La duración máxima no puede superar el horario del espacio.';
      }
      if (f.anticipacionMaximaDias < 1 || f.anticipacionMaximaDias > 365) {
        return 'La anticipación máxima debe estar entre 1 y 365 días.';
      }
    }
    return '';
  }

  private minutos(hora: string): number {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  }

  private espacioVacio(): Espacio {
    return {
      id: 0,
      conjuntoId: this.conjuntoId,
      nombre: '',
      tipo: 'SALON_SOCIAL',
      modoReserva: 'EXCLUSIVO',
      capacidad: 20,
      horaApertura: '08:00',
      horaCierre: '22:00',
      duracionMinimaMinutos: 60,
      duracionMaximaMinutos: 240,
      anticipacionMaximaDias: 30,
      requiereAprobacion: false,
      costo: 0,
      edadMinima: 0,
      reglas: '',
      imagen: '',
      enMantenimiento: false,
      activo: true,
    };
  }
}
