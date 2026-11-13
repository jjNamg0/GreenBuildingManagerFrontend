import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filaauditoriacomponent } from './filaauditoriacomponent';

describe('Filaauditoriacomponent', () => {
  let component: Filaauditoriacomponent;
  let fixture: ComponentFixture<Filaauditoriacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Filaauditoriacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Filaauditoriacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
