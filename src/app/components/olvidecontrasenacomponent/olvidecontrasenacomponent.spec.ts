import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from '../../testing/pruebasutil';
import { Olvidecontrasenacomponent } from './olvidecontrasenacomponent';

describe('Olvidecontrasenacomponent', () => {
  let component: Olvidecontrasenacomponent;
  let fixture: ComponentFixture<Olvidecontrasenacomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Olvidecontrasenacomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Restablecer contraseña"', () => {
    expect(textoDe(fixture)).toContain('Restablecer contraseña');
  });
});
