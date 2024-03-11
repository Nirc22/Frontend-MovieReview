import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWithTemplateData } from '../../interfaces/dialog-with-template-data'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { Router } from '@angular/router';
import { Pelicula } from 'src/app/interfaces/pelicula';


@Component({
  selector: 'app-actualizar-review',
  templateUrl: './actualizar-review.component.html',
  styleUrls: ['./actualizar-review.component.css']
})
export class ActualizarReviewComponent implements OnInit {

  formActualizarReview: FormGroup = this.formBuilder.group({
    usuario: [''],
    pelicula: [''],
    calificacion: ['', [Validators.required]]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder, private peliculaService: PeliculaService, private router: Router) { }

  ngOnInit(): void {
    this.datos();
  }

  datos(){
    console.log("Datoooo",this.data.reviewData)
    this.formActualizarReview.setValue({
      usuario: this.data.reviewData.usuario,
      pelicula: this.data.reviewData.pelicula._id,
      calificacion: this.data.reviewData.calificacion
    })
  }

  actualizarReview(){
    const reviewData = this.formActualizarReview.value;
    this.peliculaService.actualizarCalificacion(this.data.reviewData._id ,reviewData).subscribe(
      (response) => {
        console.log('Review Actualizada:', response);
        // localStorage.setItem("_id", response.uid.toString());
        this.router.navigate(['reviewsUsuario']);
        // Realiza acciones adicionales después de crear la película
      },
      (error) => {
        console.error('Error al actualizar Review:', error);
      }
    );

  }

  detalles(pelicula: Pelicula): void {
    console.log(pelicula)
    localStorage.setItem("_id", pelicula._id.toString());
    this.router.navigate(['pelicula']);
  }



}
