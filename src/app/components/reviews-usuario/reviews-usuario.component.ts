import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { jwtDecode } from "jwt-decode";
import { LoginService } from 'src/app/services/auth/login.service';

import { UsuarioReview } from 'src/app/interfaces/usuario-review';


@Component({
  selector: 'app-reviews-usuario',
  templateUrl: './reviews-usuario.component.html',
  styleUrls: ['./reviews-usuario.component.css']
})
export class ReviewsUsuarioComponent implements OnInit {

  reviews: UsuarioReview[] =[];

  constructor(private usuarioService: UsuarioService, private loginService: LoginService) { }

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

}
