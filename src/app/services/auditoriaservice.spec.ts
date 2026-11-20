import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { configurarPruebas } from '../testing/pruebasutil';
import { Auditoriaservice } from './auditoriaservice';

describe('Auditoriaservice', () => {
  let service: Auditoriaservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Auditoriaservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('consulta los registros con los filtros como parámetros', () => {
    let resultado: unknown;
    service
      .obtenerRegistros({
        usuario: 'ana',
        accion: 'CREAR',
        role: '',
        motivo: '',
        desde: '',
        hasta: '',
        pagina: 1,
        tamano: 20,
      })
      .subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/auditoria/getall`);
    expect(peticion.request.method).toBe('GET');
    expect(peticion.request.params.get('accion')).toBe('CREAR');
    expect(peticion.request.params.get('pagina')).toBe('1');
    peticion.flush({ content: [], totalElements: 0, totalPages: 0, number: 1, size: 20 });
    expect(resultado).toEqual({
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: 1,
      size: 20,
    });
  });
});
