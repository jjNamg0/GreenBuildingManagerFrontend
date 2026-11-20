import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjetaeventocomponent } from './tarjetaeventocomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { Evento } from '../../models/eventomodel';

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

/** Evento de ejemplo para las pruebas, dentro de tres días. */
const eventoPrueba = (): Evento => ({
  id: 20,
  conjuntoId: 1,
  conjuntoNombre: 'Torres del Parque',
  espacioId: 3,
  espacioNombre: 'Salón social',
  titulo: 'Bingo familiar',
  descripcion: 'Bingo con premios',
  tipo: 'FIESTA',
  fecha: fechaEnDias(3),
  horaInicio: '15:00',
  horaFin: '17:00',
  paraNinos: false,
  cupoMaximo: 30,
  totalAsistentes: 4,
  asistire: false,
  estado: 'PROGRAMADO',
  motivoCancelacion: null,
  plantilla: 'FIESTA',
});

describe('Tarjetaeventocomponent', () => {
  let component: Tarjetaeventocomponent;
  let fixture: ComponentFixture<Tarjetaeventocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Tarjetaeventocomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('evento', eventoPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Bingo familiar"', () => {
    expect(textoDe(fixture)).toContain('Bingo familiar');
  });
});
