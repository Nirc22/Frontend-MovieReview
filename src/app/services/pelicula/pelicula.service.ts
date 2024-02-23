import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(private http: HttpClient) { }

  getPeliculas(pacientes:String):Observable<Pelicula>{
    return this.http.get<Pelicula>(environment.urlApi+'pelicula/').pipe(
      catchError(this.handleError)
    )
  }

  getPeliculaId(_id:any):Observable<Pelicula>{
    return this.http.get<Pelicula>(environment.urlApi+"pelicula/getById/"+_id)//terminar de hacer
  }

  getPeliculaById(formValue:any){
    return firstValueFrom(this.http.get<any>(environment.urlApi+"pelicula/getById/", formValue))
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error ', error.error);
    }
    else{
      console.error('El backend retornó el código de estado ', error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente'));
  }
}
