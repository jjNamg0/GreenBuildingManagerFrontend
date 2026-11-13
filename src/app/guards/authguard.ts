import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Sesionservice } from '../services/sesionservice';

/**
 * Guard que exige una sesión iniciada; si no la hay, lleva al inicio de sesión recordando la ruta pedida.
 */
export const authguard: CanActivateFn = (_ruta, estado) => {
  const sesionService = inject(Sesionservice);
  const router = inject(Router);

  if (sesionService.haySesion()) {
    return true;
  }
  return router.createUrlTree(['/login'], { queryParams: { volverA: estado.url } });
};
