import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { Authservice } from '../services/authservice';
import { Residenteservice } from '../services/residenteservice';

export const conjuntoguard: CanActivateFn = () => {
  const auth = inject(Authservice);
  const router = inject(Router);
  const residenteService = inject(Residenteservice);

  if (auth.isAdmin) {
    return true;
  }
  return residenteService.obtenerPerfil().pipe(
    map((resultado) => {
      if (resultado.exito) {
        auth.actualizarUsuario(resultado.datos);
      }
      return auth.usuario?.unidadId ? true : router.createUrlTree(['/mi-conjunto']);
    }),
  );
};
