import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, reservaPrueba } from '../../testing/pruebasutil';
import { Filareservaadmincomponent } from './filareservaadmincomponent';

describe('Filareservaadmincomponent', () => {
  let component: Filareservaadmincomponent;
  let fixture: ComponentFixture<Filareservaadmincomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Filareservaadmincomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('reserva', reservaPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Ana Pérez"', () => {
    expect(textoDe(fixture)).toContain('Ana Pérez');
  });
});
