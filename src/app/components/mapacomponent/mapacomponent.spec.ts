import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mapacomponent } from './mapacomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Objeto que acepta cualquier llamada de Leaflet y se devuelve a sí mismo. */
const leafletFalso: unknown = new Proxy(() => undefined, {
  get: (_objetivo, propiedad) => (propiedad === 'then' ? undefined : leafletFalso),
  apply: () => leafletFalso,
});

/** Instala un Leaflet simulado, porque en las pruebas no se carga el de la CDN. */
const instalarLeafletFalso = (): void => {
  (globalThis as unknown as Record<string, unknown>)['L'] = leafletFalso;
};

describe('Mapacomponent', () => {
  let component: Mapacomponent;
  let fixture: ComponentFixture<Mapacomponent>;

  beforeEach(async () => {
    instalarLeafletFalso();
    await configurarPruebas();
    fixture = TestBed.createComponent(Mapacomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
