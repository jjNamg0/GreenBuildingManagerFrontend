import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Verificarcodigocomponent } from './verificarcodigocomponent';

describe('Verificarcodigocomponent', () => {
  let component: Verificarcodigocomponent;
  let fixture: ComponentFixture<Verificarcodigocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Verificarcodigocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Verificarcodigocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
