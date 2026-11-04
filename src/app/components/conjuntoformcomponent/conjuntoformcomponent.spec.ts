import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Conjuntoformcomponent } from './conjuntoformcomponent';

describe('Conjuntoformcomponent', () => {
  let component: Conjuntoformcomponent;
  let fixture: ComponentFixture<Conjuntoformcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Conjuntoformcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Conjuntoformcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
