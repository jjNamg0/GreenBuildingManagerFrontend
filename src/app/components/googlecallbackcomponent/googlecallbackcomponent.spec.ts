import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Googlecallbackcomponent } from './googlecallbackcomponent';

describe('Googlecallbackcomponent', () => {
  let component: Googlecallbackcomponent;
  let fixture: ComponentFixture<Googlecallbackcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Googlecallbackcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Googlecallbackcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
