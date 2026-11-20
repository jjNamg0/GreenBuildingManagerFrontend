import { TestBed } from '@angular/core/testing';
import { Confirmacionservice } from './confirmacionservice';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Confirmacionservice', () => {
  let service: Confirmacionservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Confirmacionservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('devuelve true cuando el usuario confirma', () => {
    (globalThis as unknown as Record<string, unknown>)['Swal'] = {
      fire: () => Promise.resolve({ isConfirmed: true }),
    };
    return service
      .confirmar({
        titulo: '¿Eliminar?',
        texto: 'No se puede deshacer',
        textoConfirmar: 'Eliminar',
        peligro: true,
      } as never)
      .then((confirmado) => expect(confirmado).toBe(true));
  });
});
