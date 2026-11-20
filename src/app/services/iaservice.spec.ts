import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { configurarPruebas } from '../testing/pruebasutil';
import { Iaservice } from './iaservice';

describe('Iaservice', () => {
  let service: Iaservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Iaservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('envía la pregunta al asistente', () => {
    let resultado: unknown;
    service
      .preguntar({ mensaje: '¿Cómo reservo?', historial: [] })
      .subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/ia/preguntar`);
    expect(peticion.request.method).toBe('POST');
    expect(peticion.request.body.mensaje).toBe('¿Cómo reservo?');
    peticion.flush({ respuesta: 'Ve a Reservar.' });
    expect(resultado).toEqual({ respuesta: 'Ve a Reservar.' });
  });
});
