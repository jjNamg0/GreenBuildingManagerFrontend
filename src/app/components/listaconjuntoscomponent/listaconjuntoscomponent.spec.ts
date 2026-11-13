import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Listaconjuntoscomponent } from './listaconjuntoscomponent';

describe('Listaconjuntoscomponent', () => {
  let component: Listaconjuntoscomponent;
  let fixture: ComponentFixture<Listaconjuntoscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listaconjuntoscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Listaconjuntoscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
