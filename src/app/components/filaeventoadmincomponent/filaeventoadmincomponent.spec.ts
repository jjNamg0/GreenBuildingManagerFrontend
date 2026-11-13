import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filaeventoadmincomponent } from './filaeventoadmincomponent';

describe('Filaeventoadmincomponent', () => {
  let component: Filaeventoadmincomponent;
  let fixture: ComponentFixture<Filaeventoadmincomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Filaeventoadmincomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Filaeventoadmincomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
