import { Component, OnInit } from '@angular/core';
import { Eventoservice } from '../../services/eventoservice';
import { Authservice } from '../../services/authservice';
import { Recomendaciones } from '../../models/eventomodel';
import { Espacio } from '../../models/espaciomodel';
import { TIPOS_ESPACIO, etiquetaDe } from '../../models/opcionesmodel';

@Component({
  selector: 'app-paraticomponent',
  standalone: false,
  templateUrl: './paraticomponent.html',
  styleUrl: './paraticomponent.css',
})
export class Paraticomponent implements OnInit {
  readonly IMAGEN_RESPALDO = 'assets/images/respaldo.svg';

  recomendaciones: Recomendaciones = { espacios: [], eventos: [] };
  cargando = true;
  error = '';

  constructor(
    private eventoService: Eventoservice,
    public auth: Authservice,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  get sinRecomendaciones(): boolean {
    return this.recomendaciones.espacios.length === 0 && this.recomendaciones.eventos.length === 0;
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.eventoService.obtenerRecomendaciones().subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.recomendaciones = resultado.datos;
    });
  }

  etiquetaTipo(tipo: string): string {
    return etiquetaDe(TIPOS_ESPACIO, tipo);
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
}
