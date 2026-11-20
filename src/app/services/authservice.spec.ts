import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { configurarPruebas } from '../testing/pruebasutil';
import { Sesionservice } from './sesionservice';
import { usuarioPrueba } from '../testing/pruebasutil';
import { Authservice } from './authservice';

describe('Authservice', () => {
  let service: Authservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Authservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('inicia sesión, guarda el token y carga el usuario', () => {
    const sesion = TestBed.inject(Sesionservice);
    let resultado: unknown;
    service
      .iniciarSesion({ username: 'ana@correo.com', password: 'Clave123*' })
      .subscribe((valor) => (resultado = valor));
    http
      .expectOne(`${environment.urlApi}/auth/login`)
      .flush({ token: 'token-de-prueba', role: 'USER' });
    expect(sesion.token()).toBe('token-de-prueba');
    http.expectOne(`${environment.urlApi}/user/getme`).flush(usuarioPrueba());
    expect(resultado).toEqual(usuarioPrueba());
    sesion.limpiar();
  });

  it('limpia la sesión si el login falla', () => {
    const sesion = TestBed.inject(Sesionservice);
    service
      .iniciarSesion({ username: 'ana@correo.com', password: 'mala' })
      .subscribe({ error: () => undefined });
    http
      .expectOne(`${environment.urlApi}/auth/login`)
      .flush('Credenciales inválidas', { status: 401, statusText: 'Unauthorized' });
    expect(sesion.haySesion()).toBe(false);
  });

  it('registra un residente', () => {
    let resultado: unknown;
    service
      .registrar({
        username: 'ana@correo.com',
        password: 'Clave123*',
        nombre: 'Ana',
        apellido: 'Pérez',
        telefono: '3001234567',
        conjuntoId: 1,
        unidadSolicitada: 'Torre 1 - 101',
      } as never)
      .subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/auth/register`);
    expect(peticion.request.method).toBe('POST');
    peticion.flush('Usuario registrado');
    expect(resultado).toEqual('Usuario registrado');
  });
});
