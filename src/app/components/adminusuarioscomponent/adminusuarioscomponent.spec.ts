import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Adminusuarioscomponent } from './adminusuarioscomponent';

describe('Adminusuarioscomponent', () => {
  let component: Adminusuarioscomponent;
  let fixture: ComponentFixture<Adminusuarioscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Adminusuarioscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Usuarios"', () => {
    expect(textoDe(fixture)).toContain('Usuarios');
  });
});
