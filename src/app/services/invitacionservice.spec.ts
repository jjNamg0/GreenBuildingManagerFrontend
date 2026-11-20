import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Invitacionservice } from './invitacionservice';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Invitacionservice', () => {
  let service: Invitacionservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Invitacionservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('consulta una invitación por código', () => {
    let resultado: unknown;
    service.obtenerPorCodigo('abc').subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/invitacion/getbycodigo/abc`,
    );
    expect(peticion.request.method).toBe('GET');
    peticion.flush({});
    expect(resultado).toEqual({});
  });

  it('pide el enlace de un evento', () => {
    let resultado: unknown;
    service
      .obtenerEnlace({ tipo: 'EVENTO', id: 20, titulo: 'Bingo' })
      .subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/invitacion/getenlaceevento/20`,
    );
    expect(peticion.request.method).toBe('GET');
    peticion.flush('http://localhost:4200/invitacion/abc');
    expect(resultado).toEqual('http://localhost:4200/invitacion/abc');
  });

  it('devuelve una lista vacía de invitados de una reserva', () => {
    let resultado: unknown;
    service
      .obtenerInvitados({ tipo: 'RESERVA', id: 30, titulo: 'Cumpleaños' })
      .subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/invitacion/getinvitadosreserva/30`,
    );
    expect(peticion.request.method).toBe('GET');
    peticion.flush(null);
    expect(resultado).toEqual([]);
  });
});
