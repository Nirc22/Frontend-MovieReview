import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  peliculas:Pelicula[]=[];

  peliculaCrear:any[]=[];
  file:any;

  archivoSeleccionado: File | null = null;

  formCrearPelicula: FormGroup = this.forBuilder.group({
    nombre:['',[Validators.required]],
    imagenPelicula:['', [Validators.required]],
  })



  constructor(private peliculaService: PeliculaService, private forBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  capturarImagen(event: any) {
    // console.log("la imagen", event.target.files);
    // const imagenCapturada = event.target.files[0];
    // this.formCrearPelicula.get('imagenPelicula')!.setValue(imagenCapturada);
    console.log(event.target.files)

    if(event.target.files && event.target.files.length > 0){
      const imagenCapturada = event.target.files[0];
      if(imagenCapturada.type.includes('image')){
        const reader = new FileReader()
        reader.readAsDataURL(imagenCapturada);
        // reader.onload = function load(){

        // }
        this.file = imagenCapturada;

      }else{
        console.log('Hubo un error');
      }
    }
  }


  prueba(){
    const form = this.formCrearPelicula;
    this.peliculaService.prueba(form.value.nombre, this.file)




  }

  obtenerPeliculas(){
    this.peliculaService.getPeliculas(environment.urlApi+"pacientes")
    .subscribe((peliculas: any)=>{
      this.peliculas = peliculas;
    });
  }


}
