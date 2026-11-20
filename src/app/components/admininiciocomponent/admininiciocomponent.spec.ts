import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Admininiciocomponent } from './admininiciocomponent';

describe('Admininiciocomponent', () => {
  let component: Admininiciocomponent;
  let fixture: ComponentFixture<Admininiciocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Admininiciocomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Accesos rápidos"', () => {
    expect(textoDe(fixture)).toContain('Accesos rápidos');
  });
});
