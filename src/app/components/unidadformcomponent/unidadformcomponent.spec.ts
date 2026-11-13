import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Unidadformcomponent } from './unidadformcomponent';

describe('Unidadformcomponent', () => {
  let component: Unidadformcomponent;
  let fixture: ComponentFixture<Unidadformcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Unidadformcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Unidadformcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
