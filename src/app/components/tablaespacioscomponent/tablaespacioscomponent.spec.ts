import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tablaespacioscomponent } from './tablaespacioscomponent';
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

describe('Tablaespacioscomponent', () => {
  let component: Tablaespacioscomponent;
  let fixture: ComponentFixture<Tablaespacioscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Tablaespacioscomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conjuntoId', 1);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Espacios de esparcimiento"', () => {
    expect(textoDe(fixture)).toContain('Espacios de esparcimiento');
  });
});
