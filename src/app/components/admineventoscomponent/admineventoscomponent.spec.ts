import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Admineventoscomponent } from './admineventoscomponent';
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

describe('Admineventoscomponent', () => {
  let component: Admineventoscomponent;
  let fixture: ComponentFixture<Admineventoscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Admineventoscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Eventos"', () => {
    expect(textoDe(fixture)).toContain('Eventos');
  });
});
