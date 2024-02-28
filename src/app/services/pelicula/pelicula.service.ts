import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';
import { Director } from 'src/app/interfaces/director';
import { Actor } from 'src/app/interfaces/actor';
import { Genero } from 'src/app/interfaces/genero';


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

  // getPeliculaById(formValue:any){
  //   return firstValueFrom(this.http.get<any>(environment.urlApi+"pelicula/getById/", formValue))
  // }

  crearPelicula(pelicula:any){
    return this.http.post<any>(environment.urlApi+"pelicula/crearPelicula", pelicula)
  }

  actualizarImagen(form:any, _id:any){
    return this.http.post<any>(environment.urlApi+"pelicula/imagen/"+_id, form)
  }

  prueba(nombre:string, imagenPelicula:File){
    const form = new FormData()
    form.append('nombre', nombre);
    form.append('imagenPelicula', imagenPelicula, 'form-data');
    return this.http.post<Object>('environment.urlApi+"pelicula/crearPelicula', form)

  }

  crear(nombre:string, director:string, actores:string, anio:string, generos:string, imagenPelicula:File){
    console.log("holaaaaaaaaaaaaaa")
    const form = new FormData()
    form.append('nombre', nombre);
    form.append('director', director);
    form.append('actores', actores);
    form.append('anio', anio);
    form.append('generos', generos);
    form.append('imagenPelicula', imagenPelicula, 'form-data');
    console.log(form)
    return this.http.post<Object>('environment.urlApi+"pelicula/crearPelicula', form)
  }

  getDirectores(formValue:any):Observable<Director>{
    return this.http.get<Director>(environment.urlApi+"director/get")
  }

  getActores(formValue:any):Observable<Actor>{
    return this.http.get<Actor>(environment.urlApi+"actor/")
  }

  getGeneros(formValue:any):Observable<Genero>{
    return this.http.get<Genero>(environment.urlApi+"genero/get")
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
