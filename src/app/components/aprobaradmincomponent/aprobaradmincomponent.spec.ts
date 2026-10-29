import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aprobaradmincomponent } from './aprobaradmincomponent';

describe('Aprobaradmincomponent', () => {
  let component: Aprobaradmincomponent;
  let fixture: ComponentFixture<Aprobaradmincomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aprobaradmincomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Aprobaradmincomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
