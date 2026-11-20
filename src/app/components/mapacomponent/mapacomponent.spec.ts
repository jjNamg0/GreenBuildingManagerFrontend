import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, instalarLeafletFalso } from '../../testing/pruebasutil';
import { Mapacomponent } from './mapacomponent';

describe('Mapacomponent', () => {
  let component: Mapacomponent;
  let fixture: ComponentFixture<Mapacomponent>;

  beforeEach(async () => {
    instalarLeafletFalso();
    await configurarPruebas();
    fixture = TestBed.createComponent(Mapacomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
