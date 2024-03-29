import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pelicula-admin',
  templateUrl: './pelicula-admin.component.html',
  styleUrls: ['./pelicula-admin.component.css']
})
export class PeliculaAdminComponent implements OnInit {

  pelicula: any = [];
  imagen: any = "../../assets/SinImagen.jpg";

  constructor(private peliculaService: PeliculaService, private router:Router) { }

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

  actualizarImagen():void{
    this.router.navigate(['actualizarImangen']);

  }

  actualizarPelicula():void{
    this.router.navigate(['actualizarPelicula'])
  }

  volver(): void {
    this.router.navigate(['dashboardAdmin']);
  }

}
