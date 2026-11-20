import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Invitarcomponent } from './invitarcomponent';
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

describe('Invitarcomponent', () => {
  let component: Invitarcomponent;
  let fixture: ComponentFixture<Invitarcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Invitarcomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('destino', { tipo: 'EVENTO', id: 20, titulo: 'Bingo familiar' });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Bingo familiar"', () => {
    expect(textoDe(fixture)).toContain('Bingo familiar');
  });
});
