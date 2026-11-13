import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Adminconjuntodetallecomponent } from './adminconjuntodetallecomponent';

describe('Adminconjuntodetallecomponent', () => {
  let component: Adminconjuntodetallecomponent;
  let fixture: ComponentFixture<Adminconjuntodetallecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Adminconjuntodetallecomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Adminconjuntodetallecomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
