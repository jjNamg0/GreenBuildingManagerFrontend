import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Logincomponent } from './logincomponent';

describe('Logincomponent', () => {
  let component: Logincomponent;
  let fixture: ComponentFixture<Logincomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Logincomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Iniciar sesión"', () => {
    expect(textoDe(fixture)).toContain('Iniciar sesión');
  });
});
