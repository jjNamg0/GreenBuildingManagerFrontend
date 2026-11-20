import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../../testing/pruebasutil';
import { Adminconjuntodetallecomponent } from './adminconjuntodetallecomponent';

describe('Adminconjuntodetallecomponent', () => {
  let component: Adminconjuntodetallecomponent;
  let fixture: ComponentFixture<Adminconjuntodetallecomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Adminconjuntodetallecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
