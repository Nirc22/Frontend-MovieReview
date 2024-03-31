import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { Actor } from 'src/app/interfaces/actor';
import { Director } from 'src/app/interfaces/director';
import { Genero } from 'src/app/interfaces/genero';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {


  file: any;
  directores: Director[] = [];
  actores: Actor[] = [];
  generos: Genero[] = [];
  peliculaCrear: Pelicula[] = [];
  filteredActores: Actor[] = [];
  selectedActores:any[]=[];
  filteredDirectores: Director[] =[];
  selectedDirector:any[] = [];
  filteredGeneros: Genero[] = [];
  selectedGeneros:any[]=[];



  formCrearPelicula: FormGroup = this.forBuilder.group({
    nombre: ['', [Validators.required]],
    director: ['', [Validators.required]],
    actores: new FormGroup({
      actor: new FormControl('',Validators.required),
    }),
    anio: ['', [Validators.required]],
    generos: new FormGroup({
      genero: new FormControl('',Validators.required),
    }),
    calificacion: new FormGroup({
      id: new FormControl(''),
    }),
    imagenPelicula: [''],
  })

  constructor(private forBuilder: FormBuilder, private peliculaService: PeliculaService, private router:Router, private location: Location) { }

  ngOnInit(): void {

    // console.log('HOlaaaaaaaaa',this.formCrearPelicula.get('director._id')!.value);
    this.getDirectores();
    this.getActores();
    this.getGeneros();


  }

  //sirve para validar los formularios
  get nombre(){
    return this.formCrearPelicula.get('nombre') as FormControl;
  }

  get director_id() {
    return this.formCrearPelicula.get('director') as FormControl;
  }

  get actor_id() {
    return this.formCrearPelicula.get('actores') as FormControl;
  }

  get anio(){
    return this.formCrearPelicula.get('anio') as FormControl;
  }

  get genero(){
    return this.formCrearPelicula.get('generos') as FormControl;
  }

  capturarImagen(event: any) {
    const file = event.target.files[0]; // Obtén el archivo seleccionado
    this.formCrearPelicula.patchValue({
      imagenPelicula: file, // Actualiza el valor del campo imagenPelicula
    });
  }


  registrarPelicula() {
    console.log(this.formCrearPelicula.value)
    let peliculaData = this.formCrearPelicula.value;
    const actoresArray = this.selectedActores.map(actorId => ({ actor: actorId })); // Create objects for each actor ID
    peliculaData.actores = actoresArray;
    const gennerosArray = this.selectedGeneros.map(generoId => ({ genero: generoId}));
    peliculaData.generos = gennerosArray;
    this.peliculaService.crearPelicula(peliculaData).subscribe(
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

  crearPelicula() {
    console.log(this.formCrearPelicula.value)
    const pelicula = this.formCrearPelicula.value;

    this.peliculaService.crearPelicula(pelicula)
      .subscribe((data: any) => {
        this.peliculaCrear = data;

        console.log("Pelicula registrada");
        // alert("Pelicula creada")
      })

    console.log(this.formCrearPelicula.value);
    // console.log('HOlaaaaaaaaa', this.director_id.value)
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
        this.actores = actores.actores
        this.filteredActores = [...this.actores];
        console.log("Actores", this.actores)
        // console.log("AAActores", this.filteredActores)
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

  // selectedOption(){
  //   console.log(this.selectedOption)
  // }

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
    this.location.back();
  }
}
