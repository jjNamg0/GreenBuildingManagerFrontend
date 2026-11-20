import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Invitarcomponent } from './invitarcomponent';

describe('Invitarcomponent', () => {
  let component: Invitarcomponent;
  let fixture: ComponentFixture<Invitarcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Invitarcomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('destino', { tipo: 'EVENTO', id: 20, titulo: 'Bingo familiar' });
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
