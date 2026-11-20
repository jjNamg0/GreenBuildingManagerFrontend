import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, instalarLeafletFalso } from '../../testing/pruebasutil';
import { Conjuntoformcomponent } from './conjuntoformcomponent';

describe('Conjuntoformcomponent', () => {
  let component: Conjuntoformcomponent;
  let fixture: ComponentFixture<Conjuntoformcomponent>;

  beforeEach(async () => {
    instalarLeafletFalso();
    await configurarPruebas();
    fixture = TestBed.createComponent(Conjuntoformcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
