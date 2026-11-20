import { TestBed } from '@angular/core/testing';
import { Temaservice } from './temaservice';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Temaservice', () => {
  let service: Temaservice;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Temaservice);
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('alterna entre tema claro y oscuro', () => {
    const antes = service.esOscuro();
    service.alternar();
    expect(service.esOscuro()).toBe(!antes);
    service.alternar();
  });
});
