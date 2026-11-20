import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../../testing/pruebasutil';
import { Footercomponent } from './footercomponent';

describe('Footercomponent', () => {
  let component: Footercomponent;
  let fixture: ComponentFixture<Footercomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Footercomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
