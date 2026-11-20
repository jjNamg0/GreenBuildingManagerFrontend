import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { configurarPruebas, usuarioPrueba } from '../testing/pruebasutil';
import { Usuarioservice } from './usuarioservice';

describe('Usuarioservice', () => {
  let service: Usuarioservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Usuarioservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('consulta el usuario de la sesión', () => {
    let resultado: unknown;
    service.obtenerMiUsuario().subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/user/getme`);
    expect(peticion.request.method).toBe('GET');
    peticion.flush(usuarioPrueba());
    expect(resultado).toEqual(usuarioPrueba());
  });

  it('asigna una unidad enviando los ids como parámetros', () => {
    let resultado: unknown;
    service.asignarUnidad(10, 5).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/user/asignarunidad`,
    );
    expect(peticion.request.method).toBe('PUT');
    expect(peticion.request.params.get('unidadId')).toBe('5');
    peticion.flush('Unidad asignada');
    expect(resultado).toEqual('Unidad asignada');
  });
});
