import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calendarioreservacomponent } from './calendarioreservacomponent';

describe('Calendarioreservacomponent', () => {
  let component: Calendarioreservacomponent;
  let fixture: ComponentFixture<Calendarioreservacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Calendarioreservacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Calendarioreservacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
