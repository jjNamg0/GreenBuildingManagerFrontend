import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Recomendacionservice } from './recomendacionservice';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Recomendacionservice', () => {
  let service: Recomendacionservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Recomendacionservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('devuelve una lista vacía de eventos recomendados', () => {
    let resultado: unknown;
    service.obtenerEventos().subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/recomendacion/geteventos`,
    );
    expect(peticion.request.method).toBe('GET');
    peticion.flush(null);
    expect(resultado).toEqual([]);
  });

  it('devuelve una lista vacía de espacios recomendados', () => {
    let resultado: unknown;
    service.obtenerEspacios().subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/recomendacion/getespacios`,
    );
    expect(peticion.request.method).toBe('GET');
    peticion.flush(null);
    expect(resultado).toEqual([]);
  });
});
