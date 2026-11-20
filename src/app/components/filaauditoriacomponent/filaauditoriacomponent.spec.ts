import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, registroPrueba } from '../../testing/pruebasutil';
import { Filaauditoriacomponent } from './filaauditoriacomponent';

describe('Filaauditoriacomponent', () => {
  let component: Filaauditoriacomponent;
  let fixture: ComponentFixture<Filaauditoriacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Filaauditoriacomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('registro', registroPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Solicitó el salón social"', () => {
    expect(textoDe(fixture)).toContain('Solicitó el salón social');
  });
});
