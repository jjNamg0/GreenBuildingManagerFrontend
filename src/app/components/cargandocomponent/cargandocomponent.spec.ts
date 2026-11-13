import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cargandocomponent } from './cargandocomponent';

describe('Cargandocomponent', () => {
  let component: Cargandocomponent;
  let fixture: ComponentFixture<Cargandocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cargandocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Cargandocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
