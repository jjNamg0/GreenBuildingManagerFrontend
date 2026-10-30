import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toastservice } from '../../services/toastservice';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-googlecallbackcomponent',
  templateUrl: './googlecallbackcomponent.html',
  styleUrl: './googlecallbackcomponent.css',
})
export class Googlecallbackcomponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: Authservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    const parametros = this.route.snapshot.queryParamMap;
    const token = parametros.get('token');
    const refreshToken = parametros.get('refreshToken');
    if (!token || !refreshToken) {
      this.router.navigate(['/login'], { queryParams: { error: 'google' }, replaceUrl: true });
      return;
    }
    this.auth.procesarCallbackGoogle(token, refreshToken).subscribe((resultado) => {
      if (!resultado.exito) {
        this.auth.descartarSesion();
        this.router.navigate(['/login'], { queryParams: { error: 'google' }, replaceUrl: true });
        return;
      }
      this.toastService.mostrar(`Hola, ${resultado.datos.nombre}`);
      this.router.navigateByUrl(this.auth.destinoSeguro(null), { replaceUrl: true });
    });
  }
}
