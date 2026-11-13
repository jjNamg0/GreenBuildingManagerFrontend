import { Component, OnInit } from '@angular/core';
import { Authservice } from './services/authservice';
import { Temaservice } from './services/temaservice';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  constructor(
    private authService: Authservice,
    private temaService: Temaservice,
  ) {}

  ngOnInit(): void {
    this.temaService.iniciar();
    this.authService.restaurarSesion();
  }
}
