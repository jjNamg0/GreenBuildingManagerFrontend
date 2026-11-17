import { Component, OnInit } from '@angular/core';
import { Authservice } from './services/authservice';

/** Component raíz que contiene la estructura general de la aplicación. */
@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  constructor(private authService: Authservice) {}

  /** Restaura la sesión guardada. */
  ngOnInit(): void {
    this.authService.restaurarSesion();
  }
}
