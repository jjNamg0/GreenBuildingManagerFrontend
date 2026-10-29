import { Component } from '@angular/core';
import { Authservice } from '../../services/authservice';
import { validarContrasena, validarEmail, validarNombre } from '../../services/validaciones';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitaradmincomponent',
  templateUrl: './solicitaradmincomponent.html',
  styleUrl: './solicitaradmincomponent.css',
  imports: [FormsModule,CommonModule],
})
export class Solicitaradmincomponent {
  nombre = '';
  apellido = '';
  email = '';
  password = '';
  confirmacion = '';
  verContrasena = false;
  error = '';
  cargando = false;
  enviada = false;
  mensajeEnviada = '';

  constructor(private auth: Authservice) {}

  solicitar(): void {
    this.error =
      validarNombre(this.nombre, 'nombre') ||
      validarNombre(this.apellido, 'apellido') ||
      validarEmail(this.email) ||
      validarContrasena(this.password, this.confirmacion);
    if (this.error) {
      return;
    }

    this.cargando = true;
    const email = this.email.trim().toLowerCase();
    this.auth
      .solicitarAdmin(this.nombre.trim(), this.apellido.trim(), email, this.password)
      .subscribe((resultado) => {
        this.cargando = false;
        if (!resultado.exito) {
          this.error = resultado.mensaje;
          return;
        }
        this.enviada = true;
        this.mensajeEnviada = resultado.datos.mensaje;
        this.password = '';
        this.confirmacion = '';
      });
  }
}
