import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filausuariocomponent } from './filausuariocomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { Usuario } from '../../models/usuariomodel';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Devuelve el texto que se ve en pantalla de un component de prueba. */
const textoDe = <T>(fixture: ComponentFixture<T>): string =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';

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

describe('Filausuariocomponent', () => {
  let component: Filausuariocomponent;
  let fixture: ComponentFixture<Filausuariocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Filausuariocomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('usuario', usuarioPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "ana@correo.com"', () => {
    expect(textoDe(fixture)).toContain('ana@correo.com');
  });
});
