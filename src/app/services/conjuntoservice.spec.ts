import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Conjuntoservice } from './conjuntoservice';
import { AppModule } from '../app-module';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

describe('Conjuntoservice', () => {
  let service: Conjuntoservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Conjuntoservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('devuelve una lista vacía si el back responde null', () => {
    let resultado: unknown;
    service.obtenerTodos().subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/conjunto/getall`);
    expect(peticion.request.method).toBe('GET');
    peticion.flush(null);
    expect(resultado).toEqual([]);
  });

  it('elimina un conjunto por id', () => {
    let resultado: unknown;
    service.eliminar(7).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/conjunto/deletebyid/7`,
    );
    expect(peticion.request.method).toBe('DELETE');
    peticion.flush('Eliminado');
    expect(resultado).toEqual('Eliminado');
  });

  it('actualiza enviando el id como parámetro', () => {
    let resultado: unknown;
    service.actualizar(7, {} as never).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/conjunto/updatejson`,
    );
    expect(peticion.request.method).toBe('PUT');
    expect(peticion.request.params.get('id')).toBe('7');
    peticion.flush('Actualizado');
    expect(resultado).toEqual('Actualizado');
  });
});
