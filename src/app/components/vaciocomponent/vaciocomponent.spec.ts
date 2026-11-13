import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Vaciocomponent } from './vaciocomponent';

describe('Vaciocomponent', () => {
  let component: Vaciocomponent;
  let fixture: ComponentFixture<Vaciocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Vaciocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Vaciocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
