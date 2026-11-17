import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Invitacioncomponent } from './invitacioncomponent';

describe('Invitacioncomponent', () => {
  let component: Invitacioncomponent;
  let fixture: ComponentFixture<Invitacioncomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Invitacioncomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Invitacioncomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
