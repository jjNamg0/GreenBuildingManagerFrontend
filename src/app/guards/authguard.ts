import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Sesionservice } from '../services/sesionservice';

export const authguard: CanActivateFn = (_ruta, estado) => {
  const sesionService = inject(Sesionservice);
  const router = inject(Router);

  if (sesionService.haySesion()) {
    return true;
  }
  return router.createUrlTree(['/login'], { queryParams: { volverA: estado.url } });
};
