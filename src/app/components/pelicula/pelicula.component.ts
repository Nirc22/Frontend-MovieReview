import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula: any = [];
  rutaAnterior: string = "";
  imagen: any = "../../assets/SinImagen.jpg";
  environment: any = environment.urlImagen;



  constructor(private peliculaService: PeliculaService, private router:Router, private location: Location) { }

  ngOnInit(): void {
    this.getPeliculaById();
  }

  getPeliculaById() {
    let _id = (localStorage.getItem("_id"));
    this.peliculaService.getPeliculaId(_id)
      .subscribe((data: any) => {
        this.pelicula = data.pelicula;
        console.log(this.pelicula)
      })

  }

  volver(): void {
    this.location.back();
  }

}
