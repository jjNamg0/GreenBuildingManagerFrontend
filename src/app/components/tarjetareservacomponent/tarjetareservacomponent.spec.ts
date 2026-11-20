import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjetareservacomponent } from './tarjetareservacomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { Reserva } from '../../models/reservamodel';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Devuelve el texto que se ve en pantalla de un component de prueba. */
const textoDe = <T>(fixture: ComponentFixture<T>): string =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';

/** Fecha en formato AAAA-MM-DD dentro de la cantidad de días indicada. */
const fechaEnDias = (dias: number): string => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
};

/** Reserva de ejemplo para las pruebas, dentro de dos días. */
const reservaPrueba = (): Reserva => ({
  id: 30,
  espacioId: 3,
  espacioNombre: 'Salón social',
  conjuntoNombre: 'Torres del Parque',
  usuarioId: 10,
  usuarioNombre: 'Ana Pérez',
  unidadDescripcion: 'Torre 1 - 101',
  fecha: fechaEnDias(2),
  horaInicio: '10:00',
  horaFin: '12:00',
  motivo: 'Cumpleaños de Sofía',
  asistentes: 15,
  estado: 'PENDIENTE',
  observacion: null,
  fechaCreacion: '2026-11-20T10:00:00',
});

describe('Tarjetareservacomponent', () => {
  let component: Tarjetareservacomponent;
  let fixture: ComponentFixture<Tarjetareservacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Tarjetareservacomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('reserva', reservaPrueba());
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
