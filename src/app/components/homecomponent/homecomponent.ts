import { Component } from '@angular/core';
import { Sesionservice } from '../../services/sesionservice';

@Component({
  selector: 'app-homecomponent',
  standalone: false,
  styleUrl: './homecomponent.css',
  templateUrl: './homecomponent.html',
})
export class Homecomponent {
  readonly FUNCIONES = [
    {
      icono: 'fa-map-location-dot',
      titulo: 'Mapa de Cundinamarca',
      texto:
        'Encuentra los conjuntos, mira dónde estás y traza la ruta para llegar, sin necesidad de cuenta.',
    },
    {
      icono: 'fa-calendar-check',
      titulo: 'Reserva de espacios',
      texto:
        'Salones, piscinas, BBQ y canchas con su disponibilidad del día y aprobación de la administración.',
    },
    {
      icono: 'fa-champagne-glasses',
      titulo: 'Eventos del conjunto',
      texto: 'Fiestas, asambleas y actividades, con aviso claro cuando hay plan para niños.',
    },
    {
      icono: 'fa-wand-magic-sparkles',
      titulo: 'Recomendaciones',
      texto: 'Te sugerimos eventos y espacios según tus intereses y lo que más usas.',
    },
  ];

  readonly PASOS = [
    { numero: 1, titulo: 'Crea tu cuenta', texto: 'Regístrate con tu correo y elige tu conjunto.' },
    {
      numero: 2,
      titulo: 'Valida tu correo',
      texto: 'Escribe el código de 6 dígitos que te llega al correo.',
    },
    {
      numero: 3,
      titulo: 'Disfruta tu conjunto',
      texto: 'Cuando la administración te asigne tu unidad, ya puedes reservar.',
    },
  ];

  constructor(private sesionService: Sesionservice) {}

  haySesion(): boolean {
    return this.sesionService.haySesion();
  }

  destinoInicial(): string {
    return this.sesionService.destinoInicial();
  }
}
