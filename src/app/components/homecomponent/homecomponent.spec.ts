import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Homecomponent } from './homecomponent';

describe('Homecomponent', () => {
  let component: Homecomponent;
  let fixture: ComponentFixture<Homecomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Homecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Todo tu conjunto, en un solo lugar"', () => {
    expect(textoDe(fixture)).toContain('Todo tu conjunto, en un solo lugar');
  });
});
