import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Sesionservice } from '../services/sesionservice';

/**
 * Guard de las rutas de residente: exige sesión iniciada y, si el usuario es administrador, lo lleva al panel.
 */
export const residenteguard: CanActivateFn = (_ruta, estado) => {
  const sesionService = inject(Sesionservice);
  const router = inject(Router);

  if (!sesionService.haySesion()) {
    return router.createUrlTree(['/login'], { queryParams: { volverA: estado.url } });
  }
  return sesionService.esAdmin() ? router.createUrlTree(['/admin']) : true;
};
