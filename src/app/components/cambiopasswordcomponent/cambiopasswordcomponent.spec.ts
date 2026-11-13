import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cambiopasswordcomponent } from './cambiopasswordcomponent';

describe('Cambiopasswordcomponent', () => {
  let component: Cambiopasswordcomponent;
  let fixture: ComponentFixture<Cambiopasswordcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cambiopasswordcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Cambiopasswordcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
