import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
// import { MatToolbarModule } from '@angular/material/toolbar'
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { jwtDecode } from "jwt-decode";




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  decodedToken:any;
  rol: any;
  token:any;

  constructor(private peliculaService: PeliculaService, private forBuilder:FormBuilder) { }

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


}
