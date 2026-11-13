import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tablaespacioscomponent } from './tablaespacioscomponent';

describe('Tablaespacioscomponent', () => {
  let component: Tablaespacioscomponent;
  let fixture: ComponentFixture<Tablaespacioscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tablaespacioscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Tablaespacioscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
