import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Espacioformcomponent } from './espacioformcomponent';

describe('Espacioformcomponent', () => {
  let component: Espacioformcomponent;
  let fixture: ComponentFixture<Espacioformcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Espacioformcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Espacioformcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
