import { Component, Inject, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IconService } from 'src/app/service/icon.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/service/session.service';
import { TipolibroService } from 'src/app/service/tipolibro.service';
import { ITipoLibro } from 'src/app/model/tipolibro-interfaces';


declare var Swal: any;

@Component({
  selector: 'app-tipolibro-delete-unrouted',
  templateUrl: './tipolibro-delete-unrouted.component.html',
  styleUrls: ['./tipolibro-delete-unrouted.component.scss']
})
export class TipolibroDeleteUnroutedComponent implements OnInit {

  id: number = 0;
  oUsuario: IUsuario;
  strUsuarioSession: string;
  strResult: string = null;
  strEntity: string = "usuario"
  strOperation: string = "remove"
  strTitleSingular: string = "Usuario";
  strTitlePlural: string = "Usuarios";
  oForm: FormGroup;
  oTipoLibro2Show: ITipoLibro;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<TipolibroDeleteUnroutedComponent>,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oRoute: ActivatedRoute,
    private oTipoLibroService: TipolibroService,
    private oActivatedRoute: ActivatedRoute,
    private _location: Location,
    public oIconService: IconService,
    private oSessionService: SessionService

  ) {
    // control de sesión
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.strUsuarioSession));
    } else {
      localStorage.clear();
      //oRouter.navigate(['/home']);
    }
    // recogida de parámetros
    //this.id = this.oActivatedRoute.snapshot.params.id;
    // llamada al servidor
    this.id = data.id;
    this.getOne();    

   }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      genero: ['']
      
    });
  }

  getOne = (): void => {
    this.oTipoLibroService
      .getOne(this.id)
      .subscribe((oData: ITipoLibro) => {
        this.oTipoLibro2Show = oData;
        console.log(oData);
        
        this.oForm = this.oFormBuilder.group({
          id: [this.oTipoLibro2Show.id],
          genero: [
            this.oTipoLibro2Show.genero]
          
        });
      });
  };

  onSubmit(): void {
    
    Swal.fire({
      title: '¿Estas seguro de eliminar el Tipo de Libro?',
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
          'El Tipo de Libro ha sido eliminado.',
          'success'
        )
      }       
      this.closeModal();      
    })

  }

  removeOne() {
    this.oTipoLibroService.removeOne(this.id).subscribe((data: number) => {
      this.strResult = 'Tipo de Libro eliminado';
    });
  }

  goBack() {
    this._location.back();
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
  this.dialogRef.close({ event: 'close', data: this.id });
}


}
