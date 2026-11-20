import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Errorservice } from './errorservice';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Errorservice', () => {
  let service: Errorservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Errorservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('usa el texto que manda el back', () => {
    const error = new HttpErrorResponse({ status: 400, error: 'El correo ya está registrado.' });
    expect(service.obtenerMensaje(error)).toBe('El correo ya está registrado.');
  });

  it('explica cuando no hay conexión con el servidor', () => {
    const error = new HttpErrorResponse({ status: 0 });
    expect(service.obtenerMensaje(error)).toContain('No se pudo conectar con el servidor');
  });

  it('usa el mensaje por estado o el mensaje por defecto', () => {
    expect(service.obtenerMensaje(new HttpErrorResponse({ status: 403 }))).toContain(
      'No tienes permisos',
    );
    expect(service.obtenerMensaje('algo raro', 'Falló')).toBe('Falló');
  });
});
