import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Usuarioservice } from './usuarioservice';
import { AppModule } from '../app-module';
import { Usuario } from '../models/usuariomodel';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Residente de ejemplo para las pruebas. */
const usuarioPrueba = (): Usuario => ({
  id: 10,
  nombre: 'Ana',
  apellido: 'Pérez',
  username: 'ana@correo.com',
  telefono: '3001234567',
  role: 'USER',
  verificado: true,
  activo: true,
  conjuntoId: 1,
  conjuntoNombre: 'Torres del Parque',
  unidadId: 5,
  unidadDescripcion: 'Torre 1 - 101',
  unidadSolicitada: 'Torre 1 - 101',
  intereses: ['DEPORTE'],
});

describe('Usuarioservice', () => {
  let service: Usuarioservice;
  let http: HttpTestingController;

  beforeEach(async () => {
    await configurarPruebas();
    service = TestBed.inject(Usuarioservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('se crea', () => {
    expect(service).toBeTruthy();
  });

  it('consulta el usuario de la sesión', () => {
    let resultado: unknown;
    service.obtenerMiUsuario().subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne((req) => req.url === `${environment.urlApi}/user/getme`);
    expect(peticion.request.method).toBe('GET');
    peticion.flush(usuarioPrueba());
    expect(resultado).toEqual(usuarioPrueba());
  });

  it('asigna una unidad enviando los ids como parámetros', () => {
    let resultado: unknown;
    service.asignarUnidad(10, 5).subscribe((valor) => (resultado = valor));
    const peticion = http.expectOne(
      (req) => req.url === `${environment.urlApi}/user/asignarunidad`,
    );
    expect(peticion.request.method).toBe('PUT');
    expect(peticion.request.params.get('unidadId')).toBe('5');
    peticion.flush('Unidad asignada');
    expect(resultado).toEqual('Unidad asignada');
  });
});
