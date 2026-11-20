import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Misreservascomponent } from './misreservascomponent';

describe('Misreservascomponent', () => {
  let component: Misreservascomponent;
  let fixture: ComponentFixture<Misreservascomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Misreservascomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Mis reservas"', () => {
    expect(textoDe(fixture)).toContain('Mis reservas');
  });
});
