import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Admineventoscomponent } from './admineventoscomponent';

describe('Admineventoscomponent', () => {
  let component: Admineventoscomponent;
  let fixture: ComponentFixture<Admineventoscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Admineventoscomponent);
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
