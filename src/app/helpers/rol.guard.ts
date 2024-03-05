import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  decodedToken: any;


  constructor(private loginService: LoginService, private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.loginService.getToken()
      console.log(token)
      this.decodedToken = jwtDecode(token!)
      if (this.decodedToken.rol === "Admin") {
        return true;
      }
      this.router.navigate(['dashboard'])
      return false;
  }

}
