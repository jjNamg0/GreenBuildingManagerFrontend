import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Calendarioreservacomponent } from './calendarioreservacomponent';

describe('Calendarioreservacomponent', () => {
  let component: Calendarioreservacomponent;
  let fixture: ComponentFixture<Calendarioreservacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Calendarioreservacomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('franjas', [
      { horaInicio: '08:00', horaFin: '09:00', disponible: true },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "1. Elige el día"', () => {
    expect(textoDe(fixture)).toContain('1. Elige el día');
  });

  it('muestra "08:00"', () => {
    expect(textoDe(fixture)).toContain('08:00');
  });
});
