import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cargandocomponent } from './cargandocomponent';
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

describe('Cargandocomponent', () => {
  let component: Cargandocomponent;
  let fixture: ComponentFixture<Cargandocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Cargandocomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activo', true);
    fixture.componentRef.setInput('texto', 'Cargando conjuntos...');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Cargando conjuntos..."', () => {
    expect(textoDe(fixture)).toContain('Cargando conjuntos...');
  });

  it('no muestra nada si no está activo', () => {
    fixture.componentRef.setInput('activo', false);
    fixture.detectChanges();
    expect(textoDe(fixture).trim()).toBe('');
  });
});
