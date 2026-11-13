import { Component, Input } from '@angular/core';

/** Indicador de carga reutilizable. */
@Component({
  selector: 'app-cargandocomponent',
  standalone: false,
  styleUrl: './cargandocomponent.css',
  templateUrl: './cargandocomponent.html',
})
export class Cargandocomponent {
  @Input() activo = false;
  @Input() texto = 'Cargando...';
}
