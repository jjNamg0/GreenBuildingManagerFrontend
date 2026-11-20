import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, reservaPrueba } from '../../testing/pruebasutil';
import { Tarjetareservacomponent } from './tarjetareservacomponent';

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
