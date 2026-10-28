import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Barralateralcomponent } from './barralateralcomponent';

describe('Barralateralcomponent', () => {
  let component: Barralateralcomponent;
  let fixture: ComponentFixture<Barralateralcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Barralateralcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Barralateralcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
