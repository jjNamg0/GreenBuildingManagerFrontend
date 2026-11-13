import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Conjuntoscercanoscomponent } from './conjuntoscercanoscomponent';

describe('Conjuntoscercanoscomponent', () => {
  let component: Conjuntoscercanoscomponent;
  let fixture: ComponentFixture<Conjuntoscercanoscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Conjuntoscercanoscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Conjuntoscercanoscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
