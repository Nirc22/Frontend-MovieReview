import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';


@Component({
  selector: 'app-actualiar-imagen',
  templateUrl: './actualiar-imagen.component.html',
  styleUrls: ['./actualiar-imagen.component.css']
})
export class ActualiarImagenComponent implements OnInit {

  imagen: any = "../../assets/image.png"

  formImagen: FormGroup = this.formBuilder.group({
    imagenPelicula: ['', [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder, private peliculaService:PeliculaService) { }

  ngOnInit(): void {
  }

  capturarImagen(event: any) {
    const file = event.target.files[0]; // Obtén el archivo seleccionado
    this.formImagen.patchValue({
      imagenPelicula: file, // Actualiza el valor del campo imagenPelicula
    });
  }

  actualizarImagen() {
    const imagenData = this.formImagen.value;
    const _id = localStorage.getItem('_id');
    const formData = new FormData();
    formData.append('imagenPelicula', imagenData.imagenPelicula);
    this.peliculaService.actualizarImagen(formData, _id)
    .subscribe(response => {
      console.log('Respuesta del servidor:', response.data);
    })


  }


}
