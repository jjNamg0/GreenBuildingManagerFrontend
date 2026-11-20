import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Selectorplantillacomponent } from './selectorplantillacomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Selectorplantillacomponent', () => {
  let component: Selectorplantillacomponent;
  let fixture: ComponentFixture<Selectorplantillacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Selectorplantillacomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('emite la plantilla elegida', () => {
    let elegida = '';
    component.elegir.subscribe((plantilla) => (elegida = plantilla));
    component.elegir.emit('ELEGANTE');
    expect(elegida).toBe('ELEGANTE');
  });
});
