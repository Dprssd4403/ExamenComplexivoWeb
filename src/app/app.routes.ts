
import { Routes } from '@angular/router';



import { PublicoComponent } from './layouts/publico/publico.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { DesarrolladorComponent } from './pages/desarrollador/desarrollador.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { MaratonesComponent } from './pages/maratones/maratones.componet';
import { PrivadoComponent } from './layouts/privado/privado.component';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: PublicoComponent,
    children: [
      {
        path: '',
        component: InicioComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'desarrollador',
        component: DesarrolladorComponent
      }
    ]
  },

  {
    path: '',
    component: PrivadoComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'peliculas',
        component: PeliculasComponent
      },
      {
        path: 'maratones',
        component: MaratonesComponent
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }

];
