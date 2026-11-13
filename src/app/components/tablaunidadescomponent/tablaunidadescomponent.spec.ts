import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tablaunidadescomponent } from './tablaunidadescomponent';

describe('Tablaunidadescomponent', () => {
  let component: Tablaunidadescomponent;
  let fixture: ComponentFixture<Tablaunidadescomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tablaunidadescomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Tablaunidadescomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
