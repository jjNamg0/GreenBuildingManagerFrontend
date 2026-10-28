import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cambiotemacomponent } from './cambiotemacomponent';

describe('Cambiotemacomponent', () => {
  let component: Cambiotemacomponent;
  let fixture: ComponentFixture<Cambiotemacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cambiotemacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Cambiotemacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
