import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Tablaespacioscomponent } from './tablaespacioscomponent';

describe('Tablaespacioscomponent', () => {
  let component: Tablaespacioscomponent;
  let fixture: ComponentFixture<Tablaespacioscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Tablaespacioscomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conjuntoId', 1);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Espacios de esparcimiento"', () => {
    expect(textoDe(fixture)).toContain('Espacios de esparcimiento');
  });
});
