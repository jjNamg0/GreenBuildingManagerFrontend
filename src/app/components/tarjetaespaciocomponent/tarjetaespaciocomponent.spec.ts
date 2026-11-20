import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, espacioPrueba } from '../../testing/pruebasutil';
import { Tarjetaespaciocomponent } from './tarjetaespaciocomponent';

describe('Tarjetaespaciocomponent', () => {
  let component: Tarjetaespaciocomponent;
  let fixture: ComponentFixture<Tarjetaespaciocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Tarjetaespaciocomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('espacio', espacioPrueba());
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
