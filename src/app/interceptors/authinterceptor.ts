import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Sesionservice } from '../services/sesionservice';
import { Ubicacionservice } from '../services/ubicacionservice';

export const authinterceptor: HttpInterceptorFn = (peticion, siguiente) => {
  if (!peticion.url.startsWith(environment.urlApi)) {
    return siguiente(peticion);
  }

  const sesionService = inject(Sesionservice);
  const ubicacionService = inject(Ubicacionservice);
  const router = inject(Router);

  let cabeceras = peticion.headers;
  const token = sesionService.token();
  if (token) {
    cabeceras = cabeceras.set('Authorization', `Bearer ${token}`);
  }

  const ubicacion = ubicacionService.ultimaUbicacion();
  if (ubicacion) {
    cabeceras = cabeceras
      .set('X-Latitud', String(ubicacion.latitud))
      .set('X-Longitud', String(ubicacion.longitud));
  }

  return siguiente(peticion.clone({ headers: cabeceras })).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && token && !peticion.url.includes('/auth/')) {
        sesionService.limpiar();
        router.navigate(['/login'], { queryParams: { expirada: true } });
      }
      return throwError(() => error);
    }),
  );
};
