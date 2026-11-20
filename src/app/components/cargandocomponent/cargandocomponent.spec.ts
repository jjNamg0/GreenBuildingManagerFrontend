import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Cargandocomponent } from './cargandocomponent';

describe('Cargandocomponent', () => {
  let component: Cargandocomponent;
  let fixture: ComponentFixture<Cargandocomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Cargandocomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activo', true);
    fixture.componentRef.setInput('texto', 'Cargando conjuntos...');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Cargando conjuntos..."', () => {
    expect(textoDe(fixture)).toContain('Cargando conjuntos...');
  });

  it('no muestra nada si no está activo', () => {
    fixture.componentRef.setInput('activo', false);
    fixture.detectChanges();
    expect(textoDe(fixture).trim()).toBe('');
  });
});
