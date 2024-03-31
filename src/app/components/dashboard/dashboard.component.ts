import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { environment } from 'src/environments/environment';
import { Pelicula } from 'src/app/interfaces/pelicula';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from "jwt-decode";



import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formCalificacion: FormGroup = this.formBuilder.group({
    usuario: [''],
    pelicula: [''],
    calificacion: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
  })

  nombrePelicula: any = '';

  peliculas: Pelicula[] = [];
  pelicula: any;
  peliculasJSON: any;
  imagen: any = "../../assets/SinImagen.jpg";
  environment: any = environment.urlImagen;


  constructor(private peliculaService: PeliculaService, private router: Router, private dialogService: DialogService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  get peliculaId(){
    return this.formCalificacion.get('pelicula') as FormControl;
  }

  get usuario(){
    return this.formCalificacion.get('nombre') as FormControl;
  }

  get calificacion(){
    return this.formCalificacion.get('calificacion') as FormControl;
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

  openDialogWithTemplate(pelicula: Pelicula, template: TemplateRef<any>) {
    // localStorage.setItem("_id", pelicula._id.toString());
    const token = localStorage.getItem('token');
    if (token) {
      this.pelicula = pelicula;
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
    this.formCalificacion.patchValue({
      calificacion: '',
    });
  }


  calificar() {
    console.log(this.formCalificacion.value)
    this.peliculaService.calificar(this.formCalificacion.value).subscribe(
      (response) => {
        console.log('Review registrada', response);
        alert(response.msg)
        location.reload();
        this.formCalificacion.reset();

      },
      (error) => {
        console.error('Error al crear Review:', error.error.msg);
        alert(error.error.msg)
        this.formCalificacion.reset();

      }
    )
  }

  buscar() {
    // console.log(this.formBucar.value)
    // this.peliculaService.getPeliculalByNombre(this.formBucar.value)
    if (this.nombrePelicula) {
      console.log(this.nombrePelicula)
      this.peliculaService.getPeliculalByNombre(this.nombrePelicula)
        .subscribe((response) => {
          // console.log("Addddddddddddd", response.peliculas)
          this.peliculas = response.peliculas;
          console.log("Nombreeee", this.peliculas)
        }, (error) => {
          console.error(error.error.msg);
          alert(error.error.msg)
        });
    }else{
      this.obtenerPeliculas();
    }

  }

}
