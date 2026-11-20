import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configurarPruebas, textoDe } from './testing/pruebasutil';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea la aplicación', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra el nombre de la aplicación en el menú', () => {
    expect(textoDe(fixture)).toContain('Green Building');
  });

  it('tiene el espacio donde se cargan las páginas', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('router-outlet')).not.toBeNull();
  });
});
