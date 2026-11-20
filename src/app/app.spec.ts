import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from './app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Devuelve el texto que se ve en pantalla de un component de prueba. */
const textoDe = <T>(fixture: ComponentFixture<T>): string =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea la aplicación', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra el nombre de la aplicación en el menú', () => {
    expect(textoDe(fixture)).toContain('Green Building');
  });

  it('tiene el espacio donde se cargan las páginas', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('router-outlet')).not.toBeNull();
  });
});
