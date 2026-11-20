import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Terminoscomponent } from './terminoscomponent';

describe('Terminoscomponent', () => {
  let component: Terminoscomponent;
  let fixture: ComponentFixture<Terminoscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Terminoscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "1. Objeto"', () => {
    expect(textoDe(fixture)).toContain('1. Objeto');
  });
});
