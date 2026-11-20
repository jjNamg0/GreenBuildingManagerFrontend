import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { configurarPruebas } from '../testing/pruebasutil';
import { Rutaservice } from './rutaservice';

describe('Rutaservice', () => {
  let service: Rutaservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Rutaservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('calcula la ruta enviando las coordenadas y el modo', () => {
    let resultado: unknown;
    service
      .calcular({
        origenLatitud: 4.7,
        origenLongitud: -74.05,
        destinoLatitud: 4.86,
        destinoLongitud: -74.03,
        modo: 'CARRO',
      } as never)
      .subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/ruta/calcular`);
    expect(peticion.request.method).toBe('GET');
    expect(peticion.request.params.get('modo')).toBe('CARRO');
    peticion.flush({ distancia: 1000 });
    expect(resultado).toEqual({ distancia: 1000 });
  });
});
