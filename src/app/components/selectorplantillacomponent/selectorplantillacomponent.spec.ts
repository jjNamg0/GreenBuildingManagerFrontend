import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Selectorplantillacomponent } from './selectorplantillacomponent';

describe('Selectorplantillacomponent', () => {
  let component: Selectorplantillacomponent;
  let fixture: ComponentFixture<Selectorplantillacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Selectorplantillacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Selectorplantillacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
