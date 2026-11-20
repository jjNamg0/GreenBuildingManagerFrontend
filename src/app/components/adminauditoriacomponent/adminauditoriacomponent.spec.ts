import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Adminauditoriacomponent } from './adminauditoriacomponent';

describe('Adminauditoriacomponent', () => {
  let component: Adminauditoriacomponent;
  let fixture: ComponentFixture<Adminauditoriacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Adminauditoriacomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Auditoría"', () => {
    expect(textoDe(fixture)).toContain('Auditoría');
  });
});
