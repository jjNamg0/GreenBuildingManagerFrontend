import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Olvidecontrasenacomponent } from './olvidecontrasenacomponent';

describe('Olvidecontrasenacomponent', () => {
  let component: Olvidecontrasenacomponent;
  let fixture: ComponentFixture<Olvidecontrasenacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Olvidecontrasenacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Olvidecontrasenacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
