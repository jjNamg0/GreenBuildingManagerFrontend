
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Toastservice } from '../../services/toastservice';
import { Authservice } from '../../services/authservice';
import { Conjuntoservice } from '../../services/conjuntoservice';
import { ConjuntoOpcion } from '../../models/conjuntomodel';
import { validarContrasena, validarEmail, validarNombre } from '../../services/validaciones';

@Component({
  selector: 'app-registrocomponent',
  standalone: true,
  templateUrl: './registrocomponent.html',
  styleUrl: './registrocomponent.css',
  imports: [CommonModule, FormsModule],
})
export class Registrocomponent implements OnInit {
  nombre = '';
  apellido = '';
  email = '';
  password = '';
  confirmacion = '';
  conjuntoId = 0;
  opciones: ConjuntoOpcion[] = [];
  cargandoConjuntos = true;
  errorConjuntos = '';
  verContrasena = false;
  error = '';
  cargando = false;

  constructor(
    private auth: Authservice,
    private conjuntoService: Conjuntoservice,
    private router: Router,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.cargarConjuntos();
  }

  cargarConjuntos(): void {
    this.cargandoConjuntos = true;
    this.errorConjuntos = '';

    this.conjuntoService.obtenerOpciones().subscribe((resultado) => {
      this.cargandoConjuntos = false;

      if (!resultado.exito) {
        this.errorConjuntos = resultado.mensaje;
        return;
      }

      this.opciones = resultado.datos;
    });
  }

  entrarConGoogle(): void {
    this.auth.loginConGoogle();
  }

  registrar(): void {
    this.error =
      validarNombre(this.nombre, 'nombre') ||
      validarNombre(this.apellido, 'apellido') ||
      validarEmail(this.email) ||
      (this.conjuntoId ? '' : 'Escoge el conjunto al que quieres entrar.') ||
      validarContrasena(this.password, this.confirmacion);

    if (this.error) {
      return;
    }

    this.cargando = true;
    const email = this.email.trim().toLowerCase();

    this.auth
      .registro(
        this.nombre.trim(),
        this.apellido.trim(),
        email,
        this.password,
        Number(this.conjuntoId),
      )
      .subscribe((resultado) => {
        this.cargando = false;

        if (!resultado.exito) {
          this.error = resultado.mensaje;
          return;
        }

        this.toastService.mostrar('Te enviamos un código para verificar tu cuenta.');
        this.router.navigate(['/verificar'], {
          queryParams: { email, modo: 'cuenta' },
        });
      });
  }
}
