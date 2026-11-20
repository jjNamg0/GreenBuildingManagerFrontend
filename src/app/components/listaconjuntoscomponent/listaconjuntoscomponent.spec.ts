import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Listaconjuntoscomponent } from './listaconjuntoscomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { Conjunto } from '../../models/conjuntomodel';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Devuelve el texto que se ve en pantalla de un component de prueba. */
const textoDe = <T>(fixture: ComponentFixture<T>): string =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';

/** Conjunto de ejemplo para las pruebas. */
const conjuntoPrueba = (): Conjunto => ({
  id: 1,
  nombre: 'Torres del Parque',
  tipo: 'APARTAMENTOS',
  direccion: 'Calle 145 # 46-80',
  municipio: 'Chía',
  latitud: 4.86,
  longitud: -74.03,
  descripcion: 'Conjunto de prueba',
  imagenUrl: null,
  totalUnidades: 20,
  totalEspacios: 4,
});

describe('Listaconjuntoscomponent', () => {
  let component: Listaconjuntoscomponent;
  let fixture: ComponentFixture<Listaconjuntoscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Listaconjuntoscomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conjuntos', [conjuntoPrueba()]);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Conjuntos residenciales"', () => {
    expect(textoDe(fixture)).toContain('Conjuntos residenciales');
  });

  it('muestra "Torres del Parque"', () => {
    expect(textoDe(fixture)).toContain('Torres del Parque');
  });
});
