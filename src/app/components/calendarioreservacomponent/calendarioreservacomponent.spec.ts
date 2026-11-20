import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calendarioreservacomponent } from './calendarioreservacomponent';
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

describe('Calendarioreservacomponent', () => {
  let component: Calendarioreservacomponent;
  let fixture: ComponentFixture<Calendarioreservacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Calendarioreservacomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('franjas', [
      { horaInicio: '08:00', horaFin: '09:00', disponible: true },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "1. Elige el día"', () => {
    expect(textoDe(fixture)).toContain('1. Elige el día');
  });

  it('muestra "08:00"', () => {
    expect(textoDe(fixture)).toContain('08:00');
  });
});
