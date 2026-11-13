import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Alertacomponent } from './alertacomponent';

describe('Alertacomponent', () => {
  let component: Alertacomponent;
  let fixture: ComponentFixture<Alertacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Alertacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Alertacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
