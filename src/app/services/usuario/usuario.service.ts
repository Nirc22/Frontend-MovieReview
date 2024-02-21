import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/usuario';
import { LoginRequest } from 'src/app/interfaces/login-requets';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  login(usuario:LoginRequest){
    return firstValueFrom(this.http.post<LoginRequest>(environment.urlApi+"usuario/login", usuario))
  }

  crearUsuario(usuario:Usuario){
    return firstValueFrom( this.http.post<Usuario>(environment.urlApi+"usuario/create", usuario))
  }
}
