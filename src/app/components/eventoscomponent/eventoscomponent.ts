import { Component, OnInit } from '@angular/core';
import { Eventoservice } from '../../services/eventoservice';
import { Evento } from '../../models/eventomodel';
import { CATEGORIAS_EVENTO, etiquetaDe } from '../../models/opcionesmodel';

@Component({
  selector: 'app-eventoscomponent',
  standalone: false,
  templateUrl: './eventoscomponent.html',
  styleUrl: './eventoscomponent.css',
})
export class Eventoscomponent implements OnInit {
  readonly IMAGEN_RESPALDO = 'assets/images/respaldo.svg';

  eventos: Evento[] = [];
  pasados = false;
  soloNinos = false;
  cargando = true;
  error = '';

  constructor(private eventoService: Eventoservice) {}

  ngOnInit(): void {
    this.cargar();
  }

  get filtrados(): Evento[] {
    return this.eventos.filter((e) => !this.soloNinos || e.fiestaNinos);
  }

  cambiarVista(pasados: boolean): void {
    if (this.pasados !== pasados) {
      this.pasados = pasados;
      this.cargar();
    }
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.eventoService.obtenerEventos(this.pasados).subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.eventos = resultado.datos;
    });
  }

  etiquetaCategoria(categoria: string): string {
    return etiquetaDe(CATEGORIAS_EVENTO, categoria);
  }

  iconoCategoria(categoria: string): string {
    switch (categoria) {
      case 'DEPORTIVO':
        return 'bi-dribbble';
      case 'ASAMBLEA':
        return 'bi-megaphone';
      case 'CULTURAL':
        return 'bi-film';
      case 'RECREATIVO':
        return 'bi-balloon';
      default:
        return 'bi-calendar-event';
    }
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
