import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Admineventoscomponent } from './admineventoscomponent';

describe('Admineventoscomponent', () => {
  let component: Admineventoscomponent;
  let fixture: ComponentFixture<Admineventoscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Admineventoscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Admineventoscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
