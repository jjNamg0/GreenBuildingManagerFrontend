import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, conjuntoPrueba } from '../../testing/pruebasutil';
import { Tablaunidadescomponent } from './tablaunidadescomponent';

describe('Tablaunidadescomponent', () => {
  let component: Tablaunidadescomponent;
  let fixture: ComponentFixture<Tablaunidadescomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Tablaunidadescomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conjunto', conjuntoPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Unidades"', () => {
    expect(textoDe(fixture)).toContain('Unidades');
  });
});
