import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/usuario';
import { LoginRequest } from 'src/app/interfaces/login-requets';
import { environment } from 'src/environments/environment';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieReview } from 'src/app/interfaces/movie-review';
import { UsuarioReview } from 'src/app/interfaces/usuario-review';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  login(formValue:any){
    return firstValueFrom(this.http.post<any>(environment.urlApi+"usuario/login", formValue))
  }

  crearUsuario(formValue:any){
    return firstValueFrom( this.http.post<any>(environment.urlApi+"usuario/create", formValue))
  }

  getReviews(usuario:any):Observable<UsuarioReview>{
    return this.http.get<UsuarioReview>(environment.urlApi+"usuarioReview/getReviewsUsuario/"+usuario)

  }

  // errorHandler(error: HttpErrorResponse){
  //   return throwError(error.message)

  // }
}
