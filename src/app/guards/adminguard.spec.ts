import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Sesionservice } from '../services/sesionservice';
import { configurarPruebas } from '../testing/pruebasutil';
import { adminguard } from './adminguard';

describe('adminguard', () => {
  /** Ejecuta el guard dentro del contexto de inyección de Angular. */
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminguard(...guardParameters));
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

  it('deja pasar al administrador', () => {
    sesion.guardar({ token: 'abc', role: 'ADMIN' });
    expect(destino(ejecutar())).toBe('true');
    sesion.limpiar();
  });

  it('manda al residente a su conjunto', () => {
    sesion.guardar({ token: 'abc', role: 'USER' });
    expect(destino(ejecutar())).toBe('/mi-conjunto');
    sesion.limpiar();
  });

  it('manda al login sin sesión', () => {
    expect(destino(ejecutar())).toBe('/login?volverA=%2Fperfil');
  });
});
