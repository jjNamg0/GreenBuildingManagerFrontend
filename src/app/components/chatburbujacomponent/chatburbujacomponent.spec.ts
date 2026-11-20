import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Chatburbujacomponent } from './chatburbujacomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { MensajeChat } from '../../models/chatmodel';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Devuelve el texto que se ve en pantalla de un component de prueba. */
const textoDe = <T>(fixture: ComponentFixture<T>): string =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';

/** Mensaje del chat de ejemplo para las pruebas. */
const mensajePrueba = (rol: MensajeChat['rol'], contenido: string): MensajeChat => ({
  rol,
  contenido,
});

describe('Chatburbujacomponent', () => {
  let component: Chatburbujacomponent;
  let fixture: ComponentFixture<Chatburbujacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Chatburbujacomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('mensaje', mensajePrueba('user', '¿Cómo reservo?'));
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "¿Cómo reservo?"', () => {
    expect(textoDe(fixture)).toContain('¿Cómo reservo?');
  });

  it('reconoce el mensaje del usuario', () => {
    expect(component.esUsuario).toBe(true);
  });

  it('reconoce el mensaje del asistente', () => {
    fixture.componentRef.setInput('mensaje', mensajePrueba('assistant', 'Ve a Reservar'));
    expect(component.esUsuario).toBe(false);
  });
});
