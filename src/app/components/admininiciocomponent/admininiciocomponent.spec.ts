import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Admininiciocomponent } from './admininiciocomponent';

describe('Admininiciocomponent', () => {
  let component: Admininiciocomponent;
  let fixture: ComponentFixture<Admininiciocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Admininiciocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Admininiciocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
