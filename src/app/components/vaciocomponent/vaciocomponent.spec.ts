import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Vaciocomponent } from './vaciocomponent';

describe('Vaciocomponent', () => {
  let component: Vaciocomponent;
  let fixture: ComponentFixture<Vaciocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Vaciocomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('titulo', 'Sin reservas');
    fixture.componentRef.setInput('texto', 'Aún no tienes reservas');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Sin reservas"', () => {
    expect(textoDe(fixture)).toContain('Sin reservas');
  });

  it('muestra "Aún no tienes reservas"', () => {
    expect(textoDe(fixture)).toContain('Aún no tienes reservas');
  });
});
