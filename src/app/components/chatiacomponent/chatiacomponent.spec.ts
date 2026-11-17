import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Chatiacomponent } from './chatiacomponent';

describe('Chatiacomponent', () => {
  let component: Chatiacomponent;
  let fixture: ComponentFixture<Chatiacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Chatiacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Chatiacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
