import { TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../testing/pruebasutil';
import { Ubicacionservice } from './ubicacionservice';

describe('Ubicacionservice', () => {
  let service: Ubicacionservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Ubicacionservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('avisa con un error si el navegador no tiene geolocalización', () => {
    expect('geolocation' in navigator).toBe(false);
    let error: unknown = null;
    service.obtenerUbicacion().subscribe({ error: (falla) => (error = falla) });
    expect(error).toBeInstanceOf(Error);
  });
});
