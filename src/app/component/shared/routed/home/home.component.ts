import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegistroModalComponent } from '../../unrouted/registro-modal/registro-modal.component';
declare var Swal: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public matDialog: MatDialog

  ) { }

  ngOnInit(): void {
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "650px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(RegistroModalComponent, dialogConfig);
  }

  registro() {
    const { value: formValues } = Swal.fire({
      title: 'Registro',
      html:
        '<h5>Nombre de usuario<\h5>' +
        '<input id="swal-input1" class="swal2-input">' +
        '<h5>Contraseña<\h5>' +
        '<input id="swal-input2" class="swal2-input">' +
        '<h5>Correo electrónico<\h5>' +
        '<input id="swal-input3" class="swal2-input">',
      focusConfirm: false,
      
     
    })
    
    if (formValues) {
      Swal.fire(JSON.stringify(formValues))
    }
  }

}
