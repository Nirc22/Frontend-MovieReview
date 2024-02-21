import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/usuario';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  crearUsuario(usuario:Usuario){
    return this.http.post<Usuario>(environment.urlApi+"usuario/create", usuario)
  }
}
