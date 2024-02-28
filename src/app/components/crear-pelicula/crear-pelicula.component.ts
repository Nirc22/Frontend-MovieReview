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


  formCrearPelicula: FormGroup = this.forBuilder.group({
    nombre: ['', [Validators.required]],
    director: ['', [Validators.required]],
    actores: new FormGroup({
      actor: new FormControl(''),
    }),
    anio: ['', [Validators.required]],
    generos: new FormGroup({
      genero: new FormControl(''),
    }),
    calificacion: new FormGroup({
      id: new FormControl(''),
    }),
    imagenPelicula: ['', [Validators.required]],
  })

  constructor(private forBuilder: FormBuilder, private peliculaService: PeliculaService, private router:Router) { }

  ngOnInit(): void {

    // console.log('HOlaaaaaaaaa',this.formCrearPelicula.get('director._id')!.value);
    this.getDirectores();
    this.getActores();
    this.getGeneros();
  }

  //sirve para validar los formularios
  get director_id() {
    return this.formCrearPelicula.get('director') as FormControl;
  }

  get actor_id() {
    return this.formCrearPelicula.get('actor') as FormControl;
  }

  capturarImagen(event: any) {
    const file = event.target.files[0]; // Obtén el archivo seleccionado
    this.formCrearPelicula.patchValue({
      imagenPelicula: file, // Actualiza el valor del campo imagenPelicula
    });

    // if(event.target.files && event.target.files.length > 0){
    //   const imagenCapturada = event.target.files[0];
    //   if(imagenCapturada.type.includes('image')){
    //     const reader = new FileReader()
    //     reader.readAsDataURL(imagenCapturada);
    //     // reader.onload = function load(){

    //     // }
    //     this.file = imagenCapturada;

    //   }else{
    //     console.log('Hubo un error');
    //   }
    // }
  }
  registrarPelicula() {
    console.log(this.formCrearPelicula.value)
    const peliculaData = this.formCrearPelicula.value;

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
