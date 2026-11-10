import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Mapacomponent } from './components/mapacomponent/mapacomponent';
import { Registrocomponent } from './components/registrocomponent/registrocomponent';
import { Verificarcodigocomponent } from './components/verificarcodigocomponent/verificarcodigocomponent';
import { Olvidecontrasenacomponent } from './components/olvidecontrasenacomponent/olvidecontrasenacomponent';
import { Solicitaradmincomponent } from './components/solicitaradmincomponent/solicitaradmincomponent';
import { Aprobaradmincomponent } from './components/aprobaradmincomponent/aprobaradmincomponent';
import { Googlecallbackcomponent } from './components/googlecallbackcomponent/googlecallbackcomponent';
import { Terminoscomponent } from './components/terminoscomponent/terminoscomponent';
import { Privacidadcomponent } from './components/privacidadcomponent/privacidadcomponent';
import { Miconjuntocomponent } from './components/miconjuntocomponent/miconjuntocomponent';
import { Reservarespaciocomponent } from './components/reservarespaciocomponent/reservarespaciocomponent';
import { Misreservascomponent } from './components/misreservascomponent/misreservascomponent';
import { Eventoscomponent } from './components/eventoscomponent/eventoscomponent';
import { Paraticomponent } from './components/paraticomponent/paraticomponent';
import { Admineventoscomponent } from './components/admineventoscomponent/admineventoscomponent';
import { Adminreservascomponent } from './components/adminreservascomponent/adminreservascomponent';
import { Adminconjuntoscomponent } from './components/adminconjuntoscomponent/adminconjuntoscomponent';
import { Conjuntoformcomponent } from './components/conjuntoformcomponent/conjuntoformcomponent';
import { Conjuntodetallecomponent } from './components/conjuntodetallecomponent/conjuntodetallecomponent';
import { Adminusuarioscomponent } from './components/adminusuarioscomponent/adminusuarioscomponent';
import { Adminauditoriacomponent } from './components/adminauditoriacomponent/adminauditoriacomponent';
import { Noencontradocomponent } from './components/noencontradocomponent/noencontradocomponent';
import { authguard } from './guards/authguard';
import { adminguard } from './guards/adminguard';
import { conjuntoguard } from './guards/conjuntoguard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Logincomponent,
    title: 'Green Building Manager — Iniciar sesión',
  },
  {
    path: 'ubicacion/:token',
    component: Mapacomponent,
    title: 'Green Building Manager — Ubicación del evento',
  },
  {
    path: 'registro',
    component: Registrocomponent,
    title: 'Green Building Manager — Crear cuenta',
  },
  {
    path: 'verificar',
    component: Verificarcodigocomponent,
    title: 'Green Building Manager — Verificar código',
  },
  {
    path: 'olvide-contrasena',
    component: Olvidecontrasenacomponent,
    title: 'Green Building Manager — Recuperar contraseña',
  },
  {
    path: 'solicitar-admin',
    component: Solicitaradmincomponent,
    title: 'Green Building Manager — Solicitar cuenta de administrador',
  },
  {
    path: 'aprobar-admin',
    component: Aprobaradmincomponent,
    title: 'Green Building Manager — Aprobar administrador',
  },
  {
    path: 'oauth2/callback',
    component: Googlecallbackcomponent,
    title: 'Green Building Manager — Ingreso con Google',
  },
  {
    path: 'terminos',
    component: Terminoscomponent,
    title: 'Green Building Manager — Términos de uso',
  },
  {
    path: 'privacidad',
    component: Privacidadcomponent,
    title: 'Green Building Manager — Política de privacidad',
  },
  {
    path: 'mi-conjunto',
    component: Miconjuntocomponent,
    canActivate: [authguard],
    title: 'Green Building Manager — Mi conjunto',
  },
  {
    path: 'reservar/:espacioId',
    component: Reservarespaciocomponent,
    canActivate: [authguard, conjuntoguard],
    title: 'Green Building Manager — Reservar espacio',
  },
  {
    path: 'mis-reservas',
    component: Misreservascomponent,
    canActivate: [authguard, conjuntoguard],
    title: 'Green Building Manager — Mis reservas',
  },
  {
    path: 'eventos',
    component: Eventoscomponent,
    canActivate: [authguard, conjuntoguard],
    title: 'Green Building Manager — Eventos del conjunto',
  },
  {
    path: 'para-ti',
    component: Paraticomponent,
    canActivate: [authguard, conjuntoguard],
    title: 'Green Building Manager — Para ti',
  },
  {
    path: 'admin/mapa',
    component: Mapacomponent,
    canActivate: [adminguard],
    title: 'Green Building Manager — Mapa de conjuntos',
  },
  {
    path: 'admin/eventos',
    component: Admineventoscomponent,
    canActivate: [adminguard],
    title: 'Green Building Manager — Administrar eventos',
  },
  {
    path: 'admin/reservas',
    component: Adminreservascomponent,
    canActivate: [adminguard],
    title: 'Green Building Manager — Administrar reservas',
  },
  {
    path: 'admin/conjuntos',
    component: Adminconjuntoscomponent,
    canActivate: [adminguard],
    title: 'Green Building Manager — Conjuntos',
  },
  {
    path: 'admin/conjuntos/nuevo',
    component: Conjuntoformcomponent,
    canActivate: [adminguard],
    title: 'Green Building Manager — Nuevo conjunto',
  },
  {
    path: 'admin/conjuntos/:id/editar',
    component: Conjuntoformcomponent,
    canActivate: [adminguard],
    title: 'Green Building Manager — Editar conjunto',
  },
  {
    path: 'admin/conjuntos/:id',
    component: Conjuntodetallecomponent,
    canActivate: [adminguard],
    title: 'Green Building Manager — Detalle del conjunto',
  },
  {
    path: 'admin/usuarios',
    component: Adminusuarioscomponent,
    canActivate: [adminguard],
    title: 'Green Building Manager — Usuarios',
  },
  {
    path: 'admin/auditoria',
    component: Adminauditoriacomponent,
    canActivate: [adminguard],
    title: 'Green Building Manager — Auditoría',
  },
  {
    path: '**',
    component: Noencontradocomponent,
    title: 'Green Building Manager — Página no encontrada',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
