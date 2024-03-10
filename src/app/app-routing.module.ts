import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DasboardAdminComponent } from './components/dasboard-admin/dasboard-admin.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { CrearPeliculaComponent } from './components/crear-pelicula/crear-pelicula.component';
import { ActualiarImagenComponent } from './components/actualiar-imagen/actualiar-imagen.component';
import { PeliculaAdminComponent } from './components/pelicula-admin/pelicula-admin.component';
import { ActualizarPeliculaComponent } from './components/actualizar-pelicula/actualizar-pelicula.component';
import { AuthGuard } from './helpers/auth.guard';
import { RolGuard } from './helpers/rol.guard';
import { CalificarComponent } from './components/calificar/calificar.component';
import { ReviewsUsuarioComponent } from './components/reviews-usuario/reviews-usuario.component';



const routes: Routes = [
  {
    path:'', redirectTo:'/dashboard', pathMatch:'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'pelicula',
    component: PeliculaComponent,
  },
  {
    path: 'calificacion',
    component: CalificarComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'reviewsUsuario',
    component: ReviewsUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crearPelicula',
    component: CrearPeliculaComponent,
    canActivate: [AuthGuard, RolGuard],
    // canLoad: [AuthGuard]

  },
  {
    path: 'actualizarImangen',
    component: ActualiarImagenComponent,
    canActivate: [AuthGuard, RolGuard]

  },
  {
    path: 'peliculaAdmin',
    component: PeliculaAdminComponent,
    canActivate: [AuthGuard, RolGuard]

  },
  {
    path: 'dashboardAdmin',
    component: DasboardAdminComponent,
    canActivate: [AuthGuard, RolGuard]
  },
  {
    path: 'actualizarPelicula',
    component: ActualizarPeliculaComponent,
    canActivate: [AuthGuard, RolGuard]

  },
  {
    path: '**',
    component: DashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
