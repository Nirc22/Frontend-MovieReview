import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { Axios } from 'axios';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { CrearPeliculaComponent } from './components/crear-pelicula/crear-pelicula.component';
import { ActualiarImagenComponent } from './components/actualiar-imagen/actualiar-imagen.component';
import { PeliculaAdminComponent } from './components/pelicula-admin/pelicula-admin.component';
import { DasboardAdminComponent } from './components/dasboard-admin/dasboard-admin.component';
import { ActualizarPeliculaComponent } from './components/actualizar-pelicula/actualizar-pelicula.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { CalificarComponent } from './components/calificar/calificar.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    DashboardComponent,
    PeliculaComponent,
    CrearPeliculaComponent,
    ActualiarImagenComponent,
    PeliculaAdminComponent,
    DasboardAdminComponent,
    ActualizarPeliculaComponent,
    CalificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
