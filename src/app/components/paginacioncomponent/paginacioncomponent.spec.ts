import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paginacioncomponent } from './paginacioncomponent';

describe('Paginacioncomponent', () => {
  let component: Paginacioncomponent;
  let fixture: ComponentFixture<Paginacioncomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Paginacioncomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Paginacioncomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
