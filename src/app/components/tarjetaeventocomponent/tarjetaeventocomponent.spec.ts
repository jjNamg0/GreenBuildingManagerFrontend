import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjetaeventocomponent } from './tarjetaeventocomponent';

describe('Tarjetaeventocomponent', () => {
  let component: Tarjetaeventocomponent;
  let fixture: ComponentFixture<Tarjetaeventocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tarjetaeventocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarjetaeventocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
