import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjetareservacomponent } from './tarjetareservacomponent';

describe('Tarjetareservacomponent', () => {
  let component: Tarjetareservacomponent;
  let fixture: ComponentFixture<Tarjetareservacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tarjetareservacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarjetareservacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
