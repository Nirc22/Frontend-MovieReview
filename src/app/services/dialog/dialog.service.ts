import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalificarComponent } from 'src/app/components/calificar/calificar.component';
import { DialogWithTemplateData } from 'src/app/interfaces/dialog-with-template-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  openDialogWithTemplate(data: DialogWithTemplateData){
    return this.matDialog.open(CalificarComponent, {data})
  }
}
