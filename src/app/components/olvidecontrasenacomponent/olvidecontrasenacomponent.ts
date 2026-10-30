import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Toastservice } from '../../services/toastservice';
import { Authservice } from '../../services/authservice';
import { soloDigitos, validarContrasena, validarEmail } from '../../services/validaciones';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-olvidecontrasenacomponent',
  templateUrl: './olvidecontrasenacomponent.html',
  styleUrl: './olvidecontrasenacomponent.css',
  imports: [FormsModule,CommonModule],
})
export class Olvidecontrasenacomponent {
  paso: 'email' | 'codigo' = 'email';
  email = '';
  codigo = '';
  password = '';
  confirmacion = '';
  verContrasena = false;
  error = '';
  cargando = false;
  enfocado = false;

  constructor(
    private auth: Authservice,
    private router: Router,
    private toastService: Toastservice,
  ) {}

  get casillas(): string[] {
    return Array.from({ length: 6 }, (_, i) => this.codigo.charAt(i));
  }

  alCambiarCodigo(valor: string): void {
    this.codigo = soloDigitos(valor, 6);
    this.error = '';
  }

  pedirCodigo(): void {
    this.error = validarEmail(this.email);
    if (this.error) {
      return;
    }
    this.cargando = true;
    this.email = this.email.trim().toLowerCase();
    this.auth.olvideContrasena(this.email).subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.toastService.mostrar(resultado.datos.mensaje);
      this.paso = 'codigo';
    });
  }

  cambiarContrasena(): void {
    if (this.codigo.length !== 6) {
      this.error = 'El código debe tener 6 números.';
      return;
    }
    this.error = validarContrasena(this.password, this.confirmacion);
    if (this.error) {
      return;
    }
    this.cargando = true;
    this.auth
      .restablecerContrasena(this.email, this.codigo, this.password)
      .subscribe((resultado) => {
        this.cargando = false;
        if (!resultado.exito) {
          this.error = resultado.mensaje;
          return;
        }
        this.toastService.mostrar(resultado.datos.mensaje);
        this.router.navigate(['/login']);
      });
  }

  volverAlEmail(): void {
    this.paso = 'email';
    this.codigo = '';
    this.error = '';
  }
}
