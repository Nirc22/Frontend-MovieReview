import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  peliculas:Pelicula[]=[];


  constructor(private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas(){
    this.peliculaService.getPeliculas(environment.urlApi+"pacientes")
    .subscribe((peliculas: any)=>{
      this.peliculas = peliculas;
    });
  }


}
