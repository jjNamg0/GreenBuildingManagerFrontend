import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { configurarPruebas } from '../testing/pruebasutil';
import { Unidadservice } from './unidadservice';

describe('Unidadservice', () => {
  let service: Unidadservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Unidadservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('devuelve una lista vacía de unidades', () => {
    let resultado: unknown;
    service.obtenerPorConjunto(1).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/unidad/getbyconjunto/1`,
    );
    expect(peticion.request.method).toBe('GET');
    peticion.flush(null);
    expect(resultado).toEqual([]);
  });

  it('elimina una unidad', () => {
    let resultado: unknown;
    service.eliminar(5).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/unidad/deletebyid/5`,
    );
    expect(peticion.request.method).toBe('DELETE');
    peticion.flush('Eliminada');
    expect(resultado).toEqual('Eliminada');
  });
});
