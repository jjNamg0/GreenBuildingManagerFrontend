import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjetaespaciocomponent } from './tarjetaespaciocomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { Espacio } from '../../models/espaciomodel';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Devuelve el texto que se ve en pantalla de un component de prueba. */
const textoDe = <T>(fixture: ComponentFixture<T>): string =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';

/** Espacio común de ejemplo para las pruebas. */
const espacioPrueba = (): Espacio => ({
  id: 3,
  conjuntoId: 1,
  nombre: 'Salón social',
  tipo: 'SALON_SOCIAL',
  descripcion: 'Salón para 50 personas',
  capacidad: 50,
  horaApertura: '08:00',
  horaCierre: '22:00',
  requiereReserva: true,
  disponible: true,
  imagenUrl: null,
});

describe('Tarjetaespaciocomponent', () => {
  let component: Tarjetaespaciocomponent;
  let fixture: ComponentFixture<Tarjetaespaciocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Tarjetaespaciocomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('espacio', espacioPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Salón social"', () => {
    expect(textoDe(fixture)).toContain('Salón social');
  });
});
