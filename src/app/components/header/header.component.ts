import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
// import { MatToolbarModule } from '@angular/material/toolbar'
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { jwtDecode } from "jwt-decode";
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GeneroComponent } from '../genero/genero.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  formReparto: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
  })

  decodedToken: any;
  rol: any;
  token: any;

  constructor(private peliculaService: PeliculaService, private formBuilder: FormBuilder, private dialogService: DialogService, private loginService: LoginService, private router: Router, private usuarioService: UsuarioService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loginService.getTokenObservable().subscribe(() => {
      this.validar();
      this.ValidarToken();

    })
  }

  get nombre() {
    return this.formReparto.get('nombre') as FormControl;
  }

  get apellido() {
    return this.formReparto.get('apellido') as FormControl;
  }

  validar() {
    this.token = this.loginService.getToken();
    if (this.token) {
      this.decodedToken = jwtDecode(this.token!)
      if (this.decodedToken.rol === 'Admin') {
        this.rol = true;
      } else {
        this.rol = false;
        console.log(this.rol)
      }
    } else {
      this.rol = false;
      console.log('No existe token')
    }

  }

  openDialog(template: TemplateRef<any>) {
    // localStorage.setItem("_id", pelicula._id.toString());

    this.dialogService.openDialogWithTemplate({
      template
    }).afterClosed().subscribe(res => console.log('Dialog with template Close ', res))
    this.formReparto.reset();


  }

  crearDirector() {
    console.log(this.formReparto.value)
    this.peliculaService.crearDirector(this.formReparto.value).subscribe((response) => {
      console.log("Director creado", response);
      alert(response.msg);
      location.reload();
      this.formReparto.reset();
    },
      (error) => {
        console.error('Error al crear Director:', error.error.msg);
        alert(error.error.msg)
        this.formReparto.reset();
      }
    )
  }

  crearActor() {
    console.log(this.formReparto.value)
    this.peliculaService.crearActor(this.formReparto.value).subscribe((response) => {
      console.log("Actor creado", response);
      alert(response.msg);
      location.reload();
      this.formReparto.reset();
    },
      (error) => {
        console.error('Error al crear Actor:', error.error.msg);
        alert(error.error.msg)
        this.formReparto.reset();
      }
    )
  }

  crearGenero(){
    const dialogRef = this.matDialog.open(GeneroComponent);
  }

  logOut() {
    this.loginService.deleteToken();
    this.router.navigate(['dashboar']);
  }

  ValidarToken(){
    this.token = this.loginService.getToken();
    if (this.token) {
      this.usuarioService.validarToken(this.token)
      .subscribe((response) =>{
        console.log(response)
      }, (error) =>{
        console.error(error.error.msg);
        this.loginService.deleteToken();
        this.router.navigate(['dashboar']);

        // alert(error.error.msg)
      });
    } else {
      this.rol = false;
      console.log('No existe token')
    }
  }


}
