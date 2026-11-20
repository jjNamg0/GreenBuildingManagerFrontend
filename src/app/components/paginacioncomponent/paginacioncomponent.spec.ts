import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paginacioncomponent } from './paginacioncomponent';
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

describe('Paginacioncomponent', () => {
  let component: Paginacioncomponent;
  let fixture: ComponentFixture<Paginacioncomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Paginacioncomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pagina', 0);
    fixture.componentRef.setInput('totalPaginas', 3);
    fixture.componentRef.setInput('totalElementos', 25);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Página 1 de 3"', () => {
    expect(textoDe(fixture)).toContain('Página 1 de 3');
  });

  it('sabe si hay página anterior y siguiente', () => {
    expect(component.hayAnterior()).toBe(false);
    expect(component.haySiguiente()).toBe(true);
  });

  it('emite la página elegida y no la actual', () => {
    const elegidas: number[] = [];
    component.cambiar.subscribe((pagina) => elegidas.push(pagina));
    component.ir(0);
    component.ir(2);
    expect(elegidas).toEqual([2]);
  });
});
