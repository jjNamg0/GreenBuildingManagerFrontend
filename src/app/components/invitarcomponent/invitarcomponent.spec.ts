import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Invitarcomponent } from './invitarcomponent';

describe('Invitarcomponent', () => {
  let component: Invitarcomponent;
  let fixture: ComponentFixture<Invitarcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Invitarcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Invitarcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
