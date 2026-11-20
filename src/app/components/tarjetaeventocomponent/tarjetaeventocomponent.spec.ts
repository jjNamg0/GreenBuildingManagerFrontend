import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, eventoPrueba } from '../../testing/pruebasutil';
import { Tarjetaeventocomponent } from './tarjetaeventocomponent';

describe('Tarjetaeventocomponent', () => {
  let component: Tarjetaeventocomponent;
  let fixture: ComponentFixture<Tarjetaeventocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Tarjetaeventocomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('evento', eventoPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Bingo familiar"', () => {
    expect(textoDe(fixture)).toContain('Bingo familiar');
  });
});
