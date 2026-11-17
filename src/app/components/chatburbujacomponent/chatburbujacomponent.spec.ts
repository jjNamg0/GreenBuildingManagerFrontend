import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Chatburbujacomponent } from './chatburbujacomponent';

describe('Chatburbujacomponent', () => {
  let component: Chatburbujacomponent;
  let fixture: ComponentFixture<Chatburbujacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Chatburbujacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Chatburbujacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
