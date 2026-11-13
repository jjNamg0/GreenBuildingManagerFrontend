import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Asignarunidadcomponent } from './asignarunidadcomponent';

describe('Asignarunidadcomponent', () => {
  let component: Asignarunidadcomponent;
  let fixture: ComponentFixture<Asignarunidadcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Asignarunidadcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Asignarunidadcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
