import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Googlecallbackcomponent } from './googlecallbackcomponent';

describe('Googlecallbackcomponent', () => {
  let component: Googlecallbackcomponent;
  let fixture: ComponentFixture<Googlecallbackcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Googlecallbackcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Googlecallbackcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
