import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Iaservice } from './iaservice';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Iaservice', () => {
  let service: Iaservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Iaservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('envía la pregunta al asistente', () => {
    let resultado: unknown;
    service
      .preguntar({ mensaje: '¿Cómo reservo?', historial: [] })
      .subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/ia/preguntar`);
    expect(peticion.request.method).toBe('POST');
    expect(peticion.request.body.mensaje).toBe('¿Cómo reservo?');
    peticion.flush({ respuesta: 'Ve a Reservar.' });
    expect(resultado).toEqual({ respuesta: 'Ve a Reservar.' });
  });
});
