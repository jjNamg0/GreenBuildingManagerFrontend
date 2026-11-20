import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Cambiopasswordcomponent } from './cambiopasswordcomponent';

describe('Cambiopasswordcomponent', () => {
  let component: Cambiopasswordcomponent;
  let fixture: ComponentFixture<Cambiopasswordcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Cambiopasswordcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Cambiar contraseña"', () => {
    expect(textoDe(fixture)).toContain('Cambiar contraseña');
  });
});
