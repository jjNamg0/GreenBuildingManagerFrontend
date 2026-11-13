import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/homecomponent/homecomponent').then((modulo) => modulo.Homecomponent),
    title: 'Green Building — Inicio',
  },
];
