import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Registrocomponent } from './registrocomponent';

describe('Registrocomponent', () => {
  let component: Registrocomponent;
  let fixture: ComponentFixture<Registrocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Registrocomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Crear cuenta de residente"', () => {
    expect(textoDe(fixture)).toContain('Crear cuenta de residente');
  });
});
