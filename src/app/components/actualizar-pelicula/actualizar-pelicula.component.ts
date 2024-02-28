import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { Actor } from 'src/app/interfaces/actor';
import { Director } from 'src/app/interfaces/director';
import { Genero } from 'src/app/interfaces/genero';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-pelicula',
  templateUrl: './actualizar-pelicula.component.html',
  styleUrls: ['./actualizar-pelicula.component.css']
})
export class ActualizarPeliculaComponent implements OnInit {

  pelicula: Pelicula[] = [];
  directores: Director[] = [];
  actores: Actor[] = [];
  generos: Genero[] = [];
  // peliculaCrear: Pelicula[] = [];

  formActualizarPelicula: FormGroup = this.forBuilder.group({
    nombre: ['', [Validators.required]],
    director: ['', [Validators.required]],
    actores: new FormGroup({
      actor: new FormControl(''),
    }),
    anio: ['', [Validators.required]],
    generos: new FormGroup({
      genero: new FormControl(''),
    }),
    // calificacion: new FormGroup({
    //   id: new FormControl(''),
    // }),
    // imagenPelicula: ['', [Validators.required]],
  })


  constructor(private forBuilder: FormBuilder, private peliculaService: PeliculaService, private router:Router) { }

  ngOnInit(): void {
    this.getPeliculaById();
    this.getDirectores();
    this.getActores();
    this.getGeneros();
  }

  get director_id() {
    return this.formActualizarPelicula.get('director') as FormControl;
  }

  get actor_id() {
    return this.formActualizarPelicula.get('actor') as FormControl;
  }

  getPeliculaById() {
    let _id = (localStorage.getItem("_id"));
    this.peliculaService.getPeliculaId(_id)
      .subscribe((data: any) => {
        this.pelicula = data.pelicula;
        console.log("Holaaaaa",this.pelicula)
        this.formActualizarPelicula.setValue({
          nombre: data.pelicula.nombre,
          director: data.pelicula.director._id,
          actores: {actor: data.pelicula.actores[0].actor._id},
          anio: data.pelicula.anio.substring(0,10),//para sacar la fecha en formato yyyy-MM-dd
          generos: {genero: data.pelicula.generos[0].genero._id},
        })
      })

  }

  actualizarPelicula() {
    console.log(this.formActualizarPelicula.value)
    const _id = localStorage.getItem('_id');
    const peliculaData = this.formActualizarPelicula.value;

    this.peliculaService.actualizarPelicula(peliculaData, _id).subscribe(
      (response) => {
        console.log('Película creada:', response);
        localStorage.setItem("_id", response.uid.toString());
        this.router.navigate(['peliculaAdmin']);
        // Realiza acciones adicionales después de crear la película
      },
      (error) => {
        console.error('Error al crear la película:', error);
      }
    );
  }



  getDirectores() {
    this.peliculaService.getDirectores(environment.urlApi)
      .subscribe((directores: any) => {
        this.directores = directores.directores;
        console.log("Directores", this.directores)
      });
  }

  getActores() {
    this.peliculaService.getActores(environment.urlApi)
      .subscribe((actores: any) => {
        this.actores = actores.actores
        console.log("Actores", this.actores)
      });
  }

  getGeneros() {
    this.peliculaService.getGeneros(environment.urlApi)
      .subscribe((generos: any) => {
        this.generos = generos.generos
        console.log("Generos", this.generos)
      });
  }

}
