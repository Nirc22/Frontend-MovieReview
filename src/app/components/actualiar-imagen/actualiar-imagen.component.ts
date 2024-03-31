import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-actualiar-imagen',
  templateUrl: './actualiar-imagen.component.html',
  styleUrls: ['./actualiar-imagen.component.css']
})
export class ActualiarImagenComponent implements OnInit {

  imagen: any = "../../assets/SinImagen.jpg";
  imagenPreview: any | ArrayBuffer;
  pelicula:any=[];
  environment: any = environment.urlImagen;


  formImagen: FormGroup = this.formBuilder.group({
    imagenPelicula: ['', [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder, private peliculaService: PeliculaService, private router:Router) { }

  ngOnInit(): void {
    this.getPeliculaById();
  }

  get img(){
    return this.formImagen.get('imagenPelicula') as FormControl;
  }
  capturarImagen(event: any) {
    const file = event.target.files[0]; // Obtén el archivo seleccionado
    this.formImagen.patchValue({
      imagenPelicula: file, // Actualiza el valor del campo imagenPelicula
    });
    if (file) {
      // Lee el contenido del archivo como una URL de datos y lo asigna a la propiedad imagenPreview
      const lector = new FileReader();
      lector.onload = () => {
        this.imagenPreview = lector.result;
      };
      lector.readAsDataURL(file);
    }
  }

  actualizarImagen() {
    const imagenData = this.formImagen.value;
    const _id = localStorage.getItem('_id');
    if(imagenData.imagenPelicula !== ""){
      const formData = new FormData();
      formData.append('imagenPelicula', imagenData.imagenPelicula);
      this.peliculaService.actualizarImagen(formData, _id)
        .subscribe(response => {
          this.router.navigate(['peliculaAdmin']);
          console.log('Respuesta del servidor:', response);
        })
    }else{
      alert("No ha seleccionado imagen.")
    }

  }

  getPeliculaById(){
    const _id = localStorage.getItem("_id")
    this.peliculaService.getPeliculaId(_id).subscribe(
      (response:any) => {
        this.pelicula = response.pelicula;
        console.log(this.pelicula.pelicula)
      },
      (error)=> {
        console.log("Error", error)
      }
    )
  }

  volver(): void {
    this.router.navigate(['peliculaAdmin']);
  }


}
