import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Adminauditoriacomponent } from './adminauditoriacomponent';

describe('Adminauditoriacomponent', () => {
  let component: Adminauditoriacomponent;
  let fixture: ComponentFixture<Adminauditoriacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Adminauditoriacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Adminauditoriacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
