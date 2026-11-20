import { TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../testing/pruebasutil';
import { Temaservice } from './temaservice';

describe('Temaservice', () => {
  let service: Temaservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Temaservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('alterna entre tema claro y oscuro', () => {
    const antes = service.esOscuro();
    service.alternar();
    expect(service.esOscuro()).toBe(!antes);
    service.alternar();
  });
});
