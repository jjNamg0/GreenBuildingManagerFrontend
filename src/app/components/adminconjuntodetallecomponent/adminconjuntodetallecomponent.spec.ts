import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Adminconjuntodetallecomponent } from './adminconjuntodetallecomponent';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Adminconjuntodetallecomponent', () => {
  let component: Adminconjuntodetallecomponent;
  let fixture: ComponentFixture<Adminconjuntodetallecomponent>;

  beforeEach(async () => {
    await configurarPruebas();
    fixture = TestBed.createComponent(Adminconjuntodetallecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});
