import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Selectorinvitacioncomponent } from './selectorinvitacioncomponent';

describe('Selectorinvitacioncomponent', () => {
  let component: Selectorinvitacioncomponent;
  let fixture: ComponentFixture<Selectorinvitacioncomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Selectorinvitacioncomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Selectorinvitacioncomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
