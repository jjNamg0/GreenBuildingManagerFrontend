import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Barralateralcomponent } from './barralateralcomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Barralateralcomponent', () => {
  let component: Barralateralcomponent;
  let fixture: ComponentFixture<Barralateralcomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Barralateralcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
