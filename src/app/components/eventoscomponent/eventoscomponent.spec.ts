import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Eventoscomponent } from './eventoscomponent';

describe('Eventoscomponent', () => {
  let component: Eventoscomponent;
  let fixture: ComponentFixture<Eventoscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Eventoscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Eventos"', () => {
    expect(textoDe(fixture)).toContain('Eventos');
  });
});
