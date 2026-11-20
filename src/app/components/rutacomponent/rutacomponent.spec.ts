import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe, conjuntoPrueba } from '../../testing/pruebasutil';
import { Rutacomponent } from './rutacomponent';

describe('Rutacomponent', () => {
  let component: Rutacomponent;
  let fixture: ComponentFixture<Rutacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Rutacomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conjunto', conjuntoPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Torres del Parque"', () => {
    expect(textoDe(fixture)).toContain('Torres del Parque');
  });
});
