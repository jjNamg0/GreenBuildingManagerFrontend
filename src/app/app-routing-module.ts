import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Mapacomponent } from './components/mapacomponent/mapacomponent';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Registrocomponent } from './components/registrocomponent/registrocomponent';
import { Verificarcodigocomponent } from './components/verificarcodigocomponent/verificarcodigocomponent';
import { Olvidecontrasenacomponent } from './components/olvidecontrasenacomponent/olvidecontrasenacomponent';
import { Terminoscomponent } from './components/terminoscomponent/terminoscomponent';
import { Privacidadcomponent } from './components/privacidadcomponent/privacidadcomponent';
import { Miconjuntocomponent } from './components/miconjuntocomponent/miconjuntocomponent';
import { Reservarespaciocomponent } from './components/reservarespaciocomponent/reservarespaciocomponent';
import { Misreservascomponent } from './components/misreservascomponent/misreservascomponent';
import { Eventoscomponent } from './components/eventoscomponent/eventoscomponent';
import { Paraticomponent } from './components/paraticomponent/paraticomponent';
import { Perfilcomponent } from './components/perfilcomponent/perfilcomponent';
import { Admininiciocomponent } from './components/admininiciocomponent/admininiciocomponent';
import { Adminconjuntoscomponent } from './components/adminconjuntoscomponent/adminconjuntoscomponent';
import { Adminconjuntodetallecomponent } from './components/adminconjuntodetallecomponent/adminconjuntodetallecomponent';
import { Adminusuarioscomponent } from './components/adminusuarioscomponent/adminusuarioscomponent';
import { Admineventoscomponent } from './components/admineventoscomponent/admineventoscomponent';
import { Adminreservascomponent } from './components/adminreservascomponent/adminreservascomponent';
import { Adminauditoriacomponent } from './components/adminauditoriacomponent/adminauditoriacomponent';
import { Notfoundcomponent } from './components/notfoundcomponent/notfoundcomponent';
import { authguard } from './guards/authguard';
import { residenteguard } from './guards/residenteguard';
import { adminguard } from './guards/adminguard';
import { invitadoguard } from './guards/invitadoguard';

const routes: Routes = [
  {
    path: '',
    component: Homecomponent,
    title: 'Green Building — Inicio',
  },
  {
    path: 'mapa',
    component: Mapacomponent,
    title: 'Green Building — Mapa de conjuntos',
  },
  {
    path: 'login',
    component: Logincomponent,
    canActivate: [invitadoguard],
    title: 'Green Building — Iniciar sesión',
  },
  {
    path: 'registro',
    component: Registrocomponent,
    canActivate: [invitadoguard],
    title: 'Green Building — Crear cuenta',
  },
  {
    path: 'verificar',
    component: Verificarcodigocomponent,
    title: 'Green Building — Verificar correo',
  },
  {
    path: 'olvide-contrasena',
    component: Olvidecontrasenacomponent,
    title: 'Green Building — Restablecer contraseña',
  },
  {
    path: 'terminos',
    component: Terminoscomponent,
    title: 'Green Building — Términos de uso',
  },
  {
    path: 'privacidad',
    component: Privacidadcomponent,
    title: 'Green Building — Política de privacidad',
  },
  {
    path: 'mi-conjunto',
    component: Miconjuntocomponent,
    canActivate: [residenteguard],
    title: 'Green Building — Mi conjunto',
  },
  {
    path: 'reservar/:espacioId',
    component: Reservarespaciocomponent,
    canActivate: [residenteguard],
    title: 'Green Building — Reservar espacio',
  },
  {
    path: 'mis-reservas',
    component: Misreservascomponent,
    canActivate: [residenteguard],
    title: 'Green Building — Mis reservas',
  },
  {
    path: 'eventos',
    component: Eventoscomponent,
    canActivate: [residenteguard],
    title: 'Green Building — Eventos',
  },
  {
    path: 'para-ti',
    component: Paraticomponent,
    canActivate: [residenteguard],
    title: 'Green Building — Para ti',
  },
  {
    path: 'perfil',
    component: Perfilcomponent,
    canActivate: [authguard],
    title: 'Green Building — Mi perfil',
  },
  {
    path: 'admin',
    component: Admininiciocomponent,
    canActivate: [adminguard],
    title: 'Green Building — Panel de administración',
  },
  {
    path: 'admin/conjuntos',
    component: Adminconjuntoscomponent,
    canActivate: [adminguard],
    title: 'Green Building — Conjuntos',
  },
  {
    path: 'admin/conjuntos/:id',
    component: Adminconjuntodetallecomponent,
    canActivate: [adminguard],
    title: 'Green Building — Detalle del conjunto',
  },
  {
    path: 'admin/usuarios',
    component: Adminusuarioscomponent,
    canActivate: [adminguard],
    title: 'Green Building — Usuarios',
  },
  {
    path: 'admin/eventos',
    component: Admineventoscomponent,
    canActivate: [adminguard],
    title: 'Green Building — Eventos',
  },
  {
    path: 'admin/reservas',
    component: Adminreservascomponent,
    canActivate: [adminguard],
    title: 'Green Building — Reservas',
  },
  {
    path: 'admin/auditoria',
    component: Adminauditoriacomponent,
    canActivate: [adminguard],
    title: 'Green Building — Auditoría',
  },
  {
    path: '**',
    component: Notfoundcomponent,
    title: 'Green Building — Página no encontrada',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 84],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
