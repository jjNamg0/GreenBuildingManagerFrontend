import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Adminconjuntoscomponent } from './adminconjuntoscomponent';

describe('Adminconjuntoscomponent', () => {
  let component: Adminconjuntoscomponent;
  let fixture: ComponentFixture<Adminconjuntoscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Adminconjuntoscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Conjuntos"', () => {
    expect(textoDe(fixture)).toContain('Conjuntos');
  });
});
