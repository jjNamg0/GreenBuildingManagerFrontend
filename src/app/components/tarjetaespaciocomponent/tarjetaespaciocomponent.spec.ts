import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjetaespaciocomponent } from './tarjetaespaciocomponent';

describe('Tarjetaespaciocomponent', () => {
  let component: Tarjetaespaciocomponent;
  let fixture: ComponentFixture<Tarjetaespaciocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tarjetaespaciocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarjetaespaciocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
