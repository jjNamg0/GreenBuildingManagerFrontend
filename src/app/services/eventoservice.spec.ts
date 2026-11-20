import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { configurarPruebas } from '../testing/pruebasutil';
import { Eventoservice } from './eventoservice';

describe('Eventoservice', () => {
  let service: Eventoservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Eventoservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('confirma la asistencia a un evento', () => {
    let resultado: unknown;
    service.asistir(20).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/evento/asistir/20`);
    expect(peticion.request.method).toBe('POST');
    peticion.flush('Asistencia confirmada');
    expect(resultado).toEqual('Asistencia confirmada');
  });

  it('cancela un evento con su motivo', () => {
    let resultado: unknown;
    service.cancelar(20, { motivo: 'Lluvia' }).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/evento/cancelar/20`,
    );
    expect(peticion.request.method).toBe('PUT');
    expect(peticion.request.body).toEqual({ motivo: 'Lluvia' });
    peticion.flush('Cancelado');
    expect(resultado).toEqual('Cancelado');
  });
});
