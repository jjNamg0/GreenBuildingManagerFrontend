import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../../testing/pruebasutil';
import { Miconjuntocomponent } from './miconjuntocomponent';

describe('Miconjuntocomponent', () => {
  let component: Miconjuntocomponent;
  let fixture: ComponentFixture<Miconjuntocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Miconjuntocomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
