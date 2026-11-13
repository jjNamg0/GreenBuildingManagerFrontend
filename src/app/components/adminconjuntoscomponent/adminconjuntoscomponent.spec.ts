import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Adminconjuntoscomponent } from './adminconjuntoscomponent';

describe('Adminconjuntoscomponent', () => {
  let component: Adminconjuntoscomponent;
  let fixture: ComponentFixture<Adminconjuntoscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Adminconjuntoscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Adminconjuntoscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
