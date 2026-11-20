import { TestBed } from '@angular/core/testing';
import { Toastservice } from './toastservice';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Toastservice', () => {
  let service: Toastservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Toastservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('muestra un mensaje y lo cierra', () => {
    service.mostrar('Reserva creada', 'exito');
    expect(service.mensaje()).toBe('Reserva creada');
    expect(service.tipo()).toBe('exito');
    service.cerrar();
    expect(service.mensaje()).toBe('');
  });
});
