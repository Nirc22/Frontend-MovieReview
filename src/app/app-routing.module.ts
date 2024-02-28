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
// import { AuthGuard } from './helpers/auth.guard';



const routes: Routes = [
  {
    path:'', redirectTo:'/login', pathMatch:'full'
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
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'pelicula',
    component: PeliculaComponent
  },
  {
    path: 'crearPelicula',
    component: CrearPeliculaComponent
  },
  {
    path: 'actualizarImangen',
    component: ActualiarImagenComponent
  },
  {
    path: 'peliculaAdmin',
    component: PeliculaAdminComponent
  },
  {
    path: 'dashboardAdmin',
    component: DasboardAdminComponent
  },
  {
    path: 'actualizarPelicula',
    component: ActualizarPeliculaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
