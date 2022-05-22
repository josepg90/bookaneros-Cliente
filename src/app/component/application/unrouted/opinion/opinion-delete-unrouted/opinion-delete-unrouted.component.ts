import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/model/opinion-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { OpinionService } from 'src/app/service/opinion.service';

declare var Swal: any;

@Component({
  selector: 'app-opinion-delete-unrouted',
  templateUrl: './opinion-delete-unrouted.component.html',
  styleUrls: ['./opinion-delete-unrouted.component.scss']
})
export class OpinionDeleteUnroutedComponent implements OnInit {

  id: number;
  oPost: IPost;
  strUsuarioSession: string;
  strResult: string = null;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<OpinionDeleteUnroutedComponent>,
    private oOpinionService: OpinionService,
    private oRouter: Router,
    private oRoute: ActivatedRoute,
    public oIconService: IconService
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.strUsuarioSession));
    } else {
      localStorage.clear();
    }
    // recogida de parámetros
    //this.id = this.oActivatedRoute.snapshot.params.id;
    // llamada al servidor
    this.id = data.id;
    this.getOne();
   }

  ngOnInit(): void {
  }

  getOne = (): void => {
    this.oOpinionService
      .get(this.id)
      .subscribe((oData: IPost) => {
        this.oPost = oData;
        console.log(oData);
        
        
      });
  };

removeAsk() {
  
  Swal.fire({
    title: '¿Estas seguro de eliminar este Post de opinión?',
    text: "¡No podras volver atras!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Si, eliminalo!',
    cancelButtonText: 'Cancelar'
  }).then((result: { isConfirmed: any; }) => {
    if (result.isConfirmed) {
      this.removeOne();
      Swal.fire(
        'Eliminado!',
        'Este Post de opinión ha sido eliminado.',
        'success'
      )
    }    
    this.closeModal();
 })
}

removeOne() {
  this.oOpinionService.removeOne(this.id).subscribe((data: number) => {
    this.strResult = 'Usuario eliminado';
  });
}

  // When the user clicks the action button a.k.a. the logout button in the\
// modal, show an alert and followed by the closing of the modal
actionFunction() {
  alert("You have logged out.");
  this.closeModal();
}

// If the user clicks the cancel button a.k.a. the go back button, then\
// just close the modal
closeModal() {
  this.dialogRef.close('close');
}

reloadCurrentPage() {
  window.location.reload();
 }


}
