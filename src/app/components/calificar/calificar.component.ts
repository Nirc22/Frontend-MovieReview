import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.css']
})
export class CalificarComponent implements OnInit {

  formCalificacion: FormGroup = this.formBuilder.group({
    calificacion:['',[Validators.required]]
  })

  constructor(private formBuilder: FormBuilder) { }



  ngOnInit(): void {
  }

  calificar(){
    console.log(this.formCalificacion.value)
  }

}
