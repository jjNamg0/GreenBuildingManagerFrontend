import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filaauditoriacomponent } from './filaauditoriacomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { RegistroAuditoria } from '../../models/auditoriamodel';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Devuelve el texto que se ve en pantalla de un component de prueba. */
const textoDe = <T>(fixture: ComponentFixture<T>): string =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';

/** Registro de auditoría de ejemplo para las pruebas. */
const registroPrueba = (): RegistroAuditoria => ({
  id: 1,
  username: 'ana@correo.com',
  nombreUsuario: 'Ana Pérez',
  role: 'USER',
  fecha: '2026-11-20T10:00:00',
  accion: 'RESERVA',
  entidad: 'Reserva',
  motivo: 'Solicitó el salón social',
  ubicacion: 'Sin ubicación',
  latitud: null,
  longitud: null,
  ip: '127.0.0.1',
});

describe('Filaauditoriacomponent', () => {
  let component: Filaauditoriacomponent;
  let fixture: ComponentFixture<Filaauditoriacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Filaauditoriacomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('registro', registroPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Solicitó el salón social"', () => {
    expect(textoDe(fixture)).toContain('Solicitó el salón social');
  });
});
