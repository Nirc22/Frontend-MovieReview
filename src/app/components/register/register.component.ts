import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: Usuario[] = [];

  formCrearUsuario: FormGroup = this.forBuilder.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  responseService:any;

  constructor(private forBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  // crearUsuario(){
  //   const usuario = this.formCrearUsuario.value
  //   this.usuarioService.crearUsuario(usuario)
  //   .subscribe((data:any) =>{
  //     this.usuario = data;
  //     console.log("Usuario registradoooooo");
  //     // this.router.navigate(['dashboard']);
  //   })
  // }

  get nombre(){
    return this.formCrearUsuario.get('nombre') as FormControl;
  }

  get apellidos(){
    return this.formCrearUsuario.get('apellidos') as FormControl;
  }

  get email(){
    return this.formCrearUsuario.get('email') as FormControl;
  }

  get password(){
    return this.formCrearUsuario.get('password') as FormControl;
  }

  async crearUsuario() {
    const response = await this.usuarioService.crearUsuario(this.formCrearUsuario.value);
    console.log("Respuestaaaaa",response.msg);
    this.responseService = response;
    if (response.ok === true) {
      this.router.navigate(['login']);
    }
  }

}
