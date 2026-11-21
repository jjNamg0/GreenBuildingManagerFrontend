import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registrocomponent } from './registrocomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { DatosRegistro } from '../../models/authmodel';
import { MENSAJE_DOMINIO, MENSAJE_TELEFONO } from '../../models/validacionmodel';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Devuelve el texto que se ve en pantalla de un component de prueba. */
const textoDe = <T>(fixture: ComponentFixture<T>): string =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';

/** Crea los datos de un registro que cumple todas las reglas. */
const registroValido = (): DatosRegistro => ({
  nombre: 'Ana',
  apellido: 'Pérez',
  username: 'ana@gmail.com',
  telefono: '3001234567',
  password: 'Clave123*',
  conjuntoId: 1,
  unidadSolicitada: 'Torre 1 - 101',
});

describe('Registrocomponent', () => {
  let component: Registrocomponent;
  let fixture: ComponentFixture<Registrocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Registrocomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Crear cuenta de residente"', () => {
    expect(textoDe(fixture)).toContain('Crear cuenta de residente');
  });

  it('rechaza un correo de un dominio que no es conocido', () => {
    component.datos = { ...registroValido(), username: 'juan@skibidi.com' };
    component.registrar();
    expect(component.error()).toBe(MENSAJE_DOMINIO);
  });

  it('rechaza un teléfono que no tiene 10 dígitos', () => {
    component.datos = { ...registroValido(), telefono: '300 123' };
    component.registrar();
    expect(component.error()).toBe(MENSAJE_TELEFONO);
  });
});
