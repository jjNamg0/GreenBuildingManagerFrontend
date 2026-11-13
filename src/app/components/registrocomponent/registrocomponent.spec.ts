import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registrocomponent } from './registrocomponent';

describe('Registrocomponent', () => {
  let component: Registrocomponent;
  let fixture: ComponentFixture<Registrocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Registrocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Registrocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
