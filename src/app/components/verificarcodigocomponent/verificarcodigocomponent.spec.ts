import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verificarcodigocomponent } from './verificarcodigocomponent';

describe('Verificarcodigocomponent', () => {
  let component: Verificarcodigocomponent;
  let fixture: ComponentFixture<Verificarcodigocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verificarcodigocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Verificarcodigocomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
