import { TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../testing/pruebasutil';
import { HttpErrorResponse } from '@angular/common/http';
import { Errorservice } from './errorservice';

describe('Errorservice', () => {
  let service: Errorservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Errorservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('usa el texto que manda el back', () => {
    const error = new HttpErrorResponse({ status: 400, error: 'El correo ya está registrado.' });
    expect(service.obtenerMensaje(error)).toBe('El correo ya está registrado.');
  });

  it('explica cuando no hay conexión con el servidor', () => {
    const error = new HttpErrorResponse({ status: 0 });
    expect(service.obtenerMensaje(error)).toContain('No se pudo conectar con el servidor');
  });

  it('usa el mensaje por estado o el mensaje por defecto', () => {
    expect(service.obtenerMensaje(new HttpErrorResponse({ status: 403 }))).toContain(
      'No tienes permisos',
    );
    expect(service.obtenerMensaje('algo raro', 'Falló')).toBe('Falló');
  });
});
