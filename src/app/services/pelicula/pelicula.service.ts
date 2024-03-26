import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';
import { Director } from 'src/app/interfaces/director';
import { Actor } from 'src/app/interfaces/actor';
import { Genero } from 'src/app/interfaces/genero';
import { MovieReview } from 'src/app/interfaces/movie-review';
import { UsuarioReview } from 'src/app/interfaces/usuario-review';


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

  getPeliculalByNombre(nombre:any):Observable<any> {
    console.log("Llegaaaa",nombre)
    // const body = { nombre: nombre }
    return this.http.get<any>(environment.urlApi+"pelicula/getByNombre/"+nombre);
  }

  // getPeliculaById(formValue:any){
  //   return firstValueFrom(this.http.get<any>(environment.urlApi+"pelicula/getById/", formValue))
  // }

  crearPelicula(pelicula:any){
    return this.http.post<any>(environment.urlApi+"pelicula/crearPelicula", pelicula)
  }

  actualizarImagen(form:any, _id:any){
    return this.http.put<any>(environment.urlApi+"pelicula/imagen/"+_id, form)
  }

  actualizarPelicula(form:any, _id:any){
    return this.http.put<any>(environment.urlApi+"pelicula/update/"+_id, form)
  }

  getDirectores(formValue:any):Observable<Director>{
    return this.http.get<Director>(environment.urlApi+"director/get")
  }

  crearDirector(director:any){
    return this.http.post<any>(environment.urlApi+"director/create", director)

  }

  getActores(formValue:any):Observable<Actor>{
    return this.http.get<Actor>(environment.urlApi+"actor/")
  }

  crearActor(director:any){
    return this.http.post<any>(environment.urlApi+"actor/create", director)

  }

  getGeneros(formValue:any):Observable<Genero>{
    return this.http.get<Genero>(environment.urlApi+"genero/get")
  }

  crearGenero(genero:any){
    return this.http.post<any>(environment.urlApi+"genero/create", genero)

  }

  calificar(calificacion:any){
    return this.http.post<any>(environment.urlApi+"usuarioReview/create", calificacion)
  }

  // getReviewById(_id:any):Observable<any>{
  //   return this.http.get<any>(environment.urlApi+"usuarioReview/getReviewById/"+_id)
  // }

  getReviewById(_id:any):Observable<UsuarioReview>{
    return this.http.get<UsuarioReview>(environment.urlApi+"usuarioReview/getReviewById/"+_id)//terminar de hacer
  }

  actualizarCalificacion( _id:any, calificacion:any){
    return this.http.put<any>(environment.urlApi+"usuarioReview/updateReviewUsuario/"+_id, calificacion)

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
