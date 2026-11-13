import { Component, OnInit, signal } from '@angular/core';
import { claseSpinner } from '../../models/opcionmodel';
import {
  DatosPerfil,
  REGLAS_PERFIL,
  Usuario,
  esAdministrador,
  inicialesUsuario,
  insigniaRol,
} from '../../models/usuariomodel';
import { primerError } from '../../models/validacionmodel';
import { Authservice } from '../../services/authservice';
import { Errorservice } from '../../services/errorservice';
import { Toastservice } from '../../services/toastservice';
import { Usuarioservice } from '../../services/usuarioservice';

/** Pantalla del perfil: datos personales y cambio de contraseña. */
@Component({
  selector: 'app-perfilcomponent',
  standalone: false,
  styleUrl: './perfilcomponent.css',
  templateUrl: './perfilcomponent.html',
})
export class Perfilcomponent implements OnInit {
  readonly inicialesUsuario = inicialesUsuario;
  readonly insigniaRol = insigniaRol;
  readonly esAdministrador = esAdministrador;
  readonly claseSpinner = claseSpinner;

  usuario = signal<Usuario | null>(null);
  datos: DatosPerfil = { nombre: '', apellido: '', telefono: '' };
  cargando = signal(true);
  errorCarga = signal('');
  errorPerfil = signal('');
  guardandoPerfil = signal(false);

  constructor(
    private authService: Authservice,
    private usuarioService: Usuarioservice,
    private errorService: Errorservice,
    private toastService: Toastservice,
  ) {}

  /** Carga el perfil. */
  ngOnInit(): void {
    this.cargar();
  }

  /** Pide al back el usuario y llena el formulario. */
  cargar(): void {
    this.cargando.set(true);
    this.errorCarga.set('');
    this.authService.cargarUsuario().subscribe({
      next: (usuario) => {
        this.usuario.set(usuario);
        this.datos = {
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          telefono: usuario.telefono,
        };
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.errorCarga.set(
          this.errorService.obtenerMensaje(error, 'No pudimos cargar tu perfil.'),
        );
      },
    });
  }

  /** Valida y guarda los datos del perfil. */
  guardarPerfil(): void {
    const problema = primerError(REGLAS_PERFIL, this.datos);
    this.errorPerfil.set(problema);
    if (problema) {
      return;
    }
    this.guardandoPerfil.set(true);
    this.usuarioService
      .actualizarMiPerfil({
        nombre: this.datos.nombre.trim(),
        apellido: this.datos.apellido.trim(),
        telefono: this.datos.telefono.trim(),
      })
      .subscribe({
        next: (mensaje) => {
          this.guardandoPerfil.set(false);
          this.toastService.mostrar(mensaje || 'Tus datos quedaron actualizados.');
          this.cargar();
        },
        error: (error: unknown) => {
          this.guardandoPerfil.set(false);
          this.errorPerfil.set(
            this.errorService.obtenerMensaje(error, 'No pudimos guardar tus datos.'),
          );
        },
      });
  }
}
