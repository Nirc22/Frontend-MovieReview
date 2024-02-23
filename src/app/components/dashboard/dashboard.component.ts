import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { environment } from 'src/environments/environment';
import { Pelicula } from 'src/app/interfaces/pelicula';

import { Router } from '@angular/router';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  peliculas:Pelicula[]=[];
  pelicula:Pelicula[]=[];
  peliculasJSON:any;


  constructor(private peliculaService:PeliculaService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas(){
    this.peliculaService.getPeliculas(environment.urlApi+"pacientes")
    .subscribe((peliculas: any)=>{
      this.peliculas = peliculas.peliculas;
      console.log(peliculas.peliculas)
    });
  }

  detalles(pelicula:Pelicula):void{
    console.log(pelicula)
    localStorage.setItem("_id", pelicula._id.toString());
    this.router.navigate(['pelicula']);
  }

}
