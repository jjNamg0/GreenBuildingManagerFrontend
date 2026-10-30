import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Olvidecontrasenacomponent } from './olvidecontrasenacomponent';

describe('Olvidecontrasenacomponent', () => {
  let component: Olvidecontrasenacomponent;
  let fixture: ComponentFixture<Olvidecontrasenacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Olvidecontrasenacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Olvidecontrasenacomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
