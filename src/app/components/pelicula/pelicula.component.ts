import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula: any = [];

  constructor(private peliculaService: PeliculaService) { }

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

}
