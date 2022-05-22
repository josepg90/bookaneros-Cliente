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
import { LibroService } from 'src/app/service/libro.service';
import { ILibro } from 'src/app/model/libro-interfaces';


declare var Swal: any;

@Component({
  selector: 'app-libro-delete-unrouted',
  templateUrl: './libro-delete-unrouted.component.html',
  styleUrls: ['./libro-delete-unrouted.component.scss']
})
export class LibroDeleteUnroutedComponent implements OnInit {

  
  id: number = 0;
  oUsuario: IUsuario;
  strUsuarioSession: string;
  strResult: string = null;
  strEntity: string = "usuario"
  strOperation: string = "remove"
  strTitleSingular: string = "Usuario";
  strTitlePlural: string = "Usuarios";
  oForm: FormGroup;
  oLibro2Show: ILibro;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<LibroDeleteUnroutedComponent>,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oRoute: ActivatedRoute,
    private oLibroService: LibroService,
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
      codigo: [''],
      titulo: [''],
      autor: [''],
      fecha_publicacion: [''],
      resumen: [''],
      imagen: [''],
      paginas: [''],
      novedad: [''],
      tipolibro: ['']
      
    });
  }

  getOne = (): void => {
    this.oLibroService
      .get(this.id)
      .subscribe((oData: ILibro) => {
        this.oLibro2Show = oData;
        console.log(oData);
        
        this.oForm = this.oFormBuilder.group({
          id: [this.oLibro2Show.id],
          codigo: [this.oLibro2Show.codigo],
        titulo: [this.oLibro2Show.titulo],
        autor: [this.oLibro2Show.autor],
        fecha_publicacion: [this.oLibro2Show.fecha_publicacion],
        resumen: [this.oLibro2Show.resumen],
        imagen: [this.oLibro2Show.imagen],
        paginas: [this.oLibro2Show.paginas],
        novedad: [this.oLibro2Show.novedad],
        tipolibro: [this.oLibro2Show.tipolibro.id]
          
        });
      });
  };

  onSubmit(): void {
    
    Swal.fire({
      title: '¿Estas seguro de eliminar el Libro?',
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
          'El Libro ha sido eliminado.',
          'success'
        )
      }       
      this.closeModal();      
    })

  }

  removeOne() {
    this.oLibroService.removeOne(this.id).subscribe((data: number) => {
      this.strResult = 'Libro eliminado';
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
