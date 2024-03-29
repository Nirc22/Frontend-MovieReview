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
  filteredActores: Actor[] = [];
  selectedActores:any[]=[];
  filteredDirectores: Director[] =[];
  selectedDirector:any[] = [];
  filteredGeneros: Genero[] = [];
  selectedGeneros:any[]=[];
  // peliculaCrear: Pelicula[] = [];

  formActualizarPelicula: FormGroup = this.forBuilder.group({
    nombre: ['', [Validators.required]],
    director: ['', [Validators.required]],
    actores: new FormGroup({
      actor: new FormControl('', Validators.required),
    }),
    anio: ['', [Validators.required]],
    generos: new FormGroup({
      genero: new FormControl('', Validators.required),
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

  get nombre(){
    return this.formActualizarPelicula.get('nombre') as FormControl;
  }

  get director_id() {
    return this.formActualizarPelicula.get('director') as FormControl;
  }

  get actor_id() {
    return this.formActualizarPelicula.get('actores') as FormControl;
  }

  get anio(){
    return this.formActualizarPelicula.get('anio') as FormControl;
  }

  get genero(){
    return this.formActualizarPelicula.get('generos') as FormControl;
  }

  getPeliculaById() {
    let _id = (localStorage.getItem("_id"));
    this.peliculaService.getPeliculaId(_id)
      .subscribe((data: any) => {
        this.pelicula = data.pelicula;
        console.log("Holaaaaa",this.pelicula)
        const actoresIDs: string[] = data.pelicula.actores.map((actor: { actor: { _id: string } }) => actor.actor._id);
        console.log("IDDDD",actoresIDs)
        const generosIDs: string[] = data.pelicula.generos.map((genero: { genero: { _id: string } }) => genero.genero._id);
        console.log("Generos",generosIDs)

        this.formActualizarPelicula.patchValue({
          nombre: data.pelicula.nombre,
          director: data.pelicula.director._id,
          actores: {actor: actoresIDs},
          // actores: {actor: data.pelicula.actores[0].actor._id},
          anio: data.pelicula.anio.substring(0,10),//para sacar la fecha en formato yyyy-MM-dd
          generos: {genero: generosIDs},
          // generos: {genero: data.pelicula.generos[0].genero._id},
        })
        // console.log("Formulario by ID",this.formActualizarPelicula.value)
      })

  }

  actualizarPelicula() {
    const _id = localStorage.getItem('_id');
    const peliculaData = this.formActualizarPelicula.value;

    const actoresArrays:Actor[] = this.formActualizarPelicula.value.actores.actor;
    const actoresArray = actoresArrays.map(actorId => ({ actor: actorId })); // Create objects for each actor ID
    peliculaData.actores = actoresArray;

    const generosArrays:Genero[] = this.formActualizarPelicula.value.generos.genero;
    const generosArray = generosArrays.map(generoId => ({ genero: generoId}));
    peliculaData.generos = generosArray;

    this.peliculaService.actualizarPelicula(peliculaData, _id).subscribe(
      (response) => {
        console.log('Película Actualizada:', response);
        // localStorage.setItem("_id", response.uid.toString());
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
        this.filteredDirectores = [...this.directores];
        console.log("Directores", this.directores)
      });
  }

  getActores() {
    this.peliculaService.getActores(environment.urlApi)
      .subscribe((actores: any) => {
        this.actores = actores.actores;
        this.filteredActores = [...this.actores];
        console.log("Actores", this.actores)
      });
  }

  getGeneros() {
    this.peliculaService.getGeneros(environment.urlApi)
      .subscribe((generos: any) => {
        this.generos = generos.generos;
        this.filteredGeneros = [...this.generos];
        console.log("Generos", this.generos)
      });
  }

  filterActores(event: any) {
    console.log(this.selectedActores);
    const searchString = event.target.value.toLowerCase(); // Obtener el valor del filtro en minúsculas}
    this.filteredActores = this.actores.filter(actor =>
      actor.nombre.toLowerCase().includes(searchString) || actor.apellido.toLowerCase().includes(searchString)
    )
  }

  filterDirectores(event: any) {
    // console.log(this.selectedOption);
    const searchString = event.target.value.toLowerCase(); // Obtener el valor del filtro en minúsculas}
    this.filteredDirectores = this.directores.filter(director =>
      director.nombre.toLowerCase().includes(searchString) || director.apellido.toLowerCase().includes(searchString)
    )
  }

  filterGeneros(event: any) {
    // console.log(this.selectedActores);
    const searchString = event.target.value.toLowerCase(); // Obtener el valor del filtro en minúsculas}
    this.filteredGeneros = this.generos.filter(genero =>
      genero.nombre.toLowerCase().includes(searchString)
    )
  }

  volver(): void {
    // console.log(pelicula)
    // localStorage.setItem("_id", pelicula._id.toString());
    this.router.navigate(['peliculaAdmin']);
  }

}
