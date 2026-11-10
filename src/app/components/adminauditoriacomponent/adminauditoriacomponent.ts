import { Component, OnInit } from '@angular/core';
import { Adminservice } from '../../services/adminservice';
import { Auditoria, FiltrosAuditoria } from '../../models/auditoriamodel';

@Component({
  selector: 'app-adminauditoriacomponent',
  standalone: false,
  templateUrl: './adminauditoriacomponent.html',
  styleUrl: './adminauditoriacomponent.css',
})
export class Adminauditoriacomponent implements OnInit {
  readonly TAMANO_PAGINA = 20;

  registros: Auditoria[] = [];
  acciones: string[] = [];
  filtros: FiltrosAuditoria = { accion: '', email: '', exitoso: '', desde: '', hasta: '' };
  pagina = 0;
  totalPaginas = 0;
  totalElementos = 0;
  cargando = true;
  error = '';

  constructor(private adminService: Adminservice) {}

  ngOnInit(): void {
    this.adminService
      .obtenerAccionesAuditoria()
      .subscribe((resultado) => (this.acciones = resultado.exito ? resultado.datos : []));
    this.cargar(0);
  }

  cargar(pagina: number): void {
    if (this.filtros.desde && this.filtros.hasta && this.filtros.desde > this.filtros.hasta) {
      this.error = 'La fecha "desde" debe ser antes de la fecha "hasta".';
      return;
    }
    this.cargando = true;
    this.error = '';
    this.adminService.obtenerAuditoria(pagina, this.TAMANO_PAGINA, this.filtros).subscribe((resultado) => {
      this.cargando = false;
      if (!resultado.exito) {
        this.error = resultado.mensaje;
        return;
      }
      this.registros = resultado.datos.contenido;
      this.pagina = resultado.datos.paginaActual;
      this.totalPaginas = resultado.datos.totalPaginas;
      this.totalElementos = resultado.datos.totalElementos;
    });
  }

  buscar(): void {
    this.cargar(0);
  }

  limpiar(): void {
    this.filtros = { accion: '', email: '', exitoso: '', desde: '', hasta: '' };
    this.cargar(0);
  }

  get paginas(): number[] {
    const desde = Math.max(0, this.pagina - 2);
    const hasta = Math.min(this.totalPaginas - 1, this.pagina + 2);
    return Array.from({ length: hasta - desde + 1 }, (_, i) => desde + i);
  }

  iconoAccion(accion: string): string {
    if (accion.includes('LOGIN') || accion === 'LOGOUT') {
      return 'bi-box-arrow-in-right';
    }
    if (accion.includes('INVITACION')) {
      return 'bi-envelope-paper-heart';
    }
    if (accion.includes('EVENTO')) {
      return 'bi-calendar-event';
    }
    if (accion.includes('RESERVA')) {
      return 'bi-calendar-check';
    }
    if (accion.includes('SOLICITUD_CONJUNTO')) {
      return 'bi-door-open';
    }
    if (accion.includes('ADMIN')) {
      return 'bi-person-badge';
    }
    if (accion.includes('USUARIO') || accion === 'ASIGNAR_UNIDAD' || accion === 'REGISTRO') {
      return 'bi-person';
    }
    if (accion.includes('CODIGO') || accion.includes('VERIFICACION') || accion.includes('CONTRASENA') || accion.includes('RESTABLECER')) {
      return 'bi-key';
    }
    if (accion.includes('CONJUNTO') || accion.includes('UNIDAD') || accion.includes('ESPACIO')) {
      return 'bi-buildings';
    }
    return 'bi-journal-text';
  }

  etiquetaAccion(accion: string): string {
    const etiquetas: Record<string, string> = {
      LOGIN: 'Inicio de sesión',
      LOGIN_CODIGO: 'Código de ingreso',
      LOGOUT: 'Cierre de sesión',
      REGISTRO: 'Registro',
      VERIFICACION_CUENTA: 'Verificación de cuenta',
      REENVIO_CODIGO: 'Reenvío de código',
      SOLICITUD_RESTABLECER: 'Solicitud de contraseña',
      RESTABLECER_CONTRASENA: 'Cambio de contraseña',
      SOLICITUD_ADMIN: 'Solicitud de administrador',
      APROBAR_ADMIN: 'Aprobar administrador',
      RECHAZAR_ADMIN: 'Rechazar administrador',
      CAMBIAR_ESTADO_USUARIO: 'Cambiar estado de usuario',
      VER_AUDITORIA: 'Consultar auditoría',
      CREAR_RESERVA: 'Crear reserva',
      CANCELAR_RESERVA: 'Cancelar reserva',
      APROBAR_RESERVA: 'Aprobar reserva',
      RECHAZAR_RESERVA: 'Rechazar reserva',
      ASIGNAR_UNIDAD: 'Asignar unidad',
      SOLICITUD_CONJUNTO: 'Solicitud de conjunto',
      ACEPTAR_SOLICITUD_CONJUNTO: 'Aceptar solicitud de conjunto',
      RECHAZAR_SOLICITUD_CONJUNTO: 'Rechazar solicitud de conjunto',
      CREAR_EVENTO: 'Crear evento',
      EDITAR_EVENTO: 'Editar evento',
      CANCELAR_EVENTO: 'Cancelar evento',
      ENVIAR_INVITACION: 'Enviar invitación',
      LOGIN_GOOGLE: 'Ingreso con Google',
    };
    if (etiquetas[accion]) {
      return etiquetas[accion];
    }
    const texto = accion.replace(/_/g, ' ').toLowerCase();
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
