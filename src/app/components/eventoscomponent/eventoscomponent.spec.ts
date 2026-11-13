import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Eventoscomponent } from './eventoscomponent';

describe('Eventoscomponent', () => {
  let component: Eventoscomponent;
  let fixture: ComponentFixture<Eventoscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eventoscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Eventoscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
