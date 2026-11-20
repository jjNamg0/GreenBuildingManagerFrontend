import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Adminreservascomponent } from './adminreservascomponent';

describe('Adminreservascomponent', () => {
  let component: Adminreservascomponent;
  let fixture: ComponentFixture<Adminreservascomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Adminreservascomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Reservas"', () => {
    expect(textoDe(fixture)).toContain('Reservas');
  });
});
