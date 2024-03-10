import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
// import { MatToolbarModule } from '@angular/material/toolbar'
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { jwtDecode } from "jwt-decode";
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  formDirector: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
  })

  decodedToken:any;
  rol: any;
  token:any;

  constructor(private peliculaService: PeliculaService, private formBuilder:FormBuilder, private dialogService: DialogService, private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loginService.getTokenObservable().subscribe(() =>{
      this.validar();
    })
  }

  validar(){
    this.token = this.loginService.getToken();
    if(this.token){
      this.decodedToken = jwtDecode(this.token!)
      if(this.decodedToken.rol === 'Admin'){
        this.rol = true;
      }else{
        this.rol = false;
        console.log(this.rol)
      }
    }else{
      this.rol = false;
      console.log('No existe token')
    }

  }

  openDialog  (template: TemplateRef<any>) {
    // localStorage.setItem("_id", pelicula._id.toString());

    this.dialogService.openDialogWithTemplate({
      template
    }).afterClosed().subscribe(res => console.log('Dialog with template Close ', res))
    this.formDirector.reset();


  }

  crearDirector() {
    console.log(this.formDirector.value)
    this.peliculaService.crearDirector(this.formDirector.value)
    .subscribe((data:any) =>{
      console.log("Director creado", data);
    })
    this.formDirector.reset();
  }

  crearActor() {
    console.log(this.formDirector.value)
    this.peliculaService.crearActor(this.formDirector.value)
    .subscribe((data:any) =>{
      console.log("Actor creado", data);
    })
    this.formDirector.reset();
  }

  logOut(){
    this.loginService.deleteToken();
    this.router.navigate(['dashboar']);
  }


}
