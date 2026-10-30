import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';

export const authguard: CanActivateFn = (_ruta, estado) => {
  const auth = inject(Authservice);
  const router = inject(Router);

  if (auth.isLoggedIn) {
    return true;
  }
  return router.createUrlTree(['/login'], { queryParams: { volverA: estado.url } });
};
