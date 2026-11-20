import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Geografiaservice } from './geografiaservice';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Geografiaservice', () => {
  let service: Geografiaservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Geografiaservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('lee el contorno de Cundinamarca desde los assets', () => {
    let anillos: unknown;
    service.obtenerContornos().subscribe((valor) => (anillos = valor));
    const peticion = http.expectOne('assets/data/cundinamarcaBogota.json');
    expect(peticion.request.method).toBe('GET');
    peticion.flush({ type: 'FeatureCollection', features: [] });
    expect(Array.isArray(anillos)).toBe(true);
  });
});
