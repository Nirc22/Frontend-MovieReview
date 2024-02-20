import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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
