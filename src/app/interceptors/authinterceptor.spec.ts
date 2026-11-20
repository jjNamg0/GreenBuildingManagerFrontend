import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Sesionservice } from '../services/sesionservice';
import { configurarPruebas } from '../testing/pruebasutil';
import { authinterceptor } from './authinterceptor';

describe('authinterceptor', () => {
  /** Ejecuta el interceptor dentro del contexto de inyección de Angular. */
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authinterceptor(req, next));
  let cliente: HttpClient;
  let http: HttpTestingController;
  let sesion: Sesionservice;

  beforeEach(async () => {
    await configurarPruebas();
    cliente = TestBed.inject(HttpClient);
    http = TestBed.inject(HttpTestingController);
    sesion = TestBed.inject(Sesionservice);
    sesion.limpiar();
  });

  afterEach(() => {
    http.verify();
    sesion.limpiar();
  });

  it('se crea', () => {
    expect(interceptor).toBeTruthy();
  });

  it('agrega el token a las peticiones al back', () => {
    sesion.guardar({ token: 'token-de-prueba', role: 'USER' });
    cliente.get(`${environment.urlApi}/user/getme`).subscribe();
    const peticion = http.expectOne(`${environment.urlApi}/user/getme`);
    expect(peticion.request.headers.get('Authorization')).toBe('Bearer token-de-prueba');
    peticion.flush({});
  });

  it('no agrega el token a peticiones de otros sitios', () => {
    sesion.guardar({ token: 'token-de-prueba', role: 'USER' });
    cliente.get('assets/data/cundinamarcaBogota.json').subscribe();
    const peticion = http.expectOne('assets/data/cundinamarcaBogota.json');
    expect(peticion.request.headers.has('Authorization')).toBe(false);
    peticion.flush({});
  });

  it('cierra la sesión cuando el back responde 401', () => {
    sesion.guardar({ token: 'token-de-prueba', role: 'USER' });
    cliente.get(`${environment.urlApi}/reserva/getmine`).subscribe({ error: () => undefined });
    http
      .expectOne(`${environment.urlApi}/reserva/getmine`)
      .flush('Tu sesión expiró', { status: 401, statusText: 'Unauthorized' });
    expect(sesion.haySesion()).toBe(false);
  });
});
