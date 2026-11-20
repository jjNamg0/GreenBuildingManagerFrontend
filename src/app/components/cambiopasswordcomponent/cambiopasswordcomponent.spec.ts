import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cambiopasswordcomponent } from './cambiopasswordcomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Devuelve el texto que se ve en pantalla de un component de prueba. */
const textoDe = <T>(fixture: ComponentFixture<T>): string =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';

describe('Cambiopasswordcomponent', () => {
  let component: Cambiopasswordcomponent;
  let fixture: ComponentFixture<Cambiopasswordcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Cambiopasswordcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Cambiar contraseña"', () => {
    expect(textoDe(fixture)).toContain('Cambiar contraseña');
  });
});
