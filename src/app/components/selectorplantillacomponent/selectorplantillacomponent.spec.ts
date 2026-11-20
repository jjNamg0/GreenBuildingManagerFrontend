import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas } from '../../testing/pruebasutil';
import { Selectorplantillacomponent } from './selectorplantillacomponent';

describe('Selectorplantillacomponent', () => {
  let component: Selectorplantillacomponent;
  let fixture: ComponentFixture<Selectorplantillacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Selectorplantillacomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('emite la plantilla elegida', () => {
    let elegida = '';
    component.elegir.subscribe((plantilla) => (elegida = plantilla));
    component.elegir.emit('ELEGANTE');
    expect(elegida).toBe('ELEGANTE');
  });
});
