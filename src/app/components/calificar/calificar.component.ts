import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWithTemplateData } from '../../interfaces/dialog-with-template-data'

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.css']
})
export class CalificarComponent implements OnInit {

  formCalificacion: FormGroup = this.formBuilder.group({
    calificacion:['',[Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data:DialogWithTemplateData) { }



  ngOnInit(): void {
  }

  calificar(){
    console.log(this.formCalificacion.value)
  }

}
