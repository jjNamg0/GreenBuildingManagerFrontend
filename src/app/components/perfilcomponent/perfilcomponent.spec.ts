import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../../testing/pruebasutil';
import { Perfilcomponent } from './perfilcomponent';

describe('Perfilcomponent', () => {
  let component: Perfilcomponent;
  let fixture: ComponentFixture<Perfilcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Perfilcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
