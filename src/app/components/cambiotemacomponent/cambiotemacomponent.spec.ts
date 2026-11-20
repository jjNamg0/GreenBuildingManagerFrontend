import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../../testing/pruebasutil';
import { Cambiotemacomponent } from './cambiotemacomponent';

describe('Cambiotemacomponent', () => {
  let component: Cambiotemacomponent;
  let fixture: ComponentFixture<Cambiotemacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Cambiotemacomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('cambia entre modo claro y oscuro', () => {
    const antes = component.esOscuro();
    component.alternar();
    expect(component.esOscuro()).toBe(!antes);
    component.alternar();
  });
});
