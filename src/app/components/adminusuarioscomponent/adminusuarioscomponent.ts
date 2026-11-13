import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Conjunto } from '../../models/conjuntomodel';
import {
  FILTROS_USUARIOS,
  FiltroUsuarios,
  Usuario,
  opcionesCambioEstado,
} from '../../models/usuariomodel';
import { Confirmacionservice } from '../../services/confirmacionservice';
import { Conjuntoservice } from '../../services/conjuntoservice';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';
import { Usuarioservice } from '../../services/usuarioservice';

@Component({
  selector: 'app-adminusuarioscomponent',
  standalone: false,
  styleUrl: './adminusuarioscomponent.css',
  templateUrl: './adminusuarioscomponent.html',
})
export class Adminusuarioscomponent implements OnInit {
  readonly FILTROS = FILTROS_USUARIOS;

  usuarios = signal<Usuario[]>([]);
  conjuntos = signal<Conjunto[]>([]);
  filtro: FiltroUsuarios = 'TODOS';
  busqueda = '';
  cargando = signal(true);
  error = signal('');
  usuarioAsignando = signal<Usuario | null>(null);

  constructor(
    private usuarioService: Usuarioservice,
    private conjuntoService: Conjuntoservice,
    private confirmacionService: Confirmacionservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.conjuntoService.obtenerTodos().subscribe({
      next: (conjuntos) => this.conjuntos.set(conjuntos),
      error: () => this.conjuntos.set([]),
    });
  }

  get sinUsuarios(): boolean {
    return !this.cargando() && this.error() === '' && this.usuarios().length === 0;
  }

  get hayUsuarios(): boolean {
    return !this.cargando() && this.usuarios().length > 0;
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.usuarioService.obtenerTodos(this.filtro, this.busqueda.trim()).subscribe({
      next: (usuarios) => {
        this.usuarios.set(usuarios);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No pudimos cargar los usuarios.'));
      },
    });
  }

  elegirFiltro(filtro: FiltroUsuarios): void {
    this.filtro = filtro;
    this.cargar();
  }

  alAsignar(): void {
    this.usuarioAsignando.set(null);
    this.cargar();
  }

  async cambiarEstado(usuario: Usuario): Promise<void> {
    const confirmado = await this.confirmacionService.confirmar(opcionesCambioEstado(usuario));
    if (confirmado) {
      this.enviar(
        this.usuarioService.cambiarEstado(usuario.id, !usuario.activo),
        'Estado actualizado.',
      );
    }
  }

  async eliminar(usuario: Usuario): Promise<void> {
    const confirmado = await this.confirmacionService.confirmar({
      titulo: `¿Eliminar a ${usuario.nombre} ${usuario.apellido}?`,
      texto: 'Se borrará su cuenta y sus reservas pendientes. Esta acción no se puede deshacer.',
      textoConfirmar: 'Sí, eliminar',
      peligro: true,
    });
    if (confirmado) {
      this.enviar(this.usuarioService.eliminar(usuario.id), 'Usuario eliminado.');
    }
  }

  private enviar(peticion: Observable<string>, porDefecto: string): void {
    peticion.subscribe({
      next: (mensaje) => {
        this.toastService.mostrar(mensaje || porDefecto);
        this.cargar();
      },
      error: (error: unknown) =>
        this.toastService.mostrar(this.errorService.obtenerMensaje(error), 'error'),
    });
  }
}
