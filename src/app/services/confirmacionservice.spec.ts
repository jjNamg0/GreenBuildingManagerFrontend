import { TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../testing/pruebasutil';
import { Confirmacionservice } from './confirmacionservice';

describe('Confirmacionservice', () => {
  let service: Confirmacionservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Confirmacionservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('devuelve true cuando el usuario confirma', () => {
    (globalThis as unknown as Record<string, unknown>)['Swal'] = {
      fire: () => Promise.resolve({ isConfirmed: true }),
    };
    return service
      .confirmar({
        titulo: '¿Eliminar?',
        texto: 'No se puede deshacer',
        textoConfirmar: 'Eliminar',
        peligro: true,
      } as never)
      .then((confirmado) => expect(confirmado).toBe(true));
  });
});
