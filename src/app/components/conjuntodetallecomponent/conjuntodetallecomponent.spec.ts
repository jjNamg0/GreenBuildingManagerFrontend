import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Conjuntodetallecomponent } from './conjuntodetallecomponent';

describe('Conjuntodetallecomponent', () => {
  let component: Conjuntodetallecomponent;
  let fixture: ComponentFixture<Conjuntodetallecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Conjuntodetallecomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Conjuntodetallecomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
