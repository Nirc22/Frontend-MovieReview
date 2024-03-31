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

  formBucar: FormGroup = this.formBuilder.group({
    nombre: ['']
  })
  nombrePelicula: any = '';

  peliculas: Pelicula[] = [];
  pelicula: Pelicula[] = [];
  imagen: any = "../../assets/SinImagen.jpg";
  environment: any = environment.urlImagen;



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

  buscar() {
    // console.log(this.formBucar.value)
    // this.peliculaService.getPeliculalByNombre(this.formBucar.value)
    if (this.nombrePelicula) {
      console.log(this.nombrePelicula)
      this.peliculaService.getPeliculalByNombre(this.nombrePelicula)
        .subscribe((response) => {
          // console.log("Addddddddddddd", response.peliculas)
          this.peliculas = response.peliculas;
          console.log("Nombreeee", this.peliculas)
        }, (error) => {
          console.error('Error al buscar películas:', error.error.msg);
          alert(error.error.msg)
        });
    }else{
      this.obtenerPeliculas();
    }

  }

}
