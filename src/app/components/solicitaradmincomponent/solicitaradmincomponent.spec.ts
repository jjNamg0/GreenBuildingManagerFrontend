import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solicitaradmincomponent } from './solicitaradmincomponent';

describe('Solicitaradmincomponent', () => {
  let component: Solicitaradmincomponent;
  let fixture: ComponentFixture<Solicitaradmincomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solicitaradmincomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Solicitaradmincomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
