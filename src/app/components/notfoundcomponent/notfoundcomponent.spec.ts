import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Notfoundcomponent } from './notfoundcomponent';

describe('Notfoundcomponent', () => {
  let component: Notfoundcomponent;
  let fixture: ComponentFixture<Notfoundcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Notfoundcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Esta página no existe"', () => {
    expect(textoDe(fixture)).toContain('Esta página no existe');
  });
});
