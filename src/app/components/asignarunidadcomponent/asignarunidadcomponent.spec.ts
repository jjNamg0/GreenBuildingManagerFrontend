import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Asignarunidadcomponent } from './asignarunidadcomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { Usuario } from '../../models/usuariomodel';
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

/** Residente de ejemplo para las pruebas. */
const usuarioPrueba = (): Usuario => ({
  id: 10,
  nombre: 'Ana',
  apellido: 'Pérez',
  username: 'ana@correo.com',
  telefono: '3001234567',
  role: 'USER',
  verificado: true,
  activo: true,
  conjuntoId: 1,
  conjuntoNombre: 'Torres del Parque',
  unidadId: 5,
  unidadDescripcion: 'Torre 1 - 101',
  unidadSolicitada: 'Torre 1 - 101',
  intereses: ['DEPORTE'],
});

describe('Asignarunidadcomponent', () => {
  let component: Asignarunidadcomponent;
  let fixture: ComponentFixture<Asignarunidadcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Asignarunidadcomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('usuario', usuarioPrueba());
    fixture.componentRef.setInput('conjuntos', [conjuntoPrueba()]);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Asignar unidad"', () => {
    expect(textoDe(fixture)).toContain('Asignar unidad');
  });
});
