import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { configurarPruebas } from '../testing/pruebasutil';
import { Reservaservice } from './reservaservice';

describe('Reservaservice', () => {
  let service: Reservaservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Reservaservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('devuelve una lista vacía de mis reservas', () => {
    let resultado: unknown;
    service.obtenerMias().subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/reserva/getmine`);
    expect(peticion.request.method).toBe('GET');
    peticion.flush(null);
    expect(resultado).toEqual([]);
  });

  it('consulta la disponibilidad de un día', () => {
    let resultado: unknown;
    service.obtenerDisponibilidad(3, '2026-12-05').subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/reserva/getdisponibilidad`,
    );
    expect(peticion.request.method).toBe('GET');
    expect(peticion.request.params.get('fecha')).toBe('2026-12-05');
    peticion.flush([{ horaInicio: '08:00', horaFin: '09:00', disponible: true }]);
    expect(resultado).toEqual([{ horaInicio: '08:00', horaFin: '09:00', disponible: true }]);
  });

  it('aprueba una reserva', () => {
    let resultado: unknown;
    service.aprobar(30).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/reserva/aprobar/30`,
    );
    expect(peticion.request.method).toBe('PUT');
    peticion.flush('Aprobada');
    expect(resultado).toEqual('Aprobada');
  });
});
