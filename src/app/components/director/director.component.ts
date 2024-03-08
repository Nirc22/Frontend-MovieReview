import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWithTemplateData } from '../../interfaces/dialog-with-template-data'

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data:DialogWithTemplateData) { }

  ngOnInit(): void {
  }

}
