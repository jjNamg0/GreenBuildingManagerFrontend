import { TestBed } from '@angular/core/testing';
import { Ubicacionservice } from './ubicacionservice';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Ubicacionservice', () => {
  let service: Ubicacionservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Ubicacionservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('avisa con un error si el navegador no tiene geolocalización', () => {
    expect('geolocation' in navigator).toBe(false);
    let error: unknown = null;
    service.obtenerUbicacion().subscribe({ error: (falla) => (error = falla) });
    expect(error).toBeInstanceOf(Error);
  });
});
