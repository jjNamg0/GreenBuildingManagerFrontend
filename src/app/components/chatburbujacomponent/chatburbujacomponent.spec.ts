import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, mensajePrueba } from '../../testing/pruebasutil';
import { Chatburbujacomponent } from './chatburbujacomponent';

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
