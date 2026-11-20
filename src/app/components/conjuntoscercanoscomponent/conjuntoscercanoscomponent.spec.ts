import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../../testing/pruebasutil';
import { Conjuntoscercanoscomponent } from './conjuntoscercanoscomponent';

describe('Conjuntoscercanoscomponent', () => {
  let component: Conjuntoscercanoscomponent;
  let fixture: ComponentFixture<Conjuntoscercanoscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Conjuntoscercanoscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
