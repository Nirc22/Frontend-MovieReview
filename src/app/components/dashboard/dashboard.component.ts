import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { environment } from 'src/environments/environment';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from "jwt-decode";



import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  // peliculaId = localStorage.getItem('_id');
  // token = localStorage.getItem('token');
  // usuario: any = jwtDecode(this.token!)


  formCalificacion: FormGroup = this.formBuilder.group({
    usuario: [''],
    pelicula: [''],
    calificacion: ['', [Validators.required]]
  })


  peliculas: Pelicula[] = [];
  pelicula: Pelicula[] = [];
  peliculasJSON: any;


  constructor(private peliculaService: PeliculaService, private router: Router, private dialogService: DialogService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas() {
    this.peliculaService.getPeliculas(environment.urlApi)
      .subscribe((peliculas: any) => {
        this.peliculas = peliculas.peliculas;
        console.log(peliculas.peliculas)
      });
  }

  detalles(pelicula: Pelicula): void {
    console.log(pelicula)
    localStorage.setItem("_id", pelicula._id.toString());
    this.router.navigate(['pelicula']);
  }

  calificar(pelicula: Pelicula): void {
    console.log(pelicula)
    localStorage.setItem("_id", pelicula._id.toString());
    this.router.navigate(['calificacion']);
  }

  openDialogWithTemplate(pelicula: Pelicula, template: TemplateRef<any>) {
    // localStorage.setItem("_id", pelicula._id.toString());
    const token = localStorage.getItem('token');
    if (token) {
      const usuario:any = jwtDecode(token!)
      this.formCalificacion.patchValue({
        usuario: usuario.uid,
        pelicula: pelicula._id
      })
      this.dialogService.openDialogWithTemplate({
        template
      }).afterClosed().subscribe(res => console.log('Dialog with template Close ', res))
    }else{
    this.router.navigate(['login']);
    }

  }


  calificacion() {
    console.log(this.formCalificacion.value)
    this.peliculaService.calificar(this.formCalificacion.value)
      .subscribe((data: any) => {
        console.log("Reseña registrada", data);
        // alert("Pelicula creada")
      })

    this.formCalificacion.reset();
  }
}
