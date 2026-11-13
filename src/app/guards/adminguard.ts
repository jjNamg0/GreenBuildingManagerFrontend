import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Sesionservice } from '../services/sesionservice';

/**
 * Guard de las rutas de administrador: exige sesión iniciada y, si el usuario no es administrador, lo lleva a su conjunto.
 */
export const adminguard: CanActivateFn = (_ruta, estado) => {
  const sesionService = inject(Sesionservice);
  const router = inject(Router);

  if (!sesionService.haySesion()) {
    return router.createUrlTree(['/login'], { queryParams: { volverA: estado.url } });
  }
  return sesionService.esAdmin() ? true : router.createUrlTree(['/mi-conjunto']);
};
