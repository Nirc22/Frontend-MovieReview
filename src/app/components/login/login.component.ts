import { Component, OnInit } from '@angular/core';
// import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { LoginRequest } from '../../interfaces/login-requets';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage:any;

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

  // login(form:NgForm){
  //   console.log('form value', form.value);

  //   this.loginService.login(this.loginForm)
  //     .subscribe(response => {
  //       this.router.navigateByUrl('/header');
  //   })

  // }

  async login(){
    const response = await this.usuarioService.login(this.formLoginUsuario.value);
    console.log("Respuesta",response);
    this.responseService = response;
    if(!response.error){
      localStorage.setItem('token', response.token);
    }
    // alert(response.error)
  }

}
