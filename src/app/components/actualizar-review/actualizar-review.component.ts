import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWithTemplateData } from '../../interfaces/dialog-with-template-data'
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { Router } from '@angular/router';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-actualizar-review',
  templateUrl: './actualizar-review.component.html',
  styleUrls: ['./actualizar-review.component.css']
})
export class ActualizarReviewComponent implements OnInit {

  environment: any = environment.urlImagen;


  formActualizarReview: FormGroup = this.formBuilder.group({
    usuario: [''],
    pelicula: [''],
    calificacion: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder, private peliculaService: PeliculaService, private router: Router) { }

  ngOnInit(): void {
    this.datos();
  }

  get calificacion(){
    return this.formActualizarReview.get('calificacion') as FormControl;
  }

  datos(){
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
        this.router.navigate([this.router.url]);
        // location.reload();
      },
      (error) => {
        console.error('Error al actualizar Review:', error);
      }
    );

  }





}
