import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Adminreservascomponent } from './adminreservascomponent';

describe('Adminreservascomponent', () => {
  let component: Adminreservascomponent;
  let fixture: ComponentFixture<Adminreservascomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Adminreservascomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Adminreservascomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
