import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Adminusuarioscomponent } from './adminusuarioscomponent';

describe('Adminusuarioscomponent', () => {
  let component: Adminusuarioscomponent;
  let fixture: ComponentFixture<Adminusuarioscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Adminusuarioscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Adminusuarioscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
