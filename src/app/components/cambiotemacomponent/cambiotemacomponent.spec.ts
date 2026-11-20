import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cambiotemacomponent } from './cambiotemacomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Cambiotemacomponent', () => {
  let component: Cambiotemacomponent;
  let fixture: ComponentFixture<Cambiotemacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Cambiotemacomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('cambia entre modo claro y oscuro', () => {
    const antes = component.esOscuro();
    component.alternar();
    expect(component.esOscuro()).toBe(!antes);
    component.alternar();
  });
});
