import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Vaciocomponent } from './vaciocomponent';
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

describe('Vaciocomponent', () => {
  let component: Vaciocomponent;
  let fixture: ComponentFixture<Vaciocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Vaciocomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('titulo', 'Sin reservas');
    fixture.componentRef.setInput('texto', 'Aún no tienes reservas');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Sin reservas"', () => {
    expect(textoDe(fixture)).toContain('Sin reservas');
  });

  it('muestra "Aún no tienes reservas"', () => {
    expect(textoDe(fixture)).toContain('Aún no tienes reservas');
  });
});
