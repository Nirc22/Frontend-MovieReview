import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
