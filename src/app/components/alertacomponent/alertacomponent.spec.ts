import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Alertacomponent } from './alertacomponent';
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

describe('Alertacomponent', () => {
  let component: Alertacomponent;
  let fixture: ComponentFixture<Alertacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Alertacomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('mensaje', 'No se pudo guardar');
    fixture.componentRef.setInput('textoAccion', 'Reintentar');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "No se pudo guardar"', () => {
    expect(textoDe(fixture)).toContain('No se pudo guardar');
  });

  it('emite la acción al pulsar el botón', () => {
    let pulsado = false;
    component.accion.subscribe(() => (pulsado = true));
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    expect(pulsado).toBe(true);
  });

  it('no muestra nada sin mensaje', () => {
    fixture.componentRef.setInput('mensaje', '');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('[role=alert]')).toBeNull();
  });
});
