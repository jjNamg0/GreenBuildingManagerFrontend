import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  configurarPruebas,
  textoDe,
  usuarioPrueba,
  conjuntoPrueba,
} from '../../testing/pruebasutil';
import { Asignarunidadcomponent } from './asignarunidadcomponent';

describe('Asignarunidadcomponent', () => {
  let component: Asignarunidadcomponent;
  let fixture: ComponentFixture<Asignarunidadcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Asignarunidadcomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('usuario', usuarioPrueba());
    fixture.componentRef.setInput('conjuntos', [conjuntoPrueba()]);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Asignar unidad"', () => {
    expect(textoDe(fixture)).toContain('Asignar unidad');
  });
});
