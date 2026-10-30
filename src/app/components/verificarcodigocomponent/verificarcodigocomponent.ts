import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toastservice } from '../../services/toastservice';
import { Authservice } from '../../services/authservice';
import { soloDigitos } from '../../services/validaciones';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verificarcodigocomponent',
  templateUrl: './verificarcodigocomponent.html',
  styleUrl: './verificarcodigocomponent.css',
  imports: [FormsModule, CommonModule],
})
export class Verificarcodigocomponent implements OnInit, OnDestroy {
  email = '';
  modo: 'cuenta' | 'login' = 'cuenta';
  codigo = '';
  error = '';
  cargando = false;
  segundosParaReenviar = 60;
  enfocado = false;
  private volverA: string | null = null;
  private temporizador: ReturnType<typeof setInterval> | null = null;

  constructor(
    private auth: Authservice,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    const parametros = this.route.snapshot.queryParamMap;
    this.email = parametros.get('email') ?? '';
    this.modo = parametros.get('modo') === 'login' ? 'login' : 'cuenta';
    this.volverA = parametros.get('volverA');
    if (!this.email) {
      this.router.navigate(['/login']);
      return;
    }
    this.iniciarEspera();
  }

  ngOnDestroy(): void {
    this.detenerEspera();
  }

  get titulo(): string {
    return this.modo === 'login' ? 'Código de ingreso' : 'Verifica tu cuenta';
  }

  get explicacion(): string {
    return this.modo === 'login'
      ? 'Por seguridad, los administradores confirman cada ingreso con un código. Lo enviamos a'
      : 'Enviamos un código de 6 números a';
  }

  get casillas(): string[] {
    return Array.from({ length: 6 }, (_, i) => this.codigo.charAt(i));
  }

  alCambiarCodigo(valor: string): void {
    this.codigo = soloDigitos(valor, 6);
    this.error = '';
  }

  verificar(): void {
    if (this.codigo.length !== 6) {
      this.error = 'El código debe tener 6 números.';
      return;
    }
    this.cargando = true;
    const peticion =
      this.modo === 'login'
        ? this.auth.verificarLogin(this.email, this.codigo)
        : this.auth.verificarCuenta(this.email, this.codigo);

    peticion.subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.codigo = '';
        this.error = resultado.mensaje;
        return;
      }
      this.toastService.mostrar(this.modo === 'login' ? 'Ingreso confirmado' : 'Cuenta verificada');
      this.router.navigateByUrl(this.auth.destinoSeguro(this.volverA));
    });
  }

  reenviar(): void {
    if (this.segundosParaReenviar > 0) {
      return;
    }
    const tipo = this.modo === 'login' ? 'INICIO_SESION' : 'VERIFICACION';
    this.auth.reenviarCodigo(this.email, tipo).subscribe((resultado) => {
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.toastService.mostrar('Te enviamos un código nuevo.');
      this.error = '';
      this.iniciarEspera();
    });
  }

  private iniciarEspera(): void {
    this.detenerEspera();
    this.segundosParaReenviar = 60;
    this.temporizador = setInterval(() => {
      this.segundosParaReenviar--;
      if (this.segundosParaReenviar <= 0) {
        this.detenerEspera();
      }
    }, 1000);
  }

  private detenerEspera(): void {
    if (this.temporizador) {
      clearInterval(this.temporizador);
      this.temporizador = null;
    }
  }
}
