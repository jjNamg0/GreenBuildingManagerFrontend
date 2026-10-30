import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Miconjuntocomponent } from './miconjuntocomponent';

describe('Miconjuntocomponent', () => {
  let component: Miconjuntocomponent;
  let fixture: ComponentFixture<Miconjuntocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Miconjuntocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Miconjuntocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
