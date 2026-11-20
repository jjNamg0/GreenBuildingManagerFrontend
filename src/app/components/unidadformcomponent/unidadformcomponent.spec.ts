import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, conjuntoPrueba } from '../../testing/pruebasutil';
import { Unidadformcomponent } from './unidadformcomponent';

describe('Unidadformcomponent', () => {
  let component: Unidadformcomponent;
  let fixture: ComponentFixture<Unidadformcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Unidadformcomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conjunto', conjuntoPrueba());
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
