import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { jwtDecode } from "jwt-decode";
import { LoginService } from 'src/app/services/auth/login.service';

import { UsuarioReview } from 'src/app/interfaces/usuario-review';
import { MovieReview } from 'src/app/interfaces/movie-review';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms'
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { MatDialog } from '@angular/material/dialog';
import { ActualizarReviewComponent } from '../actualizar-review/actualizar-review.component';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-reviews-usuario',
  templateUrl: './reviews-usuario.component.html',
  styleUrls: ['./reviews-usuario.component.css']
})
export class ReviewsUsuarioComponent implements OnInit {

  formActualizarReview: FormGroup = this.formBuilder.group({
    usuario: [''],
    pelicula: [''],
    calificacion: ['', [Validators.required]]
  })

  reviews: UsuarioReview[] =[];
  review: any;
  environment: any = environment.urlImagen;


  constructor(private usuarioService: UsuarioService, private loginService: LoginService, private formBuilder:FormBuilder, private dialogService: DialogService, private peliculaService: PeliculaService, private matDialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getReviewsUsuario();
  }

  getReviewsUsuario(){
    const token = this.loginService.getToken();
    const decodetoken:any = jwtDecode(token!);
    console.log(decodetoken.uid)

    this.usuarioService.getReviews(decodetoken.uid).subscribe((reviews: any ) =>{
      this.reviews = reviews.listReviews;
      console.log(reviews.listReviews)
    })
  }

  reviewById(review: UsuarioReview):any{ //template: TemplateRef<any>
    this.review = review;
    console.log(this.review)
    this.formActualizarReview.setValue({
      usuario: review.usuario,
      pelicula: review.pelicula._id,
      calificacion: review.calificacion,
    })
    console.log(this.formActualizarReview.value);
    const dialogRef = this.matDialog.open(ActualizarReviewComponent, {
      data: {
        reviewData: review,
        formValues: this.formActualizarReview.value,
      },
    });

  }

  detalles(pelicula:any): void {
    localStorage.setItem("_id", pelicula.pelicula._id.toString());
    this.router.navigate(['pelicula']);
  }



}
