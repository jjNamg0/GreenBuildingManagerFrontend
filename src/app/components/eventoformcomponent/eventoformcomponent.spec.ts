import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Eventoformcomponent } from './eventoformcomponent';

describe('Eventoformcomponent', () => {
  let component: Eventoformcomponent;
  let fixture: ComponentFixture<Eventoformcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Eventoformcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Eventoformcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
