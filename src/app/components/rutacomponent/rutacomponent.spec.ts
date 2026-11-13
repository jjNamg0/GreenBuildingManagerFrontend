import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rutacomponent } from './rutacomponent';

describe('Rutacomponent', () => {
  let component: Rutacomponent;
  let fixture: ComponentFixture<Rutacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Rutacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Rutacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
