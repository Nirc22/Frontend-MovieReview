import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { LoginRequest } from 'src/app/interfaces/login-requets';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
    this.currentUserLoginOn= new BehaviorSubject<boolean>(sessionStorage.getItem("token")!= null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "")
  }


  login(creds: LoginRequest){
    return this.http.post(environment.urlApi+"usuario/login", creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) =>{
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer', '');

      localStorage.setItem('token', token);
      return body;

    }))
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
