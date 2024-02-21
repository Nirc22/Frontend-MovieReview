import { Component, OnInit } from '@angular/core';
// import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../interfaces/login-requets';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError:string="";
  loginForm: LoginRequest = {
    email:'',
    password:''
  };

  constructor(private formBuider:FormBuilder, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(form:NgForm){
    console.log('form value', form.value);

    this.loginService.login(this.loginForm)
      .subscribe(response => {
        this.router.navigateByUrl('/header');
    })

  }

}
