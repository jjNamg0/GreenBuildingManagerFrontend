import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Terminoscomponent } from './components/terminoscomponent/terminoscomponent';
import { Privacidadcomponent } from './components/privacidadcomponent/privacidadcomponent';
import { Noencontradocomponent } from './components/noencontradocomponent/noencontradocomponent';

const routes: Routes = [
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
