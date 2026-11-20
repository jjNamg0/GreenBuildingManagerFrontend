import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Privacidadcomponent } from './privacidadcomponent';

describe('Privacidadcomponent', () => {
  let component: Privacidadcomponent;
  let fixture: ComponentFixture<Privacidadcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Privacidadcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Datos que recolectamos"', () => {
    expect(textoDe(fixture)).toContain('Datos que recolectamos');
  });
});
