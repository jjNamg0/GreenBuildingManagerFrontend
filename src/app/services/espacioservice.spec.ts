import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Espacioservice } from './espacioservice';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Espacioservice', () => {
  let service: Espacioservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Espacioservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('devuelve una lista vacía si el conjunto no tiene espacios', () => {
    let resultado: unknown;
    service.obtenerPorConjunto(1).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/espacio/getbyconjunto/1`,
    );
    expect(peticion.request.method).toBe('GET');
    peticion.flush(null);
    expect(resultado).toEqual([]);
  });

  it('crea un espacio', () => {
    let resultado: unknown;
    service.crear({} as never).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/espacio/createjson`,
    );
    expect(peticion.request.method).toBe('POST');
    peticion.flush('Creado');
    expect(resultado).toEqual('Creado');
  });
});
