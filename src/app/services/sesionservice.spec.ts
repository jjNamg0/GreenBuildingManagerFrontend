import { TestBed } from '@angular/core/testing';
import { Sesionservice } from './sesionservice';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Sesionservice', () => {
  let service: Sesionservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Sesionservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('guarda el token y el rol al iniciar sesión', () => {
    service.guardar({ token: 'abc', role: 'ADMIN' });
    expect(service.haySesion()).toBe(true);
    expect(service.esAdmin()).toBe(true);
    expect(service.destinoInicial()).toBe('/admin');
    service.limpiar();
    expect(service.haySesion()).toBe(false);
  });

  it('solo permite volver a rutas internas', () => {
    service.guardar({ token: 'abc', role: 'USER' });
    expect(service.destinoSeguro('/eventos')).toBe('/eventos');
    expect(service.destinoSeguro('https://otro-sitio.com')).toBe('/mi-conjunto');
    expect(service.destinoSeguro('//otro-sitio.com')).toBe('/mi-conjunto');
    service.limpiar();
  });
});
