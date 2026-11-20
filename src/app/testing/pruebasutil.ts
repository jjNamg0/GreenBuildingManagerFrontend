import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../app-module';
import { Conjunto } from '../models/conjuntomodel';
import { Usuario } from '../models/usuariomodel';
import { Evento } from '../models/eventomodel';
import { Reserva } from '../models/reservamodel';
import { Espacio } from '../models/espaciomodel';
import { Unidad } from '../models/unidadmodel';
import { RegistroAuditoria } from '../models/auditoriamodel';
import { MensajeChat } from '../models/chatmodel';

/** Configura el módulo de pruebas con toda la aplicación y un HTTP simulado que no llama al back. */
export const configurarPruebas = (): Promise<void> =>
  TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [provideHttpClientTesting()],
  }).compileComponents();

/** Devuelve el texto que se ve en pantalla de un component de prueba. */
export const textoDe = <T>(fixture: ComponentFixture<T>): string =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';

/** Fecha en formato AAAA-MM-DD dentro de la cantidad de días indicada. */
export const fechaEnDias = (dias: number): string => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
};

/** Conjunto de ejemplo para las pruebas. */
export const conjuntoPrueba = (): Conjunto => ({
  id: 1,
  nombre: 'Torres del Parque',
  tipo: 'APARTAMENTOS',
  direccion: 'Calle 145 # 46-80',
  municipio: 'Chía',
  latitud: 4.86,
  longitud: -74.03,
  descripcion: 'Conjunto de prueba',
  imagenUrl: null,
  totalUnidades: 20,
  totalEspacios: 4,
});

/** Residente de ejemplo para las pruebas. */
export const usuarioPrueba = (): Usuario => ({
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

/** Evento de ejemplo para las pruebas, dentro de tres días. */
export const eventoPrueba = (): Evento => ({
  id: 20,
  conjuntoId: 1,
  conjuntoNombre: 'Torres del Parque',
  espacioId: 3,
  espacioNombre: 'Salón social',
  titulo: 'Bingo familiar',
  descripcion: 'Bingo con premios',
  tipo: 'FIESTA',
  fecha: fechaEnDias(3),
  horaInicio: '15:00',
  horaFin: '17:00',
  paraNinos: false,
  cupoMaximo: 30,
  totalAsistentes: 4,
  asistire: false,
  estado: 'PROGRAMADO',
  motivoCancelacion: null,
  plantilla: 'FIESTA',
});

/** Reserva de ejemplo para las pruebas, dentro de dos días. */
export const reservaPrueba = (): Reserva => ({
  id: 30,
  espacioId: 3,
  espacioNombre: 'Salón social',
  conjuntoNombre: 'Torres del Parque',
  usuarioId: 10,
  usuarioNombre: 'Ana Pérez',
  unidadDescripcion: 'Torre 1 - 101',
  fecha: fechaEnDias(2),
  horaInicio: '10:00',
  horaFin: '12:00',
  motivo: 'Cumpleaños de Sofía',
  asistentes: 15,
  estado: 'PENDIENTE',
  observacion: null,
  fechaCreacion: '2026-11-20T10:00:00',
});

/** Espacio común de ejemplo para las pruebas. */
export const espacioPrueba = (): Espacio => ({
  id: 3,
  conjuntoId: 1,
  nombre: 'Salón social',
  tipo: 'SALON_SOCIAL',
  descripcion: 'Salón para 50 personas',
  capacidad: 50,
  horaApertura: '08:00',
  horaCierre: '22:00',
  requiereReserva: true,
  disponible: true,
  imagenUrl: null,
});

/** Unidad de ejemplo para las pruebas. */
export const unidadPrueba = (): Unidad => ({
  id: 5,
  conjuntoId: 1,
  tipo: 'APARTAMENTO',
  agrupacion: 'Torre 1',
  numero: '101',
  descripcion: 'Torre 1 - 101',
  residentes: ['Ana Pérez'],
});

/** Registro de auditoría de ejemplo para las pruebas. */
export const registroPrueba = (): RegistroAuditoria => ({
  id: 1,
  username: 'ana@correo.com',
  nombreUsuario: 'Ana Pérez',
  role: 'USER',
  fecha: '2026-11-20T10:00:00',
  accion: 'RESERVA',
  entidad: 'Reserva',
  motivo: 'Solicitó el salón social',
  ubicacion: 'Sin ubicación',
  latitud: null,
  longitud: null,
  ip: '127.0.0.1',
});

/** Mensaje del chat de ejemplo para las pruebas. */
export const mensajePrueba = (rol: MensajeChat['rol'], contenido: string): MensajeChat => ({
  rol,
  contenido,
});

/** Objeto que acepta cualquier llamada de Leaflet y se devuelve a sí mismo. */
const leafletFalso: unknown = new Proxy(() => undefined, {
  get: (_objetivo, propiedad) => (propiedad === 'then' ? undefined : leafletFalso),
  apply: () => leafletFalso,
});

/** Instala un Leaflet simulado, porque en las pruebas no se carga el de la CDN. */
export const instalarLeafletFalso = (): void => {
  (globalThis as unknown as Record<string, unknown>)['L'] = leafletFalso;
};
