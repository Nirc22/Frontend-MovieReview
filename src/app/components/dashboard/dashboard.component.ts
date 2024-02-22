import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { environment } from 'src/environments/environment';
import { Pelicula } from 'src/app/interfaces/pelicula';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  peliculas:Pelicula[]=[];
  peliculasJSON:any;


  constructor(private peliculaService:PeliculaService) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas(){
    this.peliculaService.getPeliculas(environment.urlApi+"pacientes")
    .subscribe((peliculas: any)=>{
      this.peliculas = peliculas.peliculas;
      console.log(peliculas.peliculas)
      // const peliculasJSON = JSON.stringify(this.peliculas);
      // console.log(peliculasJSON.peliculas)

    });
  }

}
