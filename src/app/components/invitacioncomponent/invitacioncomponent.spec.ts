import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, instalarLeafletFalso } from '../../testing/pruebasutil';
import { Invitacioncomponent } from './invitacioncomponent';

describe('Invitacioncomponent', () => {
  let component: Invitacioncomponent;
  let fixture: ComponentFixture<Invitacioncomponent>;

  beforeEach(async () => {
    instalarLeafletFalso();
    await configurarPruebas();
    fixture = TestBed.createComponent(Invitacioncomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
