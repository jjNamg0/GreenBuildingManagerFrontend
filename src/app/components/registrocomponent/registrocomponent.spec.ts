import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registrocomponent } from './registrocomponent';

describe('Registrocomponent', () => {
  let component: Registrocomponent;
  let fixture: ComponentFixture<Registrocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registrocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Registrocomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
