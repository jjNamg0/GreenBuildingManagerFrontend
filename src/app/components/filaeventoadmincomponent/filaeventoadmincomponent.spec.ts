import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, eventoPrueba } from '../../testing/pruebasutil';
import { Filaeventoadmincomponent } from './filaeventoadmincomponent';

describe('Filaeventoadmincomponent', () => {
  let component: Filaeventoadmincomponent;
  let fixture: ComponentFixture<Filaeventoadmincomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Filaeventoadmincomponent);
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
