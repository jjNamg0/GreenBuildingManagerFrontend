import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toastservice } from '../../services/toastservice';
import { Authservice } from '../../services/authservice';
import { validarEmail } from '../../services/validaciones';

const ERRORES_GOOGLE: Record<string, string> = {
  google: 'No pudimos entrar con Google. Intenta de nuevo.',
  'sin-email': 'Google no compartió tu correo. Intenta con otra cuenta.',
  desactivada: 'Tu cuenta está desactivada. Comunícate con la administración.',
  'admin-google': 'Los administradores entran con su correo, su contraseña y el código.',
};

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent implements OnInit {
  email = '';
  password = '';
  verContrasena = false;
  error = '';
  cargando = false;
  private volverA: string | null = null;

  constructor(
    private auth: Authservice,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.volverA = this.route.snapshot.queryParamMap.get('volverA');
    const errorGoogle = this.route.snapshot.queryParamMap.get('error');
    if (errorGoogle) {
      this.error = ERRORES_GOOGLE[errorGoogle] ?? ERRORES_GOOGLE['google'];
    }
    if (this.auth.isLoggedIn) {
      this.router.navigateByUrl(this.auth.destinoSeguro(this.volverA));
    }
  }

  entrarConGoogle(): void {
    this.auth.loginConGoogle();
  }

  ingresar(): void {
    this.error = validarEmail(this.email);
    if (this.error) {
      return;
    }
    if (!this.password) {
      this.error = 'Escribe tu contraseña.';
      return;
    }

    this.cargando = true;
    const email = this.email.trim().toLowerCase();
    this.auth.login(email, this.password).subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        if (resultado.status === 403 && resultado.detalle?.requiereVerificacion) {
          this.toastService.mostrar('Primero verifica tu cuenta con el código que te enviamos.');
          this.router.navigate(['/verificar'], { queryParams: { email, modo: 'cuenta' } });
          return;
        }
        this.error = resultado.mensaje;
        return;
      }
      if (resultado.datos.requiereCodigo) {
        this.toastService.mostrar(resultado.datos.mensaje ?? 'Te enviamos un código a tu correo.');
        this.router.navigate(['/verificar'], {
          queryParams: { email, modo: 'login', volverA: this.volverA ?? undefined },
        });
        return;
      }
      this.toastService.mostrar(`Hola, ${this.auth.usuario?.nombre ?? ''}`);
      this.router.navigateByUrl(this.auth.destinoSeguro(this.volverA));
    });
  }
}
