import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Verificarcodigocomponent } from './verificarcodigocomponent';

describe('Verificarcodigocomponent', () => {
  let component: Verificarcodigocomponent;
  let fixture: ComponentFixture<Verificarcodigocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Verificarcodigocomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Verifica tu correo"', () => {
    expect(textoDe(fixture)).toContain('Verifica tu correo');
  });
});
