import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  formGenero: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private peliculaService: PeliculaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  get nombre() {
    return this.formGenero.get('nombre') as FormControl;
  }

  crearGenero() {
    this.peliculaService.crearGenero(this.formGenero.value).subscribe(
      (response) => {
        console.log('Genero creado', response);
        location.reload();
        alert(response.msg);
      },
      (error) => {
        console.error('Error al crear genero:', error);
      }
    )
  }



}
