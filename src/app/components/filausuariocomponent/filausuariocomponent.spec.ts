import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, usuarioPrueba } from '../../testing/pruebasutil';
import { Filausuariocomponent } from './filausuariocomponent';

describe('Filausuariocomponent', () => {
  let component: Filausuariocomponent;
  let fixture: ComponentFixture<Filausuariocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Filausuariocomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('usuario', usuarioPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "ana@correo.com"', () => {
    expect(textoDe(fixture)).toContain('ana@correo.com');
  });
});
