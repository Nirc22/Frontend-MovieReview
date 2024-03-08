import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { Router } from '@angular/router';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog/dialog.service';


@Component({
  selector: 'app-dasboard-admin',
  templateUrl: './dasboard-admin.component.html',
  styleUrls: ['./dasboard-admin.component.css']
})
export class DasboardAdminComponent implements OnInit {

  peliculas: Pelicula[] = [];
  pelicula: Pelicula[] = [];


  constructor(private peliculaService: PeliculaService, private router: Router, private formBuilder: FormBuilder, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas() {
    this.peliculaService.getPeliculas(environment.urlApi)
      .subscribe((peliculas: any) => {
        this.peliculas = peliculas.peliculas;
        console.log(peliculas.peliculas)
      });
  }

  actualizar(pelicula: Pelicula): void {
    console.log(pelicula)
    localStorage.setItem("_id", pelicula._id.toString());
    this.router.navigate(['peliculaAdmin']);
  }

}
