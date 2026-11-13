import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Sesionservice } from '../services/sesionservice';

export const invitadoguard: CanActivateFn = () => {
  const sesionService = inject(Sesionservice);
  const router = inject(Router);

  return sesionService.haySesion() ? router.createUrlTree([sesionService.destinoInicial()]) : true;
};
