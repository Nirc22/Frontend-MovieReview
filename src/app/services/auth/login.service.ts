import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { LoginRequest } from 'src/app/interfaces/login-requets';
import { Observable, catchError, throwError, BehaviorSubject, tap, map, observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));

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

      // localStorage.setItem('token', token);
      this.setToken(token);

      return body;

    }))
  }

  getToken(){
    return this.tokenSubject.value;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  deleteToken(){
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  getTokenObservable() {
    return this.tokenSubject.asObservable();
  }

  decodeToken (token:string){
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayLoad = decodeURIComponent(atob(base64).split('').map((c)=>{
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''));
    return JSON.parse(jsonPayLoad);
  }

}
