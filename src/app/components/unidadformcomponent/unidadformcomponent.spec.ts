import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Unidadformcomponent } from './unidadformcomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { Conjunto } from '../../models/conjuntomodel';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

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

describe('Unidadformcomponent', () => {
  let component: Unidadformcomponent;
  let fixture: ComponentFixture<Unidadformcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Unidadformcomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conjunto', conjuntoPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
