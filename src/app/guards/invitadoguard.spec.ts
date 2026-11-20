import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Sesionservice } from '../services/sesionservice';
import { configurarPruebas } from '../testing/pruebasutil';
import { invitadoguard } from './invitadoguard';

describe('invitadoguard', () => {
  /** Ejecuta el guard dentro del contexto de inyección de Angular. */
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => invitadoguard(...guardParameters));
  let sesion: Sesionservice;

  /** Ejecuta el guard como si se entrara a la página del perfil. */
  const ejecutar = (): unknown =>
    executeGuard({} as ActivatedRouteSnapshot, { url: '/perfil' } as RouterStateSnapshot);

  /** Convierte el resultado del guard en texto: true o la ruta a la que redirige. */
  const destino = (resultado: unknown): string =>
    resultado instanceof UrlTree ? resultado.toString() : String(resultado);

  beforeEach(async () => {
    await configurarPruebas();
    sesion = TestBed.inject(Sesionservice);
    sesion.limpiar();
  });

  it('deja pasar a quien no tiene sesión', () => {
    expect(destino(ejecutar())).toBe('true');
  });

  it('manda al residente con sesión a su conjunto', () => {
    sesion.guardar({ token: 'abc', role: 'USER' });
    expect(destino(ejecutar())).toBe('/mi-conjunto');
    sesion.limpiar();
  });

  it('manda al administrador con sesión a su panel', () => {
    sesion.guardar({ token: 'abc', role: 'ADMIN' });
    expect(destino(ejecutar())).toBe('/admin');
    sesion.limpiar();
  });
});
