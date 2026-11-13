import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filausuariocomponent } from './filausuariocomponent';

describe('Filausuariocomponent', () => {
  let component: Filausuariocomponent;
  let fixture: ComponentFixture<Filausuariocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Filausuariocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Filausuariocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
