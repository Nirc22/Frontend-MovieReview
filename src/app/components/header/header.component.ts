import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
// import { MatToolbarModule } from '@angular/material/toolbar'
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { jwtDecode } from "jwt-decode";
import { DialogService } from 'src/app/services/dialog/dialog.service';

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

  constructor(private peliculaService: PeliculaService, private formBuilder:FormBuilder, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.validar();

  }

  validar(){
    this.token = localStorage.getItem('token');
    this.decodedToken = jwtDecode(this.token!)
    if(this.decodedToken.rol === 'Admin'){
      this.rol = true;
    }else{
      this.rol = false;
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


}
