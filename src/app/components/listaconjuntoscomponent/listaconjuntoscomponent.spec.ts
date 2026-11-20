import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, conjuntoPrueba } from '../../testing/pruebasutil';
import { Listaconjuntoscomponent } from './listaconjuntoscomponent';

describe('Listaconjuntoscomponent', () => {
  let component: Listaconjuntoscomponent;
  let fixture: ComponentFixture<Listaconjuntoscomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Listaconjuntoscomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conjuntos', [conjuntoPrueba()]);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Conjuntos residenciales"', () => {
    expect(textoDe(fixture)).toContain('Conjuntos residenciales');
  });

  it('muestra "Torres del Parque"', () => {
    expect(textoDe(fixture)).toContain('Torres del Parque');
  });
});
