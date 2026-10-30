import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reservarespaciocomponent } from './reservarespaciocomponent';

describe('Reservarespaciocomponent', () => {
  let component: Reservarespaciocomponent;
  let fixture: ComponentFixture<Reservarespaciocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Reservarespaciocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Reservarespaciocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
