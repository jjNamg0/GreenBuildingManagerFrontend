import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { configurarPruebas } from '../testing/pruebasutil';
import { Resumenservice } from './resumenservice';

describe('Resumenservice', () => {
  let service: Resumenservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Resumenservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('consulta el resumen del administrador', () => {
    let resultado: unknown;
    service.obtenerResumenAdmin().subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/resumen/getadmin`);
    expect(peticion.request.method).toBe('GET');
    peticion.flush({ totalConjuntos: 4 });
    expect(resultado).toEqual({ totalConjuntos: 4 });
  });
});
