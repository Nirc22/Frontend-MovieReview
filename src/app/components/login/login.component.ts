import { Component, OnInit } from '@angular/core';
// import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { LoginRequest } from '../../interfaces/login-requets';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage:any;

  decodedToken:any;
  token:any;

  formLoginUsuario: FormGroup = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  responseService:any;
  loginForm: LoginRequest = {
    email:'',
    password:''
  };

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }


  async login(){
    const response = await this.usuarioService.login(this.formLoginUsuario.value);
    console.log("Respuesta",response);
    this.responseService = response;
    if(!response.error){
      this.loginService.setToken(response.token)
      // localStorage.setItem('token', response.token);
      // localStorage.setItem('rol', response.rol)

      const token = localStorage.getItem('token');

      // const token = this.loginService.getTokenObservable

      console.log("Holaaaaa",token)

      this.decodedToken = jwtDecode(token!)
      console.log(this.decodedToken.rol)
      if(this.decodedToken.rol === 'Admin'){
        this.router.navigate(['dashboardAdmin']);
      }else{
        this.router.navigate(['dashboard']);
      }



    }
    // alert(response.error)
  }

}
