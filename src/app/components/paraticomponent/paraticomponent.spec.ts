import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paraticomponent } from './paraticomponent';

describe('Paraticomponent', () => {
  let component: Paraticomponent;
  let fixture: ComponentFixture<Paraticomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Paraticomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Paraticomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
