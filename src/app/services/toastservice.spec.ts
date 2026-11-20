import { TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../testing/pruebasutil';
import { Toastservice } from './toastservice';

describe('Toastservice', () => {
  let service: Toastservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Toastservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('muestra un mensaje y lo cierra', () => {
    service.mostrar('Reserva creada', 'exito');
    expect(service.mensaje()).toBe('Reserva creada');
    expect(service.tipo()).toBe('exito');
    service.cerrar();
    expect(service.mensaje()).toBe('');
  });
});
