import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';

export const adminguard: CanActivateFn = (_ruta, estado) => {
  const auth = inject(Authservice);
  const router = inject(Router);

  if (auth.isLoggedIn && auth.isAdmin) {
    return true;
  }
  if (auth.isLoggedIn) {
    return router.createUrlTree(['/']);
  }
  return router.createUrlTree(['/login'], { queryParams: { volverA: estado.url } });
};
