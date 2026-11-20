import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../../testing/pruebasutil';
import { Reservarespaciocomponent } from './reservarespaciocomponent';

describe('Reservarespaciocomponent', () => {
  let component: Reservarespaciocomponent;
  let fixture: ComponentFixture<Reservarespaciocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Reservarespaciocomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
